import os
def saveCodeToFile(fileName,extention,relativePath,code):
    try:
        fullPath = os.path.abspath(os.path.join(relativePath, f"{fileName}.{extention}"))
        print(f"Full path: {fullPath}")
        with open(fullPath,"w",encoding="utf-8") as file:
            file.write(code)
    except Exception as e:
        print(f"Error: {e}")

    return fullPath