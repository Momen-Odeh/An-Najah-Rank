from MySQL_SetUp import connection
def accessContest(courseNumber, contestNumber, universityNumber):
    query = f"""
                        WITH contest_course AS (
                        SELECT courseNumber
                        FROM `an-najah rank`.contests
                        WHERE id = '{contestNumber}'
                        )

                        SELECT cm.stuffNumber as registerNumber
                        FROM `an-najah rank`.course_moderators cm
                        JOIN contest_course cc ON cm.courseNumber = cc.courseNumber
                        WHERE cc.courseNumber = '{courseNumber}'
                        UNION

                        SELECT c.ownerUniversityNumber as registerNumber
                        FROM `an-najah rank`.courses c
                        JOIN contest_course cc ON c.courseNumber = cc.courseNumber
                        WHERE cc.courseNumber = '{courseNumber}'
                        
                        UNION

                        SELECT se.studentNumber as registerNumber
                        FROM `an-najah rank`.student_enrollments se
                        JOIN contest_course cc ON se.courseNumber = cc.courseNumber
                        WHERE cc.courseNumber = '{courseNumber}';
                        UNION
                        SELECT universityNumber as registerNumber from user where role = 'admin'

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
