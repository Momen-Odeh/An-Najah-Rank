import subprocess
from flask import jsonify
from codeCompilationAndRun.storeCodeFile import saveCodeToFile
import os

# --------------------------------------------------------------------------------- compile code
def compileJavaCode(javaFilePath):
    try:
        result = subprocess.run(['javac', javaFilePath], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            return True, result.stdout
        else:
            error_message = result.stderr
            return False, error_message

    except Exception as e:
        return False, str(e)


# ---------------------------------------------------------------------------------
def runJavaCode(folderPath, java_class_name, input_data):
    try:
        result = []
        if input_data:
            for input in input_data:
                result.append(subprocess.run(['java', '-cp', folderPath, java_class_name], input=input, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True))
        else:
            result.append(subprocess.run(['java', '-cp', folderPath, java_class_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True))

        results = [[r.returncode == 0, r.stdout, r.stderr] for r in result]

        return results
    except subprocess.CalledProcessError as e:
        return [(False, None, e.stderr)]

def compileAndRunJavaCode(code, input_data):
    try:
        codePath = saveCodeToFile("javaTest", "java", "code/Momen", code)
        folderPath = os.path.dirname(codePath)
        success, std = compileJavaCode(codePath)
        if success:
            output = runJavaCode(folderPath, "Main", input_data)
            return jsonify({'output': output}), 200
        else:
            return jsonify({'error': 'Compile time error', 'stderr': std}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500



