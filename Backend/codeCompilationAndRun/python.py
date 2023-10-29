from codeCompilationAndRun.storeCodeFile import saveCodeToFile
import subprocess
from flask import jsonify
def configPythonCode(pythonFilePath, input_data=None):
    try:
        if input_data is not None:
            result = subprocess.run(['python', pythonFilePath], input=input_data, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        else:
            result = subprocess.run(['python', pythonFilePath], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            return True, result.stdout
        else:
            error_message = result.stderr
            return False, error_message

    except Exception as e:
        return False, str(e)

def runPythonCode(code, input_data=None):
    try:
        codePath = saveCodeToFile("pythonTest", "py", "code/NoorAldeen", code)
        success, std = configPythonCode(codePath, input_data)
        if success:
            return jsonify({'output': std})
        else:
            return jsonify({'error': 'Error', 'stderr': std}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
