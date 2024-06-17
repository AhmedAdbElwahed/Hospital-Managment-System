import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const userTokens = useSelector(state => state.auth.userTokens);

    return userTokens ? children : <Navigate to="auth/login" replace/>
}

export default PrivateRoute;