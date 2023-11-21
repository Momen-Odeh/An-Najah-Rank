from fileManagment.getFileExtention import get_file_extension
def get_language_type(key):
    extention = get_file_extension(key)
    language = 'c'
    if (extention == "java"):
        language = 'java'
    elif (extention == "py"):
        language = 'python'
    elif (extention == "js"):
        language = 'javascript'
    elif (extention == "txt"):
        language = 'regularexpression'
    elif (extention == "cpp"):
        language = 'c++'

    return language
