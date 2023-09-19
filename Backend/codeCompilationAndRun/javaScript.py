from codeCompilationAndRun.storeCodeFile import saveCodeToFile
import subprocess
from flask import jsonify
def configJsCode(JSFilePath):
    try:
        result = subprocess.run(['node', JSFilePath], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            return True,result.stdout
        else:
            error_message = result.stderr
            return False, error_message

    except Exception as e:
        return False, str(e)

def runJsCode(code):
    try:
        codePath = saveCodeToFile("JavaScriptTest", "js","code/Mohee", code)
        success, std = configJsCode(codePath)
        if success:
                return jsonify({'output': std})
        else:
            return jsonify({'error': 'Error', 'stderr': std}), 400
    except Exception as e:
        return str(e)