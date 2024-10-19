# app.py
from flask import Flask, jsonify, render_template, send_from_directory
import os
import urllib.parse

app = Flask(__name__)
directory_path = '/Volumes/ROMS/roms/'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/folders')
def get_folders():
    folders = [f for f in os.listdir(directory_path) if os.path.isdir(os.path.join(directory_path, f))]
    return jsonify(folders)

@app.route('/files/<folder>')
def get_files(folder):
    folder_path = os.path.join(directory_path, folder)
    zip_files = [f for f in os.listdir(folder_path) if f.endswith('.zip')] if os.path.isdir(folder_path) else []
    return jsonify(zip_files)

@app.route('/download/<folder>/<filename>')
def download_file(folder, filename):
    return send_from_directory(os.path.join(directory_path, folder), filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
