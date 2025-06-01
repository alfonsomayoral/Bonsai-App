"""
Authentication models.
"""
from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    """User login model."""
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    """User registration model."""
    email: EmailStr
    password: str
    full_name: str

class UserResponse(BaseModel):
    """User response model."""
    id: str
    email: EmailStr
    full_name: str
    unit_system: str
    goal_type: str
    created_at: str

class TokenResponse(BaseModel):
    """Token response model."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer" 