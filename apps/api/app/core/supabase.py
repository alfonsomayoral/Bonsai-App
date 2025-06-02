"""
Supabase configuration module.
This module handles the Supabase client configuration and initialization.
"""
from supabase import create_client, Client
from .config import settings

# Initialize Supabase client
supabase: Client = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)

def get_supabase() -> Client:
    """
    Get the Supabase client instance.
    
    Returns:
        Client: The configured Supabase client
    """
    return supabase

# Auth helper functions
async def get_user_by_id(user_id: str):
    """
    Get user details by ID.
    
    Args:
        user_id (str): The user's ID
        
    Returns:
        dict: User details
    """
    response = await supabase.from_('users').select('*').eq('id', user_id).single()
    return response.data

async def create_user_profile(user_id: str, email: str, full_name: str, unit_system: str = "metric", goal_type: str = "maintain"):
    """
    Create a new user profile in the users table.
    
    Args:
        user_id (str): The user's ID from auth
        email (str): The user's email
        full_name (str): The user's full name
        unit_system (str): The user's preferred unit system (metric/imperial)
        goal_type (str): The user's fitness goal (cut/maintain/bulk)
        
    Returns:
        dict: Created user profile
    """
    user_data = {
        'id': user_id,
        'email': email,
        'full_name': full_name,
        'unit_system': unit_system,
        'goal_type': goal_type,
        'subscription_status': 'free',
        'subscription_type': None,
        'subscription_start_date': None,
        'subscription_end_date': None,
        'total_payments': 0.0,
        'last_payment_date': None,
        'last_payment_amount': None,
        'payment_history': []
    }
    response = await supabase.from_('users').insert(user_data).execute()
    return response.data[0] if response.data else None 