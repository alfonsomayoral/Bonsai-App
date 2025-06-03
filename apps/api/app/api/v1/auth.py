"""
Authentication router.
"""
import hashlib # Import hashlib
import httpx # Import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.supabase import get_supabase, create_user_profile
from app.models.auth import UserLogin, UserRegister, UserResponse, TokenResponse
from gotrue.errors import AuthApiError

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# HIBP API endpoint
PWNED_PASSWORDS_API_URL = "https://api.pwnedpasswords.com/range/"

async def check_password_pwned(password: str) -> int:
    """
    Checks if a password has been found in data breaches using HaveIBeenPwned API.
    
    Args:
        password (str): The password to check.
        
    Returns:
        int: The number of times the password has been found in breaches.
             Returns 0 if not found, > 0 if found.
             Returns -1 if there's an error calling the API.
    """
    sha1password = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    prefix = sha1password[:5]
    suffix = sha1password[5:]
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{PWNED_PASSWORDS_API_URL}{prefix}")
            response.raise_for_status() # Raise an exception for bad status codes
            
            # The response body is a list of suffixes and counts, separated by colons
            # Example: '0005E79197D502D158205D5266B19B3E2AD:2\r\n...'
            hashes = (line.split(':') for line in response.text.splitlines())
            for h, count in hashes:
                if h == suffix:
                    return int(count)
            return 0 # Suffix not found
        except httpx.HTTPStatusError as e:
            print(f"HTTP error checking password with HIBP: {e}")
            return -1 # Indicate API error
        except Exception as e:
            print(f"An unexpected error occurred checking password with HIBP: {e}")
            return -1 # Indicate other error

@router.post("/register", response_model=UserResponse)
async def register(user_data: UserRegister):
    """
    Register a new user.
    
    Args:
        user_data (UserRegister): User registration data
        
    Returns:
        UserResponse: Created user data
        
    Raises:
        HTTPException: If registration fails
    """
    supabase = get_supabase()
    
    try:
        # Check password against HaveIBeenPwned
        pwned_count = await check_password_pwned(user_data.password)
        
        if pwned_count > 0:
             raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Password has been found in data breaches {pwned_count} times. Please choose a different password."
            )
        elif pwned_count == -1:
             # Optionally handle API errors differently, maybe just log and proceed
             print("Warning: Failed to check password against HIBP API.")
             # Decide if you want to block registration on HIBP API error
             # For now, we will allow registration but log the warning.
             pass # Allow registration to proceed if API call fails

        # Register user in Supabase Auth
        # This call is awaited and should return a completed AuthResponse object
        auth_response = await supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password
        })

        # Explicitly check for errors from Supabase Auth response first
        if auth_response.error:
             # Re-raise as AuthApiError or handle based on the error detail
             # We already handle AuthApiError in the except block below, so let it propagate
             # If the sign_up call itself raised AuthApiError, this block won't be reached
             pass # Let the except AuthApiError block handle it

        # After successful awaited call and no immediate error, check user/session
        # Accessing .user or .session here should be synchronous
        user = auth_response.user
        session = auth_response.session

        if not user:
             # This indicates an issue where signup might have processed but no user object returned
             raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Supabase Auth sign-up succeeded but no user data returned"
            )

        # Extract user ID and other data from the user object
        user_id = user.id
        email = user.email # Use email from Auth response for consistency

        # Create user profile in users table
        # This call is also awaited and its errors are handled within create_user_profile now
        user_profile = await create_user_profile(
            user_id,
            email,
            user_data.full_name,
            user_data.unit_system,
            user_data.goal_type
        )

        # create_user_profile now raises HTTPException on failure, so if we reach here, it succeeded
        return user_profile
    
    except AuthApiError as e:
        # Handle specific Supabase Auth errors (like email invalid/duplicate)
        detail = str(e).lower()
        # Check for common phrases indicating duplicate email or invalid email
        if "already registered" in detail or "duplicate" in detail or "is invalid" in detail:
             raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, # 409 Conflict for duplicate resource
                detail="Email address already registered"
            )
        # Catch any other auth errors from Supabase that weren't duplicates/invalid format
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Auth registration failed: {str(e)}" # Keep original error detail from Supabase
        )
    except Exception as e:
        # Handle any other unexpected errors (e.g., database connection issues not caught by AuthApiError)
        # create_user_profile now raises specific HTTPExceptions for DB errors, but this is a fallback
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected internal error occurred during registration: {e}"
        )

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    """
    Login user.
    
    Args:
        user_data (UserLogin): User login data
        
    Returns:
        TokenResponse: Authentication tokens
        
    Raises:
        HTTPException: If login fails
    """
    supabase = get_supabase()
    
    try:
        auth_response = await supabase.auth.sign_in_with_password({
            "email": user_data.email,
            "password": user_data.password
        })
        
        if not auth_response.session:
            # This case should ideally not be reached if AuthApiError is raised
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Login failed"
            )
        
        return TokenResponse(
            access_token=auth_response.session.access_token,
            refresh_token=auth_response.session.refresh_token
        )
    
    except AuthApiError as e:
        # Handle specific Supabase Auth errors during login
        detail = str(e).lower()
        if "invalid login credentials" in detail:
             raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, # 401 Unauthorized for invalid credentials
                detail="Invalid email or password"
            )
        # Catch any other auth errors from Supabase during login
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Auth login failed: {str(e)}" # Keep original error detail
        )
    except Exception as e:
        # Handle any other unexpected errors during login
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred during login: {e}"
        )

@router.post("/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    """
    Logout user.
    
    Args:
        token (str): Access token
        
    Returns:
        dict: Success message
    """
    supabase = get_supabase()
    await supabase.auth.sign_out()
    return {"message": "Successfully logged out"} 