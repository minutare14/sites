import os

from django.contrib.auth import get_user_model


def env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


email = env("DJANGO_SUPERUSER_EMAIL")
password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "")

if not email or not password:
    print(
        "Skipping Saleor admin bootstrap because DJANGO_SUPERUSER_EMAIL or "
        "DJANGO_SUPERUSER_PASSWORD is not set."
    )
    raise SystemExit(0)

first_name = env("DJANGO_SUPERUSER_FIRST_NAME")
last_name = env("DJANGO_SUPERUSER_LAST_NAME")

User = get_user_model()
user, created = User.objects.get_or_create(
    email=email,
    defaults={
        "is_active": True,
        "is_staff": True,
        "is_superuser": True,
    },
)

user.is_active = True
user.is_staff = True
user.is_superuser = True

if hasattr(user, "first_name"):
    user.first_name = first_name

if hasattr(user, "last_name"):
    user.last_name = last_name

user.set_password(password)
user.save()

action = "Created" if created else "Updated"
print(f"{action} Saleor admin user: {email}")
