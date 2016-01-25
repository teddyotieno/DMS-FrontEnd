# DOC-PLUS

**Doc-plus helps your create, organize and manage your documents.**

<a href="https://codeclimate.com/github/andela-totieno/DMS-FrontEnd"><img src="https://codeclimate.com/github/andela-totieno/DMS-FrontEnd/badges/gpa.svg" /></a>

[![Test Coverage](https://codeclimate.com/github/andela-totieno/DMS-FrontEnd/badges/coverage.svg)](https://codeclimate.com/github/andela-totieno/DMS-FrontEnd/coverage)


The system manages documents, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published. Users are categorized by roles. Each user must have a role defined for them.

## Installation

- Download and Install NodeJS and MongoDB.
- Clone the repository on your local machine, make sure you're on the Master branch.
- Navigate to the directory where you have cloned the project.
- Run npm install to install all the dependencies.


## BACKEND
### Express Routes

The Express module was used to create the routes. The routes are defined in the file `index.js`. The server has to be        started for the routes to be accessible. Start the server by running `node index.js` or `npm test`

### Seeding

Seeding is done automatically once the surver has been spurned or you could also run  the `npm test` command.


## TESTING

All tests should run once you run the `npm test` command.

### Backend-Tests

- Make sure you have installed jasmine-node globally
- Navigate towards the project directory
- Run `npm test` to spurn the server as well as run the tests
- 
### Frontend-Tests
Frontend Tests are done implementing Karma, Sinon and Jasmine packages.

## FRONTEND

**AngularJS** is the frontend framework implemented. The views were designed using **Angular-material.**

