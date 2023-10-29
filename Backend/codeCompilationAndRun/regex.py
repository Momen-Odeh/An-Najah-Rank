from flask import request
import re
def test_regex(regex_pattern, input_text):
    is_match = bool(re.match(regex_pattern, input_text))
    return {"result": is_match}, 200