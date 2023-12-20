from flask import Flask, request, jsonify
from codeCompilationAndRun.java import compileAndRunJavaCode
from codeCompilationAndRun.c import compileAndRunCCode
from codeCompilationAndRun.python import runPythonCode
from codeCompilationAndRun.javaScript import runJsCode
from codeCompilationAndRun.regex import test_regex
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/java', methods=['POST'])
def applayJava():
    if request.is_json:
        try:
            data = request.get_json()
            code = data.get('code')
            input = data.get('input')
            return compileAndRunJavaCode(code, input)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400

@app.route('/c', methods=['POST'])
def compile_and_run_c():
    code = request.json.get('code')
    inputData = request.json.get('input')
    if not code:
        return jsonify({"error": "Missing 'code' parameter"}), 400
    return compileAndRunCCode(code, inputData)

@app.route('/python', methods=['POST'])
def applayPython():
    if request.is_json:
        try:
            data = request.get_json()
            code = data.get('code')
            input = data.get('input')
            return runPythonCode(code, input)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400

@app.route('/javascript', methods=['POST'])
def applayJs():
    if request.is_json:
        try:
            data = request.get_json()
            code = data.get('code')
            input = data.get('input')
            return runJsCode(code, input)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400

@app.route('/regularexpression', methods=['POST'])
def applayRE():
    if request.is_json:
        try:
            data = request.get_json()
            code = data.get('code')
            input = data.get('input')
            return test_regex(code, input)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400

if __name__ == "__main__":
    app.run(debug=True)
