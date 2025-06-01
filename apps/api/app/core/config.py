"""
Configuration module for the application.
This module handles all environment variables and configuration settings.
"""
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """Application settings."""
    
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Bonsai API"
    
    # Database Settings
    DATABASE_URL: str
    
    # Supabase Settings
    SUPABASE_URL: str
    SUPABASE_KEY: str
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: list[str] = ["*"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 