# Home Library Service (with PostgreSQL database via TypeORM and Docker)

## Instructions

## Prerequisites

Chose any one way to check:

1. Install the Docker Desktop application from <https://www.docker.com/products/docker-desktop/> (if You want to check with Docker)
2. Install the PostgreSQL with pgAmin from <https://www.postgresql.org/download/> (if You want to check with pgAmin database)

## 1. Clone the repository

```plaintext
git clone https://github.com/DeguzBelarus/nodejs2023Q2-service.git
```

## 2. Go to the project folder and chose the develop-part-3 branch in the git bash terminal

## 3. Create .env file with following content

```plaintext
PORT=4000

TYPEORM_HOST_DEV=localhost
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=12345678 (change to your password in pgAmin)
TYPEORM_DATABASE=rss-home-library (change to your database name in pgAmin)
TYPEORM_PORT=5432

MAIN_IMAGE_NAME=home-library-main
DB_IMAGE_NAME=home-library-db
DOCKER_MAIN_FILE_NAME=Dockerfile
DOCKER_DB_FILE_NAME=DockerfileDB
DOCKER_DB_HOST_DEV=postgres
DOCKER_DB_USERNAME=postgres
DOCKER_DB_NAME=postgres
DOCKER_DB_PASSWORD=postgres
DOCKER_DB_PORT=5432

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h

LOGGING_LEVEL=2
LOG_FILES_MAX_SIZE=100000
```

## 4. Install NPM modules

```plaintext
run npm install
```

## 5 Run docker build via docker-compose (Docker Desktop should be run) - !!Skip this point in case of checking with pgAdmin

```plaintext
run npm run docker-compose build
```

## 6 Run docker compose - !!Skip this point in case of checking with pgAdmin

```plaintext
run npm run docker-compose up

database should be connected or do the following steps:
a. Kill process via CTRL+C
b. Try to wait few seconds (main point), if this doesn't help - move to the point c
c. Run npm run docker-compose down
d. Run npm run docker-compose up
```

## 7. Database preparation

```plaintext
a. Run database clearing npm run migration:revert
b. Run database migration npm run migration:run
```

## 8 Start the app with pgAdmin - !!Skip this point in case of checking with Docker

```plaintext
a. Setup and configure pgAdmin and configure database with it
c. Run npm run start:dev
```

## 9. Run tests (should be passed 94 from 94 tests)

```plaintext
run npm run test:auth

Notice:
Do not use the general test script.

!!important: some tests can fail in the first time after migration:
a. if some tests are failed run the tests again.
```

## 10. Check the app and logging

```plaintext
a. Download the Postman app: https://www.postman.com/
b. Install the Postman and make requests according to the task routes
c. Check the logs files in ./logs/common
d. Check the error logs files in ./logs/errors
e. Chose another level of logs in LOGGING_LEVEL env variable (from 0 to 2)
f. Check the app and logging again with new logging level
```

## 11. Check the authorization routes according the task

```plaintext
a. auth/signup - user registration route
b. auth/login  - user logging in route
c. auth/refresh - token refreshing route (use the refreshToken from the login request body)
```

## 12. Turn off docker compose - !!Skip in this point case of checking with pgAdmin

```plaintext
run npm run docker-compose down
```

## Notes

```plaintext
a. Error handling and logging is implemented for uncaughtException in the LoggingService
a. Error handling and logging is implemented for unhandledRejection  in the LoggingService
```

### Thank you for reading and checking
