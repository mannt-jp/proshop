import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteLayout = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  return userInfo ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
};
export default PrivateRouteLayout;
