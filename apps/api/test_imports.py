"""Test script to verify imports."""
try:
    import app
    print("Successfully imported app")
    
    from app.core import config
    print("Successfully imported app.core.config")
    
    from app.core import supabase
    print("Successfully imported app.core.supabase")
    
    from app.models import auth
    print("Successfully imported app.models.auth")
    
    from app.api.v1 import auth as auth_router
    print("Successfully imported app.api.v1.auth")
    
    print("\nAll imports successful!")
except ImportError as e:
    print(f"Import error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}") 