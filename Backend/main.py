from flask import Flask, request, jsonify
from codeCompilationAndRun.java import compileAndRunJavaCode

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



if __name__ == "__main__":
    app.run(debug=True)
