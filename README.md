# DMS
The system manages documents, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published. Users are categorized by roles. Each user must have a role defined for them.

Installation
- Download and Install NodeJS and MongoDB.
- Clone the repository on your local machine.
- Navigate to the directory where you have cloned the project.
- Run npm install to install all the dependencies.

Seeding
- Once all the dependencies have been installed. 
- Run npm start to seed the models; users, documents and roles.


Testing
- Make sure you have installed jasmine-node globally
- Navigate towards the project directory
- Run jasmine-node spec on your command line to run all the tests
