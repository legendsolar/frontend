import { useAuth } from "../hooks/use_auth";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoadingView from "../views/loading_view";
import { useDispatch, useSelector } from "react-redux";
import { useCloudFunctions } from "../hooks/use_cloud_functions";
import {
    selectUserSignUpState,
    fetchUserSignUpState,
} from "../slices/user_slice";
import PropTypes from "prop-types";
import ErrorPage from "../pages/error_page";
import AppSettings from "../app_settings";

const ProtectedRoute = ({
    children,
    disallowedUserStates,
    disallowedPath,
    requiredUserStates,
    requiredPath,
}) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cloudFunctions = useCloudFunctions();

    const userSignUpStateStatus = useSelector(
        (state) => state.user.signUpState.status
    );

    const userSignUpState = useSelector(selectUserSignUpState);

    useEffect(() => {
        console.log("loading user state " + userSignUpStateStatus);
        if (userSignUpStateStatus === "idle" && auth.user) {
            console.log("dispatch protected");
            dispatch(fetchUserSignUpState(cloudFunctions));
        }
    }, [dispatch, userSignUpStateStatus, auth.user]);

    // useEffect(() => {
    //     if (auth.isAuthenticating) {
    //         setTimeout(() => {
    //             console.error("timed out");
    //             navigate("/error");
    //         }, AppSettings.timeout_ms);
    //     }
    // }, [auth.isAuthenticating]);

    if (
        disallowedUserStates &&
        disallowedUserStates.indexOf(userSignUpState) > -1
    ) {
        return (
            <Navigate
                to={disallowedPath}
                replace
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    if (
        requiredUserStates &&
        requiredUserStates.indexOf(userSignUpState) === -1
    ) {
        return (
            <Navigate
                to={requiredPath}
                replace
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    if (auth.isAuthenticating || userSignUpStateStatus === "loading") {
        return <LoadingView></LoadingView>;
    }

    if (userSignUpStateStatus === "rejected") {
        return <ErrorPage></ErrorPage>;
    }

    return auth.user ? (
        children
    ) : (
        <Navigate
            to="/signin"
            replace
            state={{
                path: location.pathname,
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    disallowedUserStates: PropTypes.array,
    disallowedPath: PropTypes.string,
    requiredUserStates: PropTypes.array,
    requiredPath: PropTypes.string,
};

ProtectedRoute.defaultProps = {
    disallowedUserStates: null,
    disallowedPath: "/",
    requiredUserStates: null,
    requiredPath: "/",
};

export default ProtectedRoute;
