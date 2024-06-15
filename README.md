# Co-working Spaces Application

## Overview

The **Co-working Spaces Application** is a robust backend server application built with Node.js and TypeScript. It provides a foundation for managing co-working spaces with features tailored for user authentication, space booking, and management.

## Live URL

The application is currently deployed at [Live ](https://coworking-space-six.vercel.app/).

## Features

- **User Authentication**: Secure user registration and login using JWT authentication.
- **Space Management**: CRUD operations for managing co-working spaces.
- **Booking System**: Capability to book available spaces.
- **Error Handling**: Integrated error handling using `express-async-errors`.
- **Security**: Password encryption with bcrypt and CORS protection.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Using `validator` and `zod`
- **Build Tools**: TypeScript, ts-node-dev for development, TSC for build
- **Linting and Formatting**: ESLint, Prettier

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```bash
   yarn install

   ```

3. **Set environment variables:**

   ```js
   PORT=5000

   MONGO_URI=your_mongodb_uri

   ACCESS_TOKEN_SECRET=your_jwt_secret
   ACCESS_TOKEN_EXPIRE_IN=your access token expire
   ```

4. **Start the dev server:**

   ```bash
   yarn dev
   ```

5. **Open your browser and navigate to:**
   ```bash
   http://localhost:5000
   ```

## Additional Notes

- **Linting**: To run ESLint for code linting, use `yarn lint`.
- **Formatting**: Prettier is integrated; use `yarn format` to format code.
- **Deployment**: Ensure to configure environment variables for production deployment.
