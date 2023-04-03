import { Navigate } from "react-router-dom";
import { userData } from "../../store/appState";
// receives component and any other props represented by ...rest

export const ProtectedRoutes = ({ children }) => {
  if (userData?.value?.role !== "viewer") {
    return <Navigate to="/" />;
  }

  return children;
};
