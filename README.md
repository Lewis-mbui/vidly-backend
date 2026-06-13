# Vidly Backend API

A RESTful API for managing a movie rental service built with **Node.js, Express, and MongoDB**. The application supports user authentication, role-based authorization, movie rentals, inventory management, request validation, error logging, and automated testing.

## Table of contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Testing](#testing)
- [Lessons Learned](#lessons-learned)
- [Future Improvements](#future-improvements)

## Overview

Vidly Backend is a server-side application that provides the core functionality of a movie rental platform. The API allows clients to manage movies, genres, customers, rentals, and user accounts through a set of RESTful endpoints.

The project demonstrates common backend development practices including:

- JWT-based authentication
- Role-based access control
- Password hashing with **Bcrypt**
- Request validation with **Joi**
- **MongoDB** data modelling with **Mongoose**
- Transaction management for rental processing
- Centralized logging and error handling
- Automated testing with **Jest** and **SuperTest**

## Tech Stack

### Backend

- Node.js
- Express

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### Validation

- Joi

### Testing

- Jest
- Supertest

### Logging & Monitoring

- Winston(TEST)

## Features

### Authentication & User Management

- User Registration
- User login with JWT generation
- Secure password hashing using **bcrypt**
- Retrieve authenticated user profile

### Movie & Genre Management

- Create, retrieve, update and delete genres
- Create, retrieve, update and delete movies
- Associate movies with genres

### Customer Management

- Create, retrieve, update and delete customer
- Support for customer membership information

### Rental Processing

- Create rentals
- Track rental history
- Process movie returns
- Automatically update movie inventory
- MongoDB transaction support to ensure rental consistency

### Security & Reliability

- Role-based authorization using administrator privileges
- Protected routes using JWT authentication middleware
- Request validation with **Joi**
- Centralized logging with **Winston**

## Project Structure

The application follows a modular architecture that separates routing, middleware, data models, configuration, and application startup responsibilities.

```text
vidly/
├── config/
├── middleware/
├── models/
├── routes/
├── startup/
├── tests/
└── index.js
```

### Directory Overview

| Directory     | Purpose                                                                                                                                  |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `config/  `   | Environment-specific application configuration                                                                                           |
| `middleware/` | Authentication, authorization, error handling, and request validation middleware                                                         |
| `models/`     | Mongoose schemas, models, and validation logic                                                                                           |
| `routes/`     | REST API endpoints for users, authentication, movies, genres, customers, rentals, and returns                                            |
| `startup/`    | Application bootstrap modules responsible for configuration, database connections, logging, routing, validation, and production settings |
| `tests/`      | Automated unit and integration tests                                                                                                     |
| `index.js`    | Application entry point                                                                                                                  |

### Startup Architecture

The application entry point remains intentionally small by delegating startup responsibilities to dedicated modules.

```js
// index.js:
require("./startup/logging")();
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/prod")(app);
```

### Startup modules

The application bootstraps through a series of startup modules:

| Module            | Responsibility                                                  |
| :---------------- | :-------------------------------------------------------------- |
| **config.js**     | Validates required application configuration                    |
| **db.js**         | Connects to MongoDB                                             |
| **logging.js**    | Configures Winston logging and exception handling               |
| **routes.js**     | Registers API routes and middleware                             |
| **validation.js** | Extends Joi with ObjectId validation                            |
| **prod.js**       | Configures production middleware such as Helmet and Compression |

## Installation

### Clone the Repository

```bash
git clone https://github.com/Lewis-mbui/vidly-backend.git
cd vidly-backend
```

### Install Dependencies

```text
npm install
```

### Start MongoDB

Ensure that MongoDB is installed and running locally.

The application expects MongoDB to be available on:

`mongodb://localhost/vidly`

### Configure Environment Variables

Create the required environment variables before starting the application:

| Variable              | Description                             |
| :-------------------- | :-------------------------------------- |
| `vidly_jwtPrivateKey` | Secret key used to sign and verify JWTs |
| `db`                  | MongoDB connection string               |

### Start the Application

```text
npm start
```

The API will start on: `http://localhost:3000`

## Configuration

The application uses the config package to manage environment-specific settings.

### Configuration Files

```text
config/
├── default.json
├── test.json
├── production.json
└── custom-environment-variables.json
```

### Environment Variables

The following configuration values can be supplied through environment variables:

- `vidly_jwtPrivateKey:` JWT Signing secret
- `db:` MongoDB connection string

### Environment-Specific Settings

Default Environment:

```text
{
  "db": "mongodb://localhost/vidly"
}
```

Test Environment:

```text
{
  "db": "mongodb://localhost/vidly_tests"
}
```

**NB: A separate DB is used to isolate automated tests from development data**

### Startup Validation

The application verifies that a JWT signing key is configured during startup. If no key is provided, the application terminates with an error to prevent insecure operation.

## API Endpoints

### Login/Authentication

| Method   | Endpoint    | Description                          | Auth |
| :------- | :---------- | :----------------------------------- | :--- |
| **POST** | `/api/auth` | Authenticate a user and return a JWT | No   |

### Users

| Method   | Endpoint        | Description                | Auth |
| :------- | :-------------- | :------------------------- | :--- |
| **POST** | `/api/users`    | Register a new user        | No   |
| **GET**  | `/api/users/me` | Get current user's profile | Yes  |

### Genres

| Method     | Endpoint          | Description       | Auth  |
| :--------- | :---------------- | :---------------- | :---- |
| **GET**    | `/api/genres`     | Get all genres    | No    |
| **GET**    | `/api/genres/:id` | Get a genre by ID | No    |
| **POST**   | `/api/genres/`    | Create a genre    | Yes   |
| **PUT**    | `/api/genres/:id` | Update a genre    | Yes   |
| **DELETE** | `/api/genres/:id` | Delete a genre    | Admin |

### Movies

| Method     | Endpoint          | Description       | Auth  |
| :--------- | :---------------- | :---------------- | :---- |
| **GET**    | `/api/movies`     | Get all movies    | No    |
| **GET**    | `/api/movies/:id` | Get a movie by ID | No    |
| **POST**   | `/api/movies/`    | Create a movie    | Yes   |
| **PUT**    | `/api/movies/:id` | Update a movie    | Yes   |
| **DELETE** | `/api/movies/:id` | Delete a movie    | Admin |

### Customers

| Method     | Endpoint             | Description          | Auth  |
| :--------- | :------------------- | :------------------- | :---- |
| **GET**    | `/api/customers`     | Get all customers    | No    |
| **GET**    | `/api/customers/:id` | Get a customer by ID | No    |
| **POST**   | `/api/customers/`    | Create a customer    | Yes   |
| **PUT**    | `/api/customers/:id` | Update a customer    | Yes   |
| **DELETE** | `/api/customers/:id` | Delete a customer    | Admin |

### Rentals

| Method   | Endpoint           | Description        | Auth |
| :------- | :----------------- | :----------------- | :--- |
| **GET**  | `/api/rentals`     | Get all rentals    | No   |
| **GET**  | `/api/rentals/:id` | Get a rental by ID | No   |
| **POST** | `/api/rentals/`    | Create a rental    | Yes  |

### Returns

| Method | Endpoint       | Description            | Auth |
| :----- | :------------- | :--------------------- | :--- |
| POST   | `/api/returns` | Process a movie return | Yes  |

### Example Request: Create a genre

```text
POST /api/genres
x-auth-token: <jwt>

{
  "name": "Action"
}
```

### Example Request: Create a Movie

```json
POST /api/movies
x-auth-token: <jwt>

{
  "title": "The Dark Knight",
  "genreId": "64f4f7b1d23f5a0012345678",
  "numberInStock": 5,
  "dailyRental": 3
}
```

### Example Request: Create a Rental

```json
POST /api/rentals
x-auth-token: <jwt>

{
  "customerId": "64f4f7b1d23f5a0012345678",
  "movieId": "64f4f7b1d23f5a0098765432"
}
```

## Authentication & Authorization

The API uses JSON Web Tokens (JWT) for authentication and role-based authorization for protected operations.

### Authentication Flow

1. A user registers through the /api/users endpoint.
2. Passwords are hashed using bcrypt before being stored in MongoDB.
3. The user authenticates through /api/auth.
4. A JWT is generated and returned to the client.
5. The client includes the token in subsequent requests using the x-auth-token header.
6. Protected routes validate the token before processing the request.

### JWT Payload

The token contains the authenticated user's identifier and authorization information:

```json
{
  "_id": "<user-id>",
  "isAdmin": true
}
```

### Accessing Protected Routes

Protected endpoints require a valid JWT:

```text
GET /api/users/me
x-auth-token: <jwt>
```

If no token is provided, the API returns: `401 Unauthorized`

If an invalid token is provided, the API returns: `400 Bad Request`

```js
/* /middleware/auth.js */

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
```

### Authorization

Certain operations require admin privileges.

The authorizaion middleware checks the `isAdmin` claim contained within the JWT

```js
/* /middleware/admin.js */

module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied");

  next(); // next MW --> route handler
};
```

Example:

```text
DELETE /api/genres/:id
```

Only authenticated users with admin privileges can perform this operation.

Requests from non-admin users receive `403 Forbidden`

## Testing

The project includes both unit tests and integration tests to verify application behavior at different levels.

```text
tests/
│
├── integration/
|   ├── auth.test.js
|   ├── genres.test.js
|   └── returns.test.js
|
└── unit/
    ├── middleware/
    |   └── auth.test.js
    └── models
        └── user.test.js

```

### Tests preview

<p align="center">
  <img src="/screenshots/tests-screenshot.png" width="700" alt="tests preview">
</p>

### Unit Tests

Unit tests focus on individual components in isolation.

Covered areas include:

- JWT authentication middleware
- User model behavior
- Token generation logic

### Integration Tests

Integration tests verify complete request flows and interactions with the database.

Covered areas include:

- User authentication
- Genre endpoints
- Rental return processing
- Request validation
- Authorization Behavior

### Running Tests

Execute the test suite with:

```text
npm test
```

The test environment uses a dedicated MongoDB database to isolate test data from development data: `mongodb://localhost/vidly_tests`

## Lessons Learned

This project provided hands-on experience with:

- Building RESTful APIs with Express
- MongoDB data modeling with Mongoose
- JWT authentication and authorization
- Request validation with Joi
- Automated testing with Jest and Supertest
- Logging and error handling with Winston
- Environment-based configuration management

## Future Improvements

- API documentation with Swagger/OpenAPI
- Docker support
- CI/CD pipeline integration
- Rate limiting
- Refresh token authentication
- API versioning
