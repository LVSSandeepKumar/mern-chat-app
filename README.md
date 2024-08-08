# MERN Chat App

## Overview
MERN Chat App is a basic chat application built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. It provides real-time messaging capabilities, allowing users to communicate seamlessly.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [File Structure](#file-structure)
5. [Deployment](#deployment)
6. [Key Coding Takeaways](#key-coding-takeaways)
7. [Contributing](#contributing)
8. [Acknowledgements](#acknowledgements)

## Features
- **Real-Time Chat**: Instant messaging between users with live updates.
- **User Authentication**: Secure login and registration.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation
### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/LVSSandeepKumar/mern-chat-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd mern-chat-app
    ```
3. Install the dependencies for both backend and frontend:
    ```sh
    cd backend
    npm install
    cd ../frontend
    npm install
    ```
4. Set up the environment variables (create a `.env` file in the backend directory with the necessary variables):
    ```env
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```
5. Start the backend server:
    ```sh
    cd backend
    npm run dev
    ```
6. Start the frontend application:
    ```sh
    cd frontend
    npm start
    ```
7. Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

## Usage
After starting the application, users can sign up, log in, and begin chatting in real-time with other users.

## File Structure
The file structure includes:
- **backend/**: Backend server and API routes.
  - **controllers/**: Handles request logic.
  - **models/**: MongoDB models.
  - **routes/**: API routes definitions.
  - **middlewares/**: Middleware functions.
  - **server.js**: Entry point for the backend server.
- **frontend/**: React frontend application.
  - **public/**: Public assets.
  - **src/**: Source code for the frontend application.
    - **components/**: Reusable React components.
    - **pages/**: Main pages of the application.
    - **services/**: API service functions.
    - **styles/**: CSS files.
- **package.json**: Project metadata and dependencies.
- **README.md**: Project documentation.

## Deployment
This project is deployed at [MERN Chat App on Render](https://mern-chat-app-p9bv.onrender.com).

## Key Coding Takeaways
- **Socket.io Integration**: Real-time communication using WebSockets with Socket.io.
- **MERN Stack**: Full-stack development using MongoDB, Express, React, and Node.js.
- **JWT Authentication**: Secure user authentication with JSON Web Tokens.
- **Component-Based Architecture**: Modular design with reusable React components.
- **Responsive UI**: Building responsive user interfaces for different devices.

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request.

## Acknowledgements
- Built using the MERN stack and Socket.io for real-time chat functionality.
