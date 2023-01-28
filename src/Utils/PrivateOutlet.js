import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Error from "../Screens/Error";


const PrivateRoute = ({ role = "" }) => {
    const userDetails = useSelector(state => state.userDetails)

    const { userInfo, loading, error } = userDetails
    let userId = userInfo?.id
    let userRole = userInfo?.user_metadata?.role?.toLowerCase()

    // console.log(id, user_metadata)

    // console.log("HEEEEY", userId, userRole);

    if (error)
        return (<Navigate replace to="/login" />)
    else if (userRole === role.toLowerCase() && userId)
        return <Outlet userId={userId} userRole={userRole} />

    
    return <Error />;
}


export default PrivateRoute;
