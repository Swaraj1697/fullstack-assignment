import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import MyRatings from "./pages/MyRatings";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./components/AuthLayout";
import Search from "./pages/Search";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      {isAuthenticated && <Navbar />} 

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Home user={user} /> : <Navigate to="/login" />
          }
        />

<Route
    path="/login"
    element={
      <AuthLayout>
        <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      </AuthLayout>
    }
  />
  <Route
    path="/register"
    element={
      <AuthLayout>
        <Register />
      </AuthLayout>
    }
  />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/recommendations"
          element={isAuthenticated ? <Recommendations user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-ratings"
          element={isAuthenticated ? <MyRatings user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/movie/:movieId"
          element={isAuthenticated ? <MovieDetails user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
