from MySQL_SetUp import connection
def accessCourseProfessor(courseNumber, universityNumber):
    query = f"""
                        SELECT stuffNumber as registerNumber FROM `an-najah rank`.course_moderators WHERE courseNumber='{courseNumber}'
                        UNION
                        SELECT ownerUniversityNumber as registerNumber FROM `an-najah rank`.courses WHERE courseNumber='{courseNumber}'
                        UNION
                        SELECT universityNumber as registerNumber from user where role = 'admin';
                    """
    cursor = connection.cursor()
    cursor.execute(query)
    users = cursor.fetchall()
    valid = False
    for user in users:
        if user[0] == universityNumber:
            valid = True
            break
    if valid:
        return True
    else:
        return False
