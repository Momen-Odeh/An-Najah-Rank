from codeCompilationAndRun.storeCodeFile import saveCodeToFile
import subprocess
from flask import jsonify
def configJsCode(JSFilePath, input_data=None, timeout=10):
    try:
        result = []
        if input_data is not None:
            for input in input_data:
                val = subprocess.run(['node', JSFilePath], input=input, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                     text=True, timeout=timeout)
                if "SyntaxError" in val.stderr:
                    return False, val.stderr
                result.append(val)
        else:
            val = subprocess.run(['node', JSFilePath], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
                                 timeout=timeout)
            if "SyntaxError" in val.stderr:
                return False, val.stderr
            result.append(val)

        results = [[r.returncode == 0, r.stdout, r.stderr] for r in result]

        return True, results
    except subprocess.CalledProcessError as e:
        return True, [(False, None, e.stderr)]
    except subprocess.TimeoutExpired:
        return True, [(False, None, "Subprocess timed out.")]
    except Exception as e:
        return True, [(False, None, str(e))]


def runJsCode(code, input_data=None):
    try:
        codePath = saveCodeToFile("JavaScriptTest", "js", "code/Mohee", code)
        success, output = configJsCode(codePath, input_data)
        if success is False:
            return jsonify({'error': 'Compile time error', 'stderr': output}), 400
        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
