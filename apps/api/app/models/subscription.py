"""Subscription models."""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

class PaymentRecord(BaseModel):
    """Payment record model."""
    date: datetime
    amount: float
    subscription_type: str
    payment_method: str
    transaction_id: str

class SubscriptionUpdate(BaseModel):
    """Subscription update model."""
    subscription_status: str = Field(..., pattern="^(free|premium)$")
    subscription_type: Optional[str] = Field(None, pattern="^(monthly|yearly)$")
    subscription_start_date: Optional[datetime] = None
    subscription_end_date: Optional[datetime] = None
    payment_amount: Optional[float] = None
    payment_method: Optional[str] = None
    transaction_id: Optional[str] = None

class SubscriptionResponse(BaseModel):
    """Subscription response model."""
    subscription_status: str
    subscription_type: Optional[str]
    subscription_start_date: Optional[datetime]
    subscription_end_date: Optional[datetime]
    total_payments: float
    last_payment_date: Optional[datetime]
    last_payment_amount: Optional[float]
    payment_history: List[PaymentRecord] 