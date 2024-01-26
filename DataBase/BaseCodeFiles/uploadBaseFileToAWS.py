import os
from fileManagment.uploadFile import upload_file


def upload_base_file_to_aws(language, code):
    try:
        extension = 'c'
        if language == "Java":
            extension = 'java'
        elif language == "Python":
            extension = 'py'
        elif language == "JavaScript":
            extension = 'js'
        elif language == "Regex":
            extension = 'txt'
        elif language == "C++":
            extension = 'cpp'

        full_path = os.path.abspath(os.path.join("BaseCodeFiles", f"file.{extension}"))
        print(f"Full path: {full_path}")

        with open(full_path, "w", encoding="utf-8") as file:
            file.write(code)

        with open(full_path, 'rb') as file:
            file_key = upload_file(file, f"BaseCodeFiles/{language}", full_path)

        return file_key

    except Exception as e:
        return {'message': str(e)}


