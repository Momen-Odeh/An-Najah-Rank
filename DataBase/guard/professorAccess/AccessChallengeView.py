from MySQL_SetUp import connection
from guard.professorAccess.AccessContestProfessor import accessContestProfessor
def accessChallengeViewProfessor(courseNumber, contestNumber, challengeNumber, universityNumber):
    valid = False
    access = accessContestProfessor(courseNumber, contestNumber, universityNumber)
    print(access)
    if access:
        query = f"""
                    SELECT challenge_id FROM contests_challenges WHERE contest_id = '{contestNumber}';
                """
        cursor = connection.cursor()
        cursor.execute(query)
        challenges = cursor.fetchall()
        for challenge in challenges:
            if challenge[0] == int(challengeNumber):
                valid = True
                break
    if valid:
        return True
    else:
        return False
