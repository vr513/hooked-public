import Home from "./screens/Home";
import Login from "./screens/auth/login";
import Signup from "./screens/auth/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./shared/PrivateRoute";
import Register from "./components/register";
import Dashboard from "./components/chatBody/ChatBody";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
