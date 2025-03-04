Mutual Fund App

Overview

The Mutual Fund App is a web application that allows users to sign up, log in, and fetch mutual fund data from an external API. It consists of a React frontend and an Express.js backend with MySQL as the database.

Features

User authentication (signup, login, logout)

Fetch mutual fund families

Fetch funds based on selected fund families

Secure API access using JWT authentication

Prerequisites

Before setting up the project, ensure you have the following installed:

Node.js (for running the backend and frontend)

MySQL (for database storage)

Postman (for testing APIs, optional)

Setup Instructions

1. Clone the Repository

git clone https://github.com/meghanananju/mutual-fund-app.git
cd mutual-fund-app

2. Backend Setup

cd backend
npm install

Configure the .env file

Create a .env file in the backend directory and add the following:

DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=5000
RAPID_API_KEY=your_api_key

Replace your_database_name, your_username, your_password, and your_api_key accordingly.

You can obtain an API key from RapidAPI.

Start the Backend Server

npm start

3. Frontend Setup

cd frontend
npm install

Configure the .env file (if needed)

Modify the backend server URL if necessary.

Start the Frontend Application

npm start



Notes

Ensure your MySQL database is set up before running the backend.

The backend will automatically create tables if they do not exist.

Use Postman for testing API endpoints.

License

This project is licensed under the MIT License.

