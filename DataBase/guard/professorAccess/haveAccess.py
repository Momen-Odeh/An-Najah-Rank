from flask import request, jsonify
from FlaskSetUp import app
from guard.professorAccess.AccessCourseProfessor import accessCourseProfessor
@app.route('/is-admin-or-professor', methods=['GET'])
def haveAccess():
    try:
        tokenData = getattr(request, 'tokenData', None)
        role = tokenData['role']
        if not (role == 'professor' or role == 'admin'):
            return jsonify({"message": "Access Denied"}), 401
        courseId = request.args.get('courseId')
        if courseId:
            access = accessCourseProfessor(courseId, tokenData['universityNumber'])
            if not access:
                return jsonify({"message": "Access Denied"}), 401
        return jsonify({"message": "ok"}), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": e,
        }), 400