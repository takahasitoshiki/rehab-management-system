### Explanation of Directories

- **`config/`:**  
  This folder contains configuration files. For example:
  - `db.js` handles database connection settings.
  - `session.js` manages session configurations for user authentication.

- **`controllers/`:**  
  This folder includes the core logic for API endpoints. Each controller focuses on a specific feature of the application, such as user login or logout.

- **`middleware/`:**  
  Contains reusable middleware functions for pre-processing requests, such as authentication checks.

- **`models/`:**  
  Defines database schemas and models using Mongoose. For example:
  - `User.js` represents the user schema with methods for password validation.

- **`routes/`:**  
  Defines API routes and associates them with corresponding controllers. For instance:
  - `authRoutes.js` handles login and logout API endpoints.

- **`utils/`:**  
  Includes utility functions that can be reused across the application, such as error handling.

---

## Technologies Used

- **Backend Framework:** Node.js (Express)
- **Database:** MongoDB (Mongoose)
- **Session Management:** `express-session` with `connect-mongo`
- **Security:** Password hashing using bcrypt
- **Environment Management:** dotenv

---

## How to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/portfolio-system.git
    cd portfolio-system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up a `.env` file:
    ```plaintext
    MONGO_URI=mongodb://localhost:27017/your_database_name
    ```

4. Start the application:
    ```bash
    npm start
    ```

5. Access the system at `http://localhost:5000`.

---

## Features

- User authentication with login/logout functionality.
- Middleware-protected routes for secure access.
---