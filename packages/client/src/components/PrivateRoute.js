import { Navigate } from "react-router-dom";
import useStateSubscription from "../common/useStateSubscribe";
import { userState } from "../state/user";

const PrivateRoute = ({ children }) => {
  const isConnected = useStateSubscription(userState);

  return isConnected ? children : <Navigate to="/" />;
};

export default PrivateRoute;
