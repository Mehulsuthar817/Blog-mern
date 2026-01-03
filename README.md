# Backend API

A Node.js backend API for a social media or blog application, built with Express.js and MongoDB.

## Features

- User authentication and authorization using JWT
- User management (registration, login)
- Post creation, retrieval, and management
- Comment system for posts
- Secure API endpoints with middleware

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Development:** Nodemon for auto-restart

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000` (or the port specified in your `.env`).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post (requires authentication)
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)

### Comments
- `GET /api/comments/:postId` - Get comments for a post
- `POST /api/comments/:postId` - Add a comment to a post (requires authentication)
- `PUT /api/comments/:id` - Update a comment (requires authentication)
- `DELETE /api/comments/:id` - Delete a comment (requires authentication)

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── middleware/
│   └── auth.middleware.js # Authentication middleware
├── models/
│   ├── Users.js           # User model
│   ├── Post.js            # Post model
│   └── Comment.js         # Comment model
├── routes/
│   ├── auth.routes.js     # Authentication routes
│   ├── post.routes.js     # Post routes
│   └── comment.routes.js  # Comment routes
├── utils/
│   └── generateToken.js   # JWT token generation
└── server.js              # Main server file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
