from flask import request, jsonify
from FlaskSetUp import app


@app.route('/flask', methods=['GET'])
def index():
    # Access the token data from the request object
    return jsonify({'message': getattr(request, 'tokenData', None)})

if __name__ == '__main__':
    # socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
    app.run(debug=True)