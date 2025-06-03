"""
Supabase configuration module.
This module handles the Supabase client configuration and initialization.
"""
from supabase import create_client, Client
from .config import settings
from postgrest.base_request_builder import APIResponse
from fastapi import HTTPException, status

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
    response: APIResponse = await supabase.from_('users').select('*').eq('id', user_id).single()
    if response.error:
         # Consider logging or raising an exception based on your needs
         print(f"Error fetching user {user_id}: {response.error}")
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
        
    Raises:
        HTTPException: If user profile creation fails
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
    
    response: APIResponse = await supabase.from_('users').insert(user_data).execute()
    
    if response.error:
        # If Supabase returns an error during insertion, raise an HTTPException
        # This will give a more specific error message in the API response
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, # Keep 500 as it's a backend issue
            detail=f"Database error creating user profile: {response.error.message} (Code: {response.error.code})"
        )

    # Check if data was returned (successful insert usually returns data)
    if not response.data:
         # This might happen if no error is reported but no data is returned on insert
         raise HTTPException(
             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
             detail="Database error creating user profile: No data returned on insert"
         )

    # Return the first item from the returned data (should be the inserted row)
    return response.data[0] 