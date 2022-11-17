import { useAuth } from "../contexts/AuthContext";
import { Route , Navigate} from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    let {isLoggedIn} = useAuth();
    const auth = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
  }

export default PrivateRoute;