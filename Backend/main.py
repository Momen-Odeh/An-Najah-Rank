from flask import Flask, request, jsonify
from codeCompilationAndRun.java import compileAndRunJavaCode
from codeCompilationAndRun.c import compileAndRunCCode
from codeCompilationAndRun.python import runPythonCode
from codeCompilationAndRun.javaScript import runJsCode
app = Flask(__name__)

@app.route('/java', methods=['POST'])
def applayJava():
    if request.is_json:
        try:
            data = request.get_json()
            code = data.get('code')
            return compileAndRunJavaCode(code)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400

@app.route('/c', methods=['POST'])
def compile_and_run_c():
    c_code = request.json.get('c_code')
    if not c_code:
        return jsonify({"error": "Missing 'c_code' parameter"}), 400
    return compileAndRunCCode(c_code)

@app.route('/python', methods=['POST'])
def applayPython():
    if request.is_json:
        try:
            data = request.get_json()
            code = data.get('code')
            return runPythonCode(code)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400

@app.route('/JS', methods=['POST'])
def applayJs():
    if request.is_json:
        try:
            data = request.get_json()
            code = data.get('code')
            return runJsCode(code)
        except Exception as e:
            return jsonify({"error": "Invalid JSON data"}), 400
    else:
        return jsonify({"error": "Request body must contain JSON data"}), 400



if __name__ == "__main__":
    app.run(debug=True)
