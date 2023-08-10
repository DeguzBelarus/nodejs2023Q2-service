# Home Library Service (with ES6 classes database)

## Instructions

## Prerequisites

1. Install the Docker Desktop application from <https://www.docker.com/products/docker-desktop/>
2. (Optionally) Install the PostgreSQL with pgAmin from <https://www.postgresql.org/download/>

## 1. Clone the repository

```plaintext
git clone https://github.com/DeguzBelarus/nodejs2023Q2-service.git
```

## 2. Go to the project folder and chose the develop-part-2 branch in the git bash terminal

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
DOCKER_NETWORK_NAME=home-library-network
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

```

## 4. Install NPM modules

```plaintext
run npm install
```

## 5. Run docker build via docker-compose (Docker Desktop should be run)

```plaintext
run npm run docker-compose build
```

## 6. Run docker compose

```plaintext
run npm run docker-compose up

database should be connected or do the following steps:
a. Wait few seconds
b. Run npm run docker-compose down
c. Run npm run docker-compose up
```

## 7. Run tests (should be passed 67 from 67 tests)

```plaintext
run npm run test
```

## 8. Check the app

```plaintext
a. Download the Postman app: https://www.postman.com/
b. Install the Postman and make request according to the task routes
c. Database should work without pgAdmin installation
d. Data is stored in the volume (pgdata folder)
e. Database logs are stored in the volume (pglogs folder)
f. Make some safe changes in src folder (f.e. in console.log in main.ts) and the app should be restarted
```

## 9. Turn off docker compose

```plaintext
run npm run docker-compose down
```

## 10. Check the vulnerabilities scanning script

```plaintext
run npm run docker:vulnerabilities
```

## 11. Check the application images on Docker Hub

```plaintext
a. Visit https://hub.docker.com/repository/docker/deguz/home-library-db/general - database image
b. Visit https://hub.docker.com/repository/docker/deguz/home-library-main/general - main application image
```

## 12. Optionally check the app with pgAdmin

```plaintext
a. Setup and configure pgAdmin and configure database with it
b. Run npm run start:dev
c. Repeat the points №№7-8
```

### Thank you for reading and checking
