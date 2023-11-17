import os
def get_file_extension(file_key):
    _, file_extension = os.path.splitext(file_key)
    file_extension = file_extension.lstrip('.')
    return file_extension