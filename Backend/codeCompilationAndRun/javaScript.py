from codeCompilationAndRun.storeCodeFile import saveCodeToFile
import subprocess
from flask import jsonify
def configJsCode(JSFilePath, input_data=None):
    try:
        result = []
        if input_data is not None:
            for input in input_data:
                result.append(subprocess.run(['node', JSFilePath], input=input, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True))
        else:
            result.append(subprocess.run(['node', JSFilePath], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True))

        results = [[r.returncode == 0, r.stdout, r.stderr] for r in result]

        return results
    except subprocess.CalledProcessError as e:
        return [(False, None, e.stderr)]

    except Exception as e:
        return [(False, None, str(e))]


def runJsCode(code, input_data=None):
    try:
        codePath = saveCodeToFile("JavaScriptTest", "js", "code/Mohee", code)
        outout = configJsCode(codePath, input_data)
        return jsonify({'output': outout}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
