import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({
    children,
}) => {

    const { user } =  useSelector( (state) => state.auth  );

    if (!user) {

        return (
            <Navigate  to="" replace />  );
    }

    if (user.role !== "admin") {
        return (
            <Navigate  to="/" replace />
        );
    }
    return children;
};

export default AdminProtectedRoute;