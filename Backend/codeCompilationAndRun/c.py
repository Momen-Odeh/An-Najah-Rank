import subprocess
from flask import jsonify
from codeCompilationAndRun.storeCodeFile import saveCodeToFile
import os

# compile C code
def compileCCode(cFilePath,folderPath):
    try:
        print("Compiling file:", cFilePath)
        if not os.path.isfile(cFilePath):
            return False, f"File not found: {cFilePath}"
        result = subprocess.run(['g++', cFilePath, '-o', folderPath], stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                text=True)
        print("Compilation result:", result)
        if result.returncode == 0:
            return True, "Compilation successful"
        else:
            error_message = result.stderr
            return False, error_message
    except Exception as e:
        return False, str(e)

# Run compiled C code
def runCCode(folderPath):
    try:
        result = subprocess.run([folderPath], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            return result.stdout, None
        else:
            return None, result.stderr
    except subprocess.CalledProcessError as e:
        return None, e.stderr

def compileAndRunCCode(code):
    try:
        codePath = saveCodeToFile("cTest", "c", code)
        folderPath = os.path.dirname(codePath)
        folderPath+="/output";
        success, std = compileCCode(codePath,folderPath)
        if success:
            stdout, stderr = runCCode(folderPath)
            if stdout is not None:
                return jsonify({'output': stdout})
            else:
                return jsonify({'error': 'Runtime error', 'stderr': stderr}), 500
        else:
            return jsonify({'error': 'Compilation error', 'stderr': std}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


