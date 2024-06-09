import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const userTokens = useSelector(state => state.auth.userTokens);
    console.log("from private route: ", userTokens);

    return userTokens ? children : <Navigate to="auth/login" replace/>
}

export default PrivateRoute;