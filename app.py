from flask import (
    Flask,
    render_template,
    request,
    jsonify,
    session,
    redirect
)

from datetime import datetime

import sqlite3

from utils.encryption import (
    encrypt_password,
    decrypt_password
)

app = Flask(__name__)

# secret key

app.secret_key = "Novapass_SecretKey"


USERNAME = "admin" #Login Usernname ( Changeable )

#Database

conn = sqlite3.connect(
    "database/vault.db",
    check_same_thread=False
)

cursor = conn.cursor()


cursor.execute("""

CREATE TABLE IF NOT EXISTS passwords(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    website TEXT,

    category TEXT,

    username TEXT,

    password TEXT,

    favorite INTEGER DEFAULT 0
)

""")

conn.commit()

# New Daily Password

def generate_password():

    now = datetime.now()

    generated_password = str(
        (now.day * now.month)
        + now.year
    )

    return generated_password


@app.route("/")
def home():

    return render_template(
        "index.html"
    )

# Login

@app.route(
    "/login",
    methods=["POST"]
)

def login():

    data = request.json

    username = data["username"]

    password = data["password"]

    if (
        username == USERNAME
        and
        password == generate_password()
    ):

        

        session["logged_in"] = True

        session.permanent = False

        return jsonify({
            "success": True
        })

    return jsonify({
        "success": False
    })

# Logout

@app.route("/logout")
def logout():

    session.clear()

    return redirect("/")

# Dashboard ( Main Page )

@app.route("/dashboard")
def dashboard():

    if not session.get("logged_in"):

        return redirect("/")

    cursor.execute(
        "SELECT * FROM passwords"
    )

    data = cursor.fetchall()

    passwords = []

    weak_count = 0

    favorite_count = 0

    website_counter = {}

     #Loop Password

    for item in data:

        decrypted = decrypt_password(
            item[4]
        )

        # Recognising Weak Password

        if len(decrypted) < 8:

            weak_count += 1

        # Favourite Count

        if item[5] == 1:

            favorite_count += 1

        # Most Used Website

        website = item[1]

        if website not in website_counter:

            website_counter[website] = 0

        website_counter[website] += 1

        passwords.append({

            "id": item[0],

            "website": item[1],

            "category": item[2],

            "username": item[3],

            "password": decrypted,

            "favorite": item[5]
        })


    most_used = "None"

    if website_counter:

        most_used = max(
            website_counter,
            key=website_counter.get
        )

    return render_template(

        "dashboard.html",

        passwords=passwords,

        total_passwords=len(passwords),

        favorite_count=favorite_count,

        weak_count=weak_count,

        most_used=most_used
    )

# Add Password ( IMP Function )

@app.route(
    "/add_password",
    methods=["POST"]
)

def add_password():

    if not session.get("logged_in"):

        return jsonify({
            "success": False
        })

    data = request.json

    encrypted_password = encrypt_password(
        data["password"]
    )

    cursor.execute("""

    INSERT INTO passwords(

        website,
        category,
        username,
        password

    )

    VALUES(?,?,?,?)

    """,(

        data["website"],

        data["category"],

        data["username"],

        encrypted_password
    ))

    conn.commit()

    return jsonify({
        "success": True
    })

# Delete Password

@app.route("/delete/<int:id>")
def delete_password(id):

    if not session.get("logged_in"):

        return jsonify({
            "success": False
        })

    cursor.execute(
        "DELETE FROM passwords WHERE id=?",
        (id,)
    )

    conn.commit()

    return jsonify({
        "success": True
    })

# Edit Password

@app.route(
    "/edit/<int:id>",
    methods=["POST"]
)

def edit_password(id):

    if not session.get("logged_in"):

        return jsonify({
            "success": False
        })

    data = request.json

    encrypted_password = encrypt_password(
        data["password"]
    )

    cursor.execute("""

    UPDATE passwords

    SET

    website=?,
    category=?,
    username=?,
    password=?

    WHERE id=?

    """,(

        data["website"],

        data["category"],

        data["username"],

        encrypted_password,

        id
    ))

    conn.commit()

    return jsonify({
        "success": True
    })

# Toggle Favourite ( To favourite a specific password )

@app.route("/favorite/<int:id>")
def favorite(id):

    if not session.get("logged_in"):

        return jsonify({
            "success": False
        })

    cursor.execute("""

    SELECT favorite

    FROM passwords

    WHERE id=?

    """,(id,))

    result = cursor.fetchone()

    if not result:

        return jsonify({
            "success": False
        })

    current_favorite = result[0]

    new_value = 1

    if current_favorite == 1:

        new_value = 0

    cursor.execute("""

    UPDATE passwords

    SET favorite=?

    WHERE id=?

    """,(

        new_value,

        id
    ))

    conn.commit()

    return jsonify({
        "success": True
    })

#Run

if __name__ == "__main__":

    app.run(
        debug=True
    )