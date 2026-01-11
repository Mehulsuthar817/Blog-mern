import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import BlogView from "./pages/BlogView";
import CreateBlog from "./pages/CreateBlog";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EditBlog from "./pages/EditBlog";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />

        <Route
        path="/blogs/:id/edit"
        element={
          <ProtectedRoute>
            <EditBlog/>
          </ProtectedRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}
