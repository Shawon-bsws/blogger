# Blogger App

This project is a full-stack blogging platform built using **React.js** for the frontend and **Node.js** with **MySQL** for the backend.

## Project Structure

- **Backend:** Node.js server with MySQL database integration.
- **Frontend:** React.js application for the user interface.

## Getting Started

### Prerequisites

Ensure you have **Node.js**, **npm**, and **MySQL** installed on your system.

### Installation

1. **Backend Setup**

   - Navigate to the `backend/` folder:
     ```bash
     cd backend
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Import the database dump located in the project folder into your MySQL server.
   - Update the database credentials in the environment configuration file:
     - Open the `.env` file located at `backend/config/.env` and set your database credentials.

2. **Frontend Setup**
   - Navigate to the `frontend/blogger-app/` folder:
     ```bash
     cd frontend/blogger-app
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```

### Running the Application

1. **Start the Backend**

   - From the `backend/` folder:
     ```bash
     npm start
     ```

2. **Start the Frontend**
   - From the `frontend/blogger-app/` folder:
     ```bash
     npm run dev
     ```

## License

This project is licensed under the MIT License.
