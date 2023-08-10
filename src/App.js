import Home from "./screens/Home";
import Login2 from "./screens/auth/login2";
import Signup from "./screens/auth/signup";
import Signup2 from "./screens/auth/signup2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./shared/PrivateRoute";
import Register from "./components/register";
import Dashboard from "./components/chatBody/ChatBody";
import Register2 from "./screens/Register2";
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
          <Route exact path="/Signup" element={<Signup2 />} />
          <Route exact path="/Login" element={<Login2 />} />
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
                <Register2 />
                </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
