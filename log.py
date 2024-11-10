from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import hashlib
import os

app = Flask(__name__)

# Configuración de la base de datos
DB_NAME = 'users.db'

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  email TEXT UNIQUE NOT NULL,
                  password TEXT NOT NULL)''')
    conn.commit()
    conn.close()

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def add_user(email, password):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    try:
        c.execute("INSERT INTO users (email, password) VALUES (?, ?)",
                  (email, hash_password(password)))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()

def check_credentials(email, password):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT password FROM users WHERE email = ?", (email,))
    result = c.fetchone()
    conn.close()
    if result:
        return result[0] == hash_password(password)
    return False

# Inicializar la base de datos
init_db()

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/log.html')
def register_page():
    return send_from_directory('.', 'log.html')

@app.route('/main.html')
def main_page():
    return "Bienvenido a la página principal!"

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if check_credentials(email, password):
        return jsonify({"success": True, "message": "Login exitoso!"})
    else:
        return jsonify({"success": False, "message": "Email o contraseña inválidos."}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if add_user(email, password):
        return jsonify({"success": True, "message": "Registro exitoso!"})
    else:
        return jsonify({"success": False, "message": "El email ya está registrado."}), 400

if __name__ == '__main__':
    app.run(debug=True)

print("Iniciando el servidor...")
print("Accede a http://localhost:5000 en tu navegador para ver la página de login.")