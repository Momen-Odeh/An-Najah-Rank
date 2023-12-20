from flask import jsonify
import re
def test_regex(regex_pattern, input_data):
    try:
        result = []
        print("input_data", input_data)
        for input in input_data:
            print("bool(re.match(regex_pattern, input))", bool(re.match(regex_pattern, input)))
            result.append([True, 'true' if bool(re.match(regex_pattern, input)) else 'false', None])
            print(result)
        return {'output': result}, 200

    except Exception as e:
        return [[False, None, str(e)]]