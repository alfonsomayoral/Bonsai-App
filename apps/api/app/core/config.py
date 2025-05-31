"""
Configuration settings for the Bonsai API.
"""
from pydantic_settings import BaseSettings
from functools import lru_cache
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    """Application settings."""
    
    # API Settings
    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # Database Settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/bonsai_db")
    
    # Security Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    class Config:
        """Pydantic config."""
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings() 