# Nodejs Authentication API 

## Documentation

This repository contains a user authentication API built using Node.js. The API provides endpoints for user registration, login, reset password and authentication-related tasks. It's designed to be secure, efficient, and easily integrable into web applications.

[Nodejs Authentication API](https://nodejs-auth-api-zihk.onrender.com/)

## Author

- Debasish Halder

## Features

- Sign up with email
- Sign in
- Forgot password (It will send a reset password link to registered email address which expires in 5 minutes)
- Reset password after sign in (It will ask the user for current password to reset password)
- The password is stored encrypted in database
- Google login/signup (Social authentication)
  
## Usage

You can access the Nodejs Authentication API at the following base URL:

```url
  https://nodejs-auth-api-zihk.onrender.com/
```

### Sign Up

- Endpoint: `POST /api/users/signup`
- Description: Register users with unique email address.

Request Body:

```json
  {
    "name":"Elon Musk",
    "email":"elon@gmail.com",
    "password":"elon@123"
  }
```
Response:

```text
User Registered Successfully
```

### Sign In

- Endpoint: `POST /api/users/signin`
- Description: Log in users to their account

Request Body:

```json
{
    "email":"elon@gmail.com",
    "password":"elon@123"
}
```
Response: token

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWQ2ZTU0YWIxNzAyY2IzMzA3ZTI5YmIiLCJpYXQiOjE3MDg1ODI0NjYsImV4cCI6MTcwODU5Njg2Nn0.wqnrjZCFksDbnkMDipblngBhwM3rh0To-8a5bwyquvY
```

### Continue with Google

- Endpoint: `POST /api/users/continuewithgoogle`
- Description: Send a request with the Google ID token recieved from [Google Authentication API](https://developers.google.com/identity/gsi/web/guides/overview) 

Request Body:

```json
{
    "token":"your_google_id_token_here"
}
```
Response: token

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWQ2ZTU0YWIxNzAyY2IzMzA3ZTI5YmIiLCJpYXQiOjE3MDg1ODI0NjYsImV4cCI6MTcwODU5Njg2Nn0.wqnrjZCFksDbnkMDipblngBhwM3rh0To-8a5bwyquvY
```

### Forgot Password

#### Send reset password link

- Endpoint: `POST /api/users/sendverificationemail`
- Description: Sends a password reset link to your registered email addreess 

Request Body:

```json
{
    "email":"elon@gmail.com",
}
```

Response:

```text
A password reset link has been sent to your registered Email ID.
```

#### Reset password with verification link

- Endpoint: `POST /api/users/resetpassword`
- Description: Make a request with a new password and the token that was recieved from url parameter of the reset password link in your registered email address.

Request Body:

```json
{
    "password":"your_new_password",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWQ2ZGFiZDg4NTE5YzkwMmRjODkzYjgiLCJpYXQiOjE3MDg2MDE5NDksImV4cCI6MTcwODYwMjI0OX0.mW4oCcUBdhJhnXoI8ncIchO8Ft3UR3lBRZYQex9ApN4"
}
```

Response:

```text
Password updated successfully
```

### Change Password

- Endpoint: `DELETE /api/questions/:questionId/delete`
- Header: `headers: { "Content-Type": "application/json", Authorization: token }`
- Description: Reset password after Sign In with current password

Request:
```json
{
    "oldPassword":"your_old_password",
    "newPassword":"your_new_password",
    "cnfPassword":"your_new_password"
}
```

Response:

```text
Password updated successfully
```

## Installation

To install and run the API locally, follow these steps:

- Clone this repository: `git clone https://github.com/hdebasish/NodeJsAuthenticationServer`
- Navigate to the project directory: `cd NodeJsAuthenticationServer`
- Install dependencies: `npm install`
- Configure environment variables (if required).
- Start the server: `npm start`

## Feedback

If you have any feedback, please reach out to us at hdebasish@gmail.com
