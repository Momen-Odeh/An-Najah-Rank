from codeCompilationAndRun.storeCodeFile import saveCodeToFile
import subprocess
from flask import jsonify
def configPythonCode(pythonFilePath, input_data=None, timeout=10):
    try:
        result = []
        if input_data is not None:
            for input in input_data:
                val = subprocess.run(['python', pythonFilePath], input=input, stdout=subprocess.PIPE,
                                     stderr=subprocess.PIPE, timeout=timeout, text=True)
                if "SyntaxError" in val.stderr or "IndentationError" in val.stderr:
                    return False, val.stderr
                result.append(val)
        else:
            val = subprocess.run(['python', pythonFilePath], stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                 timeout=timeout, text=True)
            if "SyntaxError" in val.stderr or "IndentationError" in val.stderr:
                return False, val.stderr
            result.append(val)

        results = [[r.returncode == 0, r.stdout, r.stderr] for r in result]
        return True, results

    except subprocess.CalledProcessError as e:
        return True, [(False, None, e.stderr)]
    except subprocess.TimeoutExpired:
        return True, [(False, None, "Subprocess timed out.")]
    except Exception as e:
        print(e)
        return True, [(False, None, str(e))]


def runPythonCode(code, input_data=None):
    try:
        codePath = saveCodeToFile("pythonTest", "py", "code/NoorAldeen", code)
        success, output = configPythonCode(codePath, input_data)
        if success is False:
            return jsonify({'error': 'Compile time error', 'stderr': output}), 400
        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
