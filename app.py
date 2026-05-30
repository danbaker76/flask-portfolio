from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # Rendering your home page template
    return render_template('index.html')

@app.route('/projects')
def projects():
    # Rendering your projects listing page
    return render_template('projects.html')

@app.route('/data-demo')
def data_demo():
    # For your interactive table, you'd pass data from a database or file
    # sales_data = get_data() <-- You would need to implement this
    # return render_template('data_demo.html', sales_data=sales_data)
    return render_template('data_demo.html')

# This should be at the very bottom of your app.py file
if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)