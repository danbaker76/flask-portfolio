from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sys, os

app = Flask(__name__)
CORS(app)   # enable CORS for the whole site (optional, but harmless)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/data-demo')
def data_demo():
    return render_template('data_demo.html')

@app.route('/projects/<int:project_id>')
def project_detail(project_id):
    return render_template('project_detail.html', project_id=project_id)

@app.route('/ufc-predictor')
def ufc_predictor():
    return render_template('ufc_predictor.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)