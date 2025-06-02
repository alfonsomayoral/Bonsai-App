"""
Authentication models.
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, validator

class UserLogin(BaseModel):
    """User login model."""
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    """User registration model."""
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str
    unit_system: str = Field(default="metric", pattern="^(metric|imperial)$")
    goal_type: str = Field(default="maintain", pattern="^(cut|maintain|bulk)$")

    @validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

class UserResponse(BaseModel):
    """User response model."""
    id: str
    email: EmailStr
    full_name: str
    unit_system: str
    goal_type: str
    created_at: datetime
    
    # Subscription fields
    subscription_status: str = Field(default="free", pattern="^(free|premium)$")
    subscription_type: Optional[str] = Field(None, pattern="^(monthly|yearly)$")
    subscription_start_date: Optional[datetime] = None
    subscription_end_date: Optional[datetime] = None
    total_payments: float = 0.0
    last_payment_date: Optional[datetime] = None
    last_payment_amount: Optional[float] = None
    payment_history: List[dict] = []

class TokenResponse(BaseModel):
    """Token response model."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer" 