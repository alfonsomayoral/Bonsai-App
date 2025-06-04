import asyncio
import uuid
import os
from dotenv import load_dotenv

# Add the root of the 'app' package to the sys.path
# This is needed to import modules like app.core.config
import sys
from pathlib import Path

# Assuming this script is in apps/api
api_dir = Path(__file__).parent
app_root = api_dir / "app"
sys.path.insert(0, str(app_root))

# Now we can import modules from app.core and app.models
from app.core.config import settings
# from app.core.supabase import create_user_profile, get_supabase # No longer needed for direct insert
# from app.models.auth import UserRegister # No longer strictly needed for direct insert
from supabase import create_client, Client

# Ensure environment variables are loaded
load_dotenv(api_dir / ".env")

async def test_create_user_profile():
    """
    Tests creating a user profile directly in the database using the service role.
    This bypasses Supabase Auth signup and create_user_profile function.
    """
    print("--- Testing direct user profile creation with service role ---")

    # Initialize Supabase client with service role
    supabase: Client = create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_SERVICE_KEY  # Use service key instead of anon key
    )
    
    # Generate a unique user ID (UUID) - simulate ID from Supabase Auth
    test_user_id = str(uuid.uuid4())
    # Using a unique email is important to avoid conflicts
    test_email = f"testuser_direct_{uuid.uuid4().hex[:6]}@gmail.com"
    test_full_name = "Test User Direct Insert"
    test_unit_system = "metric"
    test_goal_type = "maintain"

    user_data = {
        'id': test_user_id,
        'email': test_email,
        'full_name': test_full_name,
        'unit_system': test_unit_system,
        'goal_type': test_goal_type,
    }

    print(f"Attempting to create profile for user ID: {test_user_id}")
    print(f"With data: {user_data}")

    try:
        # Insert directly using the service role client
        # Use .execute() to run the query
        response = await supabase.table('users').insert(user_data).execute()
        
        # Check the response for data or errors
        # The structure of the response might vary slightly based on supabase-py version
        if response.data:
            print("--- Successfully created user profile --- ")
            # Print the returned data, if any (usually the inserted rows)
            print(f"Created user data: {response.data}")
        elif response.error:
             print(f"--- Failed to create user profile: Supabase Error ---")
             print(f"Error Detail: {response.error}")
        else:
             print("--- Failed to create user profile: No data or error in response ---")
            
    except Exception as e:
        print(f"--- An unexpected error occurred: ---")
        print(f"Error Type: {type(e)}")
        print(f"Error Detail: {str(e)}")

# Main execution block
if __name__ == "__main__":
    asyncio.run(test_create_user_profile())