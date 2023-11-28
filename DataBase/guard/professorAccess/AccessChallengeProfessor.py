from MySQL_SetUp import connection


def accessChallengeProfessor(challengeNumber, universityNumber):
    query = f"""
                SELECT ownerUniversityNumber as universityNumber from challenges WHERE id = '{challengeNumber}' AND 
                ownerUniversityNumber = '{universityNumber}'
                union
                SELECT universityNumber as universityNumber from user where role = 'admin';
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
