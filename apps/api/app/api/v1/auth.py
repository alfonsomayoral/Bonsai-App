"""
Authentication router.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.supabase import get_supabase, create_user_profile
from app.models.auth import UserLogin, UserRegister, UserResponse, TokenResponse

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
    
    # Register user in Supabase Auth
    auth_response = await supabase.auth.sign_up({
        "email": user_data.email,
        "password": user_data.password
    })
    
    if not auth_response.user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration failed"
        )
    
    # Create user profile in users table
    user_profile = await create_user_profile(
        auth_response.user.id,
        user_data.email,
        user_data.full_name
    )
    
    if not user_profile:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user profile"
        )
    
    return user_profile

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
    
    auth_response = await supabase.auth.sign_in_with_password({
        "email": user_data.email,
        "password": user_data.password
    })
    
    if not auth_response.session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    return TokenResponse(
        access_token=auth_response.session.access_token,
        refresh_token=auth_response.session.refresh_token
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