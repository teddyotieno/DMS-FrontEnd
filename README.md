# DMS

The system manages documents, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published. Users are categorized by roles. Each user must have a role defined for them.

## Installation

- Download and Install NodeJS and MongoDB.
- Clone the repository on your local machine.
- Navigate to the directory where you have cloned the project.
- Run npm install to install all the dependencies.


## Express Routes

The Express module was used to create the routes. The routes are defined in the file <p>index.js</p>. The server has to be started for the routes to be accessible. Start the server by running <p>nodemon index.js</p> or <p>npm test</p>


## Seeding

- Once all the dependencies have been installed.
- Run <p>npm test</p> to seed all the models


## Testing

Testing is done using the superagent and frisby modules. Both superagent and frisby are used to make API requets to the server and the tests are made on the responses of the requests.
- Make sure you have installed jasmine-node globally
- Navigate towards the project directory
- Run <p>npm test</p> to spurn the server as well as run the tests
