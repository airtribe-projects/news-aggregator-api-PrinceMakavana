# News Aggregator API

A RESTful API service that aggregates news articles from various sources, built with Node.js and Express.js. This API allows users to register, authenticate, and access news articles with preferences and filtering capabilities.

## Overview

The News Aggregator API provides a centralized platform for accessing news articles from multiple sources. It features user authentication, personalized news preferences, and comprehensive news filtering capabilities.

## Features

- User Authentication (JWT-based)
- News Articles Aggregation
- Customizable News Preferences
- Article Filtering and Search
- Secure API Endpoints

## Prerequisites

- Node.js (>= 18.0.0)
- npm (comes with Node.js)
- MongoDB (for user data and preferences storage)

## Setup Instructions

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `sample.env` to `.env`
   - Update the variables with your configuration

3. Start the server:
   ```bash
   npm start
   ```

The server will start on the configured port (default: 3000).

## API Endpoints

### Authentication
- **POST /users/register** - Register a new user
- **POST /users/login** - Login and receive JWT token

### News
- **Get /users/preferences** - Get User preferences
- **Put /users/preferences** - Update User preferences
- **GET /news** - Get news articles based on preferences

## Testing

Run the automated tests using the `tap` testing framework:

```bash
npm test
```

## Project Structure

```
├── app.js                # Application entry point
├── controllers/          # Route controllers
├── middleware/          # Custom middleware
├── models/             # Database models
├── routes/             # API routes
└── test/              # Test files
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken)
- **Database**: MongoDB with Mongoose
- **Testing**: Tap
- **API Security**: bcrypt for password hashing
- **HTTP Client**: Axios for external API calls

## Error Handling

The API implements standard HTTP status codes:
- 200: Success
- 201: Resource Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Postman Collection

A complete Postman collection is included in the `/postmanCollection` directory for testing all API endpoints. The collection includes:

### Authentication Endpoints
- **POST /users/signup**
  ```json
  {
    "name": "Clark Kent",
    "email": "clark@superman.com",
    "password": "Krypt()n8",
    "preferences": ["movies", "comics"]
  }
  ```
- **POST /users/login**
  ```json
  {
    "email": "clark@superman.com",
    "password": "Krypt()n8"
  }
  ```

### User Preferences
- **GET /users/preferences** - Requires Bearer Token
- **PUT /users/preferences** - Requires Bearer Token
  ```json
  {
    "preferences": ["comics", "games"]
  }
  ```

### News Endpoints
- **GET /users/news** - Requires Bearer Token

### Setup Instructions
1. Import the collection from `/postmanCollection/collection.json`
2. Import the environment variables from `/postmanCollection/News Aggregator.postman_environment.json`
3. After login, the JWT token will be automatically set in the environment variables
4. All authenticated endpoints will use the token automatically

## License

ISC