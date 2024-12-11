import qrcode
from flask import Flask, request, render_template
import cv2
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Home route
@app.route('/')
def index():
    return render_template('index.html')

# QR Code from Text
@app.route('/generate_text_qr', methods=['POST'])
def generate_text_qr():
    text = request.form['text']
    fill_color = request.form.get('fill_color', 'black')
    back_color = request.form.get('back_color', 'white')

    qr = qrcode.QRCode()
    qr.add_data(text)
    qr.make(fit=True)
    img = qr.make_image(fill_color=fill_color, back_color=back_color)
    img.save('static/text_qr.png')
    return render_template('result.html', qr_code='static/text_qr.png')

# QR Code from Uploaded Image
@app.route('/generate_image_qr', methods=['POST'])
def generate_image_qr():
    file = request.files['image']
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        qr = qrcode.QRCode()
        qr.add_data(filepath)
        qr.make(fit=True)
        img = qr.make_image(fill_color='black', back_color='white')
        img.save('static/image_qr.png')
        return render_template('result.html', qr_code='static/image_qr.png')

# QR Code from Live Image
@app.route('/generate_live_qr', methods=['POST'])
def generate_live_qr():
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite('static/live_image.png', frame)
        qr = qrcode.QRCode()
        qr.add_data('static/live_image.png')
        qr.make(fit=True)
        img = qr.make_image(fill_color='black', back_color='white')
        img.save('static/live_qr.png')
    cap.release()
    return render_template('result.html', qr_code='static/live_qr.png')

if __name__ == '__main__':
    app.run(debug=True)