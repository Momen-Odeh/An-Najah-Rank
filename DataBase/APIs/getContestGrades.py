from flask import jsonify
from dataBaseConnection import execute_query, fetch_results
from MySQL_SetUp import connection

def get_contests_grades(contest_id, challenges):
    try:
        contest_results_query = f"""
            SELECT ss.studentUniversityNumber, c.id as challengeId, ss.submissionResult
            FROM student_submissions ss
            INNER JOIN challenges c ON c.id = ss.challengeId
            WHERE contestId = '{contest_id}'
            AND submissionTime = (
                SELECT MAX(submissionTime)
                FROM student_submissions
                WHERE contestId = ss.contestId
                AND courseNumber = ss.courseNumber
                AND challengeId = ss.challengeId
                AND studentUniversityNumber = ss.studentUniversityNumber
            )
            ORDER BY studentUniversityNumber, challengeId;
        """
        contest_results = fetch_results(execute_query(connection, contest_results_query))

        students_query = f"""
            SELECT u.universityNumber, u.fullName
            FROM user u
            JOIN student_enrollments se ON u.universityNumber = se.studentNumber
            JOIN contests c ON c.courseNumber = se.courseNumber
            WHERE c.id = '{contest_id}';
        """
        students_cursor = execute_query(connection, students_query)
        students = fetch_results(students_cursor)

        results = []

        for student in students:
            student_id = student[0]
            student_name = student[1]
            student_result = {'studentId': student_id, 'studentName': student_name, 'challengeResults': {},
                              'totalResult': 0}

            for challenge in challenges:
                challenge_id = challenge['challenge_id']
                submission_result = None

                for result in contest_results:
                    if result[0] == student_id and result[1] == challenge_id:
                        submission_result = ((result[2]/100) * challenge['maxScore'])
                        break

                student_result['challengeResults'][challenge_id] = submission_result
                student_result['totalResult'] += submission_result if submission_result is not None else 0

            results.append(student_result)
        return results

    except Exception as e:
        print(e)
        return {'message': str(e)}, 409
