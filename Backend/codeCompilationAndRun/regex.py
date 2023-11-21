from flask import jsonify
import re
def test_regex(regex_pattern, input_data):
    try:
        result = []
        for input in input_data:
            result.append(True, bool(re.match(regex_pattern, input)), None)
        return jsonify({'output': result}), 200

    except Exception as e:
        return [(False, None, str(e))]