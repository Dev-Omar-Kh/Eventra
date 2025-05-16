import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';

export default function AdminRoute({ children }) {

    const token = useSelector(state => state.auth.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {

        const decoded = jwtDecode(token);

        if (decoded.role !== 'admin') {
            return <Navigate to={'/error-page'} replace />;
        }

        return children;

    } catch (err) {
        console.error("Invalid token:", err);
        return <Navigate to="/login" replace />;
    }
}
