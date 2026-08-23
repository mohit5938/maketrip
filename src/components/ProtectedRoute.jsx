import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "../redux/reducers/auth.js";
import { useLocation } from "react-router-dom";
    
const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    console.log("ProtectedRoute user:", user);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            dispatch(openAuthModal(location.pathname));
        }
    }, [user, location ,  dispatch]);

    return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;