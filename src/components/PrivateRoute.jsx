import { Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

const Private = ({ component: Component, ...props }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    console.log(user);

    return user ? <Component {...props} /> : <Navigate to="/signup" />;
}

export default Private;