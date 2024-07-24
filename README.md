# Password Reset Backend

This is the backend part of the password reset application built with Node.js and Express.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/MR-JK004/password-reset-reset.git
    ```

2. Navigate to the project directory:

    ```
    cd password-reset-reset
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Create a `.env` file in the root directory with the following content:

    ```env
    PORT=8000
    MONGODB_URL=<your-mongodb-url>
    MONGODB_NAME=<your-mongodb-database-name>
    EMAIL=<your-email>
    PASS=<your-email-password>
    ```

## Usage

1. Start the server:

    ```sh
    npm start
    ```

2. The server will be running on `http://localhost:8000`.

## Project Structure

- `src`: Contains the source code for the application.
  - `routes`: Contains the route definitions.
  - `service`: Contains the service logic for user operations.
  - `common`: Contains common utility functions.
  - `models`: Contains the Mongoose models.

## API Endpoints

- `POST /user/register`: Register a new user.
- `POST /user/login`: Login a user.
- `POST /user/forget-password`: Send a password reset link.
- `POST /user/reset-password`: Reset the user's password.

## Dependencies

- express
- mongoose
- bcryptjs
- dotenv
- nodemailer
- cors

## License

This project is licensed under the MIT License.
