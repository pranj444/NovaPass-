from cryptography.fernet import Fernet
import os

KEY_FILE = "secret.key"

def load_key():

    if not os.path.exists(KEY_FILE):

        key = Fernet.generate_key()

        with open(KEY_FILE, "wb") as f:
            f.write(key)

    with open(KEY_FILE, "rb") as f:
        return f.read()

key = load_key()

cipher = Fernet(key)

def encrypt_password(password):

    return cipher.encrypt(
        password.encode()
    ).decode()

def decrypt_password(password):

    return cipher.decrypt(
        password.encode()
    ).decode()