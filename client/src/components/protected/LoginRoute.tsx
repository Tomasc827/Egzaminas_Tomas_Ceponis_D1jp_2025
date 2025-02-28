import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const LoginRoute = () => {
    const {isAuthenticated} = useAuth();

    return !isAuthenticated ? <Navigate to="/" /> : <Outlet/>



}
 
export default LoginRoute;