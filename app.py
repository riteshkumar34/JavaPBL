from flask import Flask, request, send_file, render_template
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('form.html')  # This will render the form

@app.route('/generate_receipt', methods=['POST'])
def generate_receipt():
    data = request.get_json()
    
    name = data.get('name')
    age = data.get('age')
    mobile_number = data.get('mobile_number')
    aadhar_number = data.get('aadhar_number')
    gender = data.get('gender')
    doctor = data.get('doctor')
    date_of_treatment = data.get('date_of_treatment')
    slot = data.get('slot')
    feedback = data.get('feedback')

    filename = "hospital_receipt.pdf"
    filepath = os.path.join(os.getcwd(), filename)

    c = canvas.Canvas(filepath, pagesize=letter)
    c.drawString(100, 750, "Hospital OPD Registration Receipt")
    c.drawString(100, 730, f"Name: {name}")
    c.drawString(100, 715, f"Age: {age}")
    c.drawString(100, 700, f"Mobile Number: {mobile_number}")
    c.drawString(100, 685, f"Aadhar Number: {aadhar_number}")
    c.drawString(100, 670, f"Gender: {gender}")
    c.drawString(100, 655, f"Doctor: {doctor}")
    c.drawString(100, 640, f"Date of Treatment: {date_of_treatment}")
    c.drawString(100, 625, f"Slot: {slot}")
    c.drawString(100, 610, f"Feedback: {feedback}")
    c.drawString(100, 590, "Thank you for registering. Get well soon!")
    c.save()

    return send_file(filepath, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
