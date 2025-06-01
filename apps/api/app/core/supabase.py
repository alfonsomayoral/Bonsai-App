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