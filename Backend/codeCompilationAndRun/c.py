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
def runCCode(folderPath, input_data):
    try:
        result = []
        if(input_data):
            for input in input_data:
                result.append(subprocess.run([folderPath], input=input, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True))
        else:
            result.append(subprocess.run([folderPath], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True))

        results = [[r.returncode == 0, r.stdout, r.stderr] for r in result]

        return results
    except subprocess.CalledProcessError as e:
        return [(False, None, e.stderr)]

def compileAndRunCCode(code, input_data):
    try:
        codePath = saveCodeToFile("cTest", "c", "code/Momen", code)
        folderPath = os.path.dirname(codePath)
        folderPath += "/output"
        success, std = compileCCode(codePath, folderPath)
        if success:
            output = runCCode(folderPath, input_data)
            return jsonify({'output': output}), 200
        else:
            return jsonify({'error': 'Compile time error', 'stderr': std}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500