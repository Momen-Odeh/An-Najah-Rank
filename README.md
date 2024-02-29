# An-Najah-Rank
One of the most important skills for any programmer is problem-solving skills, and there are many websites that can be used to train these skills. 
At An-Najah National University, professors always strive to improve students' problem-solving skills in many subjects such as computer programming, data structures, algorithms, and object-oriented programming by assigning problem-solving assignments and quizzes using problem-solving websites. However, they face several challenges in using these websites, such as difficulty tracking student submissions, an inability to identify code similarities among students' submissions directly, and the inability to manually mark incorrect answers. Therefore, we undertook the development of this project to address these challenges head-on.

## Features
  - User Features
    - Registration
    - Sign in
    - Forget password
    - Account Settings
    - Chatting
    - Notifications
  - Professor Features
    - Create course
    - Manage courses
    - Manage course details
      - Manage course moderators
      - Manage students in course
    - Create contest
    - Manage contests
      - Manage contest details
      - Manage challenges in contest
    - Create challenge
    - Manage challenge details
      - Add test case to challenge
      - Manage test cases in challenge
    - Track students submissions
    - manual mark for student submissions
    - calculate similarity
  - Student Features
    - Access to courses
    - run code for the challenge
    - add submissions to the challenge
    - show the test case status for the challenge
  - Admin Features
    - Manage professors requests.
    - Manage professors
    - Manage student
    - Students statistics
  - Responsive design

## Tools
- Frontend tools:
  - React JS
  - React Bootstrap
  - React JSS
  - React Router
- Backend tools
  - Flask python
  - MySQL Database
  - Pandas library
  - SocketIO
- DevOps tools
  - Github
  - Trello
  - Docker
  - Docker Compose
  
- AWS CloudFormation
  - Amazon Elastic Compute Cloud (**AWS EC2**)
  - Amazon Simple Storage Service (**AWS S3**)
  - Amazon Relational Database Service (**AWS RDS**)
## Architecture
  - Architectural Style
    
    We used the RESTful architectural style, which is a design approach for networked applications prioritizing simplicity, scalability, and loose coupling. It utilizes a stateless client-server model with principles such as statelessness, a uniform interface, and resource-based interactions. Key advantages encompass simplicity, scalability, and a consistent interface.
    
    ![image](https://github.com/Momen-Odeh/An-Najah-Rank/assets/92532348/bc211d30-d05e-41a5-b20c-a8b10b628b96)

- Architectural Pattern

  We used the Microservices architectural pattern, which is particularly beneficial for large and complex applications where different functionalities can be developed and maintained independently.

  ![699290258308468736](https://github.com/Momen-Odeh/An-Najah-Rank/assets/92532348/f08c5241-2f90-43d1-98e2-692c569506ca)

- Project Structure
  
  ![image](https://github.com/Momen-Odeh/An-Najah-Rank/assets/92532348/4b59315e-69fb-46ae-8d13-172d00b1f772)

  We divide the project into 3 servers :
  1. 	Frontend server: Handles client requests and returns the UI to the client.
  2. Database server: Manages requests from the Frontend container. If the request is related to code operations, it passes the request to the Backend container and returns the response to the Frontend container.
	3. Backend server: Handles code operation requests, such as compiling and running code.
## Security
  - Authentication
    
    verifying the identity of a user or system before granting access to resources or services.
  - Authorization

    determining whether a user or system has the necessary permissions to access specific resources or perform certain actions within a software system.
  - CORS policies
    
    we enable the CORS policy for the frontend address, so any received request from another address will be rejected.
## Deployment
![image](https://github.com/Momen-Odeh/An-Najah-Rank/assets/92532348/d1db00fd-e99f-41c1-bec1-1faebecbd8a8)
In the deployment structure for the frontend, Nginx serves as a crucial web server, playing a key role in handling the dynamic runtime of the React application.

In the database and backend deployment structure optimized for APIs, Flask serves as the foundational framework, responsible for handling application logic and dynamically generating content. Gunicorn is employed as the WSGI server, efficiently managing communication and concurrent requests through multiple worker processes. While Nginx, traditionally recognized as a reverse proxy for web applications, is considered optional in this API-centric setup, it remains a valuable component for potential load balancing and additional security measures. The refined architecture emphasizes a modular separation of concerns, with Flask managing API routes, Gunicorn overseeing WSGI interactions, and Nginx, when utilized, contributing to load balancing and potential security enhancements. This streamlined structure establishes a dependable, scalable, and secure foundation specifically designed for deploying a Flask backend focused on API functionalities in production environments, combining the strengths of Flask, Gunicorn, and Nginx for optimal performance and security.

## Testing
Testing is a critical phase in the software development lifecycle aimed at ensuring the quality, reliability, and functionality of a software product. The primary objective of testing is to identify defects or issues within the application, allowing developers to address them before the software is deployed to end-users. After implementing the project, we conduct manual testing for all features in the system to ensure that all features work correctly.

## Documentation

For more details, view the project report from this link: 
[An Najah Rank Report](https://drive.google.com/file/d/1LWvS8-M4QzNC_6Z_ZX_0Ylcj-TYzCV6p/view?usp=sharing)

## Demo

Click here to see the demo: 
[An Najah Rank Demo](https://drive.google.com/file/d/1h2LQbOlVRawxi2duRUeTFTyo3ESSancM/view?usp=sharing)

  
