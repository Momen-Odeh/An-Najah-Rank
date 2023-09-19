import subprocess
from flask import jsonify
from codeCompilationAndRun.storeCodeFile import saveCodeToFile
import os

# --------------------------------------------------------------------------------- compile code
def compileJavaCode(javaFilePath):
    try:
        result = subprocess.run(['javac', javaFilePath], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            return True,result.stdout
        else:
            error_message = result.stderr
            return False, error_message

    except Exception as e:
        return False, str(e)


# ---------------------------------------------------------------------------------
def runJavaCode(folderPath,java_class_name):
    try:
        result = subprocess.run(['java', '-cp',folderPath,java_class_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            return result.stdout, None  # No error occurred, return stdout
        else:
            return None, result.stderr  # An error occurred, return stderr
    except subprocess.CalledProcessError as e:
        return None, e.stderr

def compileAndRunJavaCode(code):
    try:
        codePath = saveCodeToFile("javaTest","java","code/Momen",code)
        folderPath = os.path.dirname(codePath)
        success,std = compileJavaCode(codePath)
        # *********************
        if success:
            stdout, stderr = runJavaCode(folderPath,"Main")
            if stdout is not None:
                return jsonify({'output': stdout})
            else:
                return jsonify({'error': 'Runtime error', 'stderr': stderr}), 500
        else:
            return jsonify({'error': 'Compilation error', 'stderr': std}), 400
    except Exception as e:
        return False, str(e)  # Compilation failed due to an exception


