"""
Authentication router.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.supabase import get_supabase, create_user_profile
from app.models.auth import UserLogin, UserRegister, UserResponse, TokenResponse
from gotrue.errors import AuthApiError

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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
        # Register user in Supabase Auth
        auth_response = await supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password
        })

        # Check if user object is present in the response
        if not auth_response or not auth_response.user:
             # This case might be covered by AuthApiError, but keep as a fallback
             # This might also catch cases where signup succeeds but returns no user/session
             raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration failed after Supabase Auth sign-up"
            )

        # Extract user ID and other data from the response
        user_id = auth_response.user.id
        email = auth_response.user.email

        # Create user profile in users table
        user_profile = await create_user_profile(
            user_id,
            email,
            user_data.full_name,
            user_data.unit_system,
            user_data.goal_type
        )

        if not user_profile:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user profile"
            )

        return user_profile
    
    except AuthApiError as e:
        # Handle specific Supabase Auth errors
        detail = str(e).lower()
        # Check for common phrases indicating duplicate email
        if "already registered" in detail or "duplicate" in detail or "is invalid" in detail:
             raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, # 409 Conflict for duplicate resource
                detail="Email address already registered"
            )
        # If it's not a duplicate (based on the above check), assume it's an invalid email for other reasons
        # The original error message from Supabase is more informative here
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Auth registration failed: {str(e)}" # Keep original error detail from Supabase
        )
    except Exception as e:
        # Handle any other unexpected errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred during registration: {e}"
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