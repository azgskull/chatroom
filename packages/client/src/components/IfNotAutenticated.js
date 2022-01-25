import { Navigate } from "react-router-dom";
import useStateSubscription from "../common/useStateSubscribe";
import { userState } from "../state/user";

const IfNotAuthenticated = ({ children }) => {
  const isConnected = useStateSubscription(userState);

  if (!isConnected) {
    return children;
  }

  return <Navigate to="/rooms" />;
};

export default IfNotAuthenticated;
