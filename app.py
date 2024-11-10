from flask import Flask, render_template, request, redirect, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
app.secret_key = '3f5e8a1e7c4d6f5e2c1b8d6a7e9f6a8b'  # Cambia este valor por uno seguro

# Configura tus credenciales de correo electrónico aquí
SMTP_SERVER = "smtp.gmail.com"  # Cambia esto a tu servidor SMTP
SMTP_PORT = 587  # Usualmente 587 para TLS o 465 para SSL
EMAIL_ADDRESS = "nickstevenortiz@gmail.com"  # Tu correo electrónico
EMAIL_PASSWORD = "NA29042022"  # Tu contraseña de correo

@app.route('/')
def index():
    return render_template('correo.html')  # Carga el HTML que has creado

@app.route('/send_reset', methods=['POST'])
def send_reset():
    email = request.form['logemail']
    subject = "Restablecimiento de contraseña"
    body = "Test para reestablecer contraseña"

    # Configura el mensaje de correo electrónico
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Envía el correo
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, email, msg.as_string())
        flash("Correo enviado exitosamente para restablecer contraseña.", "success")
    except Exception as e:
        flash(f"Error al enviar el correo: {e}", "error")

    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
