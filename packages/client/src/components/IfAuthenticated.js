import useStateSubscription from "../common/useStateSubscribe";
import { userState } from "../state/user";

const IfAuthenticated = ({ children }) => {
  const isConnected = useStateSubscription(userState);

  if (!isConnected) {
    return null;
  }

  return children;
};

export default IfAuthenticated;
