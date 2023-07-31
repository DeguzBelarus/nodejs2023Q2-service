# Home Library Service (with ES6 classes database)

## Instructions

## 1. Clone the repository

```plaintext
git clone https://github.com/DeguzBelarus/nodejs2023Q2-service.git
```

## 2. Go to the project folder and chose the develop branch in git

## 3. Create .env file with following content

```plaintext
PORT=4000
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

## 5. Run this app in development mode

```plaintext
run npm run start:dev
```

## 6. Run tests (should be passed 67 from 67 tests)

```plaintext
run npm run test
```

## 7. Check the app

```plaintext
a. Download the Postman app: https://www.postman.com/
b. Install the Postman and make request according to the task routes
```

## 8. Check the OpenAPI

```plaintext
a. Open api.yaml file in the doc folder and copy its content 
b. Go to the Swagger Editor site: https://editor-next.swagger.io/ and paste the copied content
c. Check the generated document
```

### Thank you for reading and checking