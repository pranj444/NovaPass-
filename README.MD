# NovaPass

A modern futuristic password manager built with Python Flask, AES encryption, SQLite, and a premium glassmorphism UI.

NovaPass securely stores passwords with encrypted storage, favorites system, analytics, animated dashboard UI, and dynamic authentication.

---

# Features

## Authentication
- Daily changing password system
- Secure session-based login
- Protected dashboard routes
- Logout system
- Prevents direct dashboard access

---

## Password Vault
- Add passwords
- Edit passwords
- Delete passwords
- Copy passwords
- Hide/Show passwords
- AES encrypted password storage
- Search passwords instantly

---

## Favorites System
- Star passwords
- Favorites section
- Dynamic favorite counter
- Real-time favorite updates

---

## Analytics
- Total passwords
- Favorite passwords
- Weak password detection
- Most used website tracking

---

## UI / UX
- Modern glassmorphism design
- Smooth animations
- Sidebar navigation
- Animated modals
- Responsive layout
- Futuristic dashboard

---

# 🛠 Tech Stack

## Backend
- Python
- Flask
- SQLite3
- Cryptography (Fernet AES)

## Frontend
- HTML5
- CSS3
- JavaScript

---

# Project Structure

```txt
NovaPass/
│
├── app.py
│
├── requirements.txt
│
├── database/
│   └── vault.db ( Created after successful execution of app.py along with secret.key )
│
├── utils/
│   └── encryption.py
│
├── static/
│   ├── dashboard.css
│   ├── dashboard.js
│   ├── style.css
│   ├── script.js
│   ├── logo.png
│   └── favourite.png
│
├── templates/
│   ├── index.html
│   └── dashboard.html
│
└── README.md
```

---

# Login System

## Username
```txt
admin
```

## Password Formula
```txt
(day × month) + year
```

### Example
```txt
30 June 2026

30 × 6 + 2026
= 2206
```

Password:
```txt
2206
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/pranj444/NovaPass-.git
```

---

## 2. Open Folder

```bash
cd NovaPass
```

---

## 3. Install Requirements

```bash
pip install flask cryptography
```

---

## 4. Run Application

```bash
python app.py
```

---

#  Open In Browser

```txt
http://127.0.0.1:5000
```

---

# Encryption

NovaPass uses:
- Fernet AES encryption
- Encrypted password storage
- Secure session authentication

Passwords are encrypted before storing inside SQLite database.

---

# Favorites System

Users can:
- Star passwords
- View favorite passwords separately
- Quickly access important accounts

---

# Analytics System

NovaPass automatically calculates:
- Total passwords
- Weak passwords
- Favorite count
- Most used websites

---

# UI Features

- Glassmorphism
- Gradient neon backgrounds
- Animated modals
- Smooth transitions
- Modern dashboard layout

---

# ⚠ Security Note

This project is for:
- learning
- portfolio
- educational purposes

Recommended improvements for production:
- hashed user accounts
- CSRF protection
- secure HTTPS deployment
- advanced authentication
- password strength engine

---

# Preview

## Login Screen
Modern animated authentication UI.

## Dashboard
Professional futuristic password vault dashboard.

---

# Author

Developed by:
```txt
Pranj Patel
```

---

# License

MIT License

Free to use and modify.
