"""Database migration script."""
import sys
import os
from pathlib import Path

# Añadir el directorio raíz al path
root_dir = Path(__file__).parent.parent
sys.path.append(str(root_dir))

from app.db.migrations import (
    create_migration,
    upgrade_database,
    downgrade_database,
    get_current_revision,
    get_migration_history
)

def main():
    """Main function."""
    if len(sys.argv) < 2:
        print("Usage: python migrate.py [command] [args]")
        print("Commands:")
        print("  create <message>  Create a new migration")
        print("  upgrade [revision]  Upgrade database to a specific revision")
        print("  downgrade [revision]  Downgrade database to a specific revision")
        print("  current  Show current revision")
        print("  history  Show migration history")
        sys.exit(1)

    command = sys.argv[1]

    if command == "create":
        if len(sys.argv) < 3:
            print("Error: Migration message required")
            sys.exit(1)
        message = sys.argv[2]
        create_migration(message)
        print(f"Created migration: {message}")

    elif command == "upgrade":
        revision = sys.argv[2] if len(sys.argv) > 2 else "head"
        upgrade_database(revision)
        print(f"Upgraded database to revision: {revision}")

    elif command == "downgrade":
        revision = sys.argv[2] if len(sys.argv) > 2 else "-1"
        downgrade_database(revision)
        print(f"Downgraded database to revision: {revision}")

    elif command == "current":
        revision = get_current_revision()
        print(f"Current revision: {revision}")

    elif command == "history":
        history = get_migration_history()
        print("Migration history:")
        for rev in history:
            print(f"  {rev.revision}: {rev.doc}")

    else:
        print(f"Unknown command: {command}")
        sys.exit(1)

if __name__ == "__main__":
    main() 