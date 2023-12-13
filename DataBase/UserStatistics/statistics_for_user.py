from dataBaseConnection import execute_query, fetch_results, update_data, delete_data
from MySQL_SetUp import connection
def statistics_for_user (userId):
    sql = f"""
            select se.*,c.id as contest_id , cc.challenge_id,ch.difficulty,
            count(cc.challenge_id) as totalSubmition,
            (select count(ss.id)
            from student_submissions ss
            inner join challenges ccc on  ccc.id = ss.challengeId
            where ss.studentUniversityNumber = '{userId}' and ss.submissionResult = '100' 
            and ccc.difficulty = ch.difficulty) as successSubmition
            from student_enrollments se
            inner join contests c on se.courseNumber = c.courseNumber
            inner join contests_challenges cc on c.id = cc.contest_id
            inner join challenges ch on cc.challenge_id = ch.id
            where se.studentNumber = '{userId}'
            group by ch.difficulty
            """
    totalSub =0
    totalSubSucc=0
    result = fetch_results(execute_query(connection, sql))

    res = []
    for row in result:
        totalSub+= row[5]
        totalSubSucc += row[6]
        res.append({"difficulty": row[4], "totalSubmition":row[5], "totalSuccessSubmition":row[6]})

    desired_difficulties = ['Easy', 'Medium', 'Hard']
    missing_difficulties = [difficulty for difficulty in desired_difficulties if
                            not any(entry['difficulty'] == difficulty for entry in res)]
    for item in missing_difficulties:
        res.append({"difficulty": item, "totalSubmition": 0, "totalSuccessSubmition": 0})
    res.append({"difficulty": "allDifficulty", "totalSubmition": totalSub, "totalSuccessSubmition": totalSubSucc})
    return res