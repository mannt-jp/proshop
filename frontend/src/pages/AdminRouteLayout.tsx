import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate, Outlet } from "react-router-dom";

const AdminRouteLayout = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  return userInfo?.isAdmin ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
};
export default AdminRouteLayout;
