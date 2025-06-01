"""Subscription router."""
from datetime import datetime, timedelta
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from ...core.auth import get_current_user
from ...core.supabase import get_supabase
from ...models.subscription import SubscriptionUpdate, SubscriptionResponse, PaymentRecord

router = APIRouter()

@router.get("/me", response_model=SubscriptionResponse)
async def get_my_subscription(current_user: dict = Depends(get_current_user)):
    """Get current user's subscription details."""
    supabase = get_supabase()
    
    # Obtener detalles de la suscripción
    response = await supabase.from_('users').select('*').eq('id', current_user['id']).single()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user_data = response.data
    
    # Convertir el historial de pagos de JSON a lista de PaymentRecord
    payment_history = []
    if user_data.get('payment_history'):
        for payment in user_data['payment_history']:
            payment_history.append(PaymentRecord(**payment))
    
    return SubscriptionResponse(
        subscription_status=user_data['subscription_status'],
        subscription_type=user_data.get('subscription_type'),
        subscription_start_date=user_data.get('subscription_start_date'),
        subscription_end_date=user_data.get('subscription_end_date'),
        total_payments=user_data.get('total_payments', 0.0),
        last_payment_date=user_data.get('last_payment_date'),
        last_payment_amount=user_data.get('last_payment_amount'),
        payment_history=payment_history
    )

@router.post("/update", response_model=SubscriptionResponse)
async def update_subscription(
    subscription_data: SubscriptionUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user's subscription."""
    supabase = get_supabase()
    
    # Preparar datos de actualización
    update_data = {
        'subscription_status': subscription_data.subscription_status,
        'subscription_type': subscription_data.subscription_type,
    }
    
    # Si hay un nuevo pago, actualizar el historial
    if subscription_data.payment_amount:
        # Obtener historial actual
        response = await supabase.from_('users').select('payment_history').eq('id', current_user['id']).single()
        current_history = response.data.get('payment_history', [])
        
        # Añadir nuevo pago al historial
        new_payment = {
            'date': datetime.now().isoformat(),
            'amount': subscription_data.payment_amount,
            'subscription_type': subscription_data.subscription_type,
            'payment_method': subscription_data.payment_method,
            'transaction_id': subscription_data.transaction_id
        }
        current_history.append(new_payment)
        
        # Actualizar datos de pago
        update_data.update({
            'total_payments': response.data.get('total_payments', 0.0) + subscription_data.payment_amount,
            'last_payment_date': datetime.now(),
            'last_payment_amount': subscription_data.payment_amount,
            'payment_history': current_history
        })
        
        # Actualizar fechas de suscripción
        if subscription_data.subscription_type == 'monthly':
            update_data['subscription_start_date'] = datetime.now()
            update_data['subscription_end_date'] = datetime.now() + timedelta(days=30)
        elif subscription_data.subscription_type == 'yearly':
            update_data['subscription_start_date'] = datetime.now()
            update_data['subscription_end_date'] = datetime.now() + timedelta(days=365)
    
    # Actualizar usuario
    response = await supabase.from_('users').update(update_data).eq('id', current_user['id']).execute()
    
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update subscription"
        )
    
    # Obtener datos actualizados
    return await get_my_subscription(current_user) 