# Full-Stack Blog Application

A full-stack blog application with a Node.js backend API and a React frontend, built with Express.js, MongoDB, and modern web technologies.

## Features

- User authentication and authorization using JWT
- User management (registration, login, profile)
- Post creation, editing, retrieval, and management
- Comment system for posts
- Responsive React frontend with modern UI
- Markdown support for blog content
- Secure API endpoints with middleware

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Development:** Nodemon for auto-restart

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Markdown Rendering:** React Markdown with remark-gfm
- **Animations:** GSAP
- **Icons:** Lucide React
- **3D Graphics:** Three.js

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables for backend:
   Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   ```

4. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

3. Open your browser and navigate to `http://localhost:5173` to access the application.

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
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── post.controller.js
│   │   ├── comment.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js # Authentication middleware
│   ├── models/
│   │   ├── Users.js           # User model
│   │   ├── Post.js            # Post model
│   │   └── Comment.js         # Comment model
│   ├── routes/
│   │   ├── auth.routes.js     # Authentication routes
│   │   ├── post.routes.js     # Post routes
│   │   ├── comment.routes.js  # Comment routes
│   │   └── user.routes.js     # User routes
│   ├── utils/
│   │   └── generateToken.js   # JWT token generation
│   └── server.js              # Main server file
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # Axios configuration
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── BackButtons.jsx
│   │   │   ├── FloatingLines.jsx
│   │   │   ├── GlassSurface.jsx
│   │   │   ├── MarkdownEditor.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── StaggeredMenu.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── useAuth.jsx
│   │   ├── pages/
│   │   │   ├── BlogList.jsx
│   │   │   ├── BlogView.jsx
│   │   │   ├── CreateBlog.jsx
│   │   │   ├── EditBlog.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Register.jsx
│   │   ├── utils/
│   │   │   └── readingTime.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
