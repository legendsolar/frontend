import { useAuth } from "../hooks/use_auth";
import { useEffect, useMemo } from "react";
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
import store from "../store";

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

    const status = store.getState().user.signUpState.status;

    useEffect(() => {
        console.log(
            "protected route user sign up status: " + userSignUpStateStatus
        );

        if (userSignUpStateStatus === "idle" && auth.user) {
            console.log(
                "dispatch user sign up state: line 39, protected route"
            );

            console.log("getState status:" + status);
            console.log("useSelector status:" + userSignUpStateStatus);
            dispatch(fetchUserSignUpState(cloudFunctions));

            console.log("dispatch complete ");
            console.log(
                "post dispatch sign up status: " + userSignUpStateStatus
            );
        }
    }, [dispatch, status, auth.user]);

    // useEffect(() => {
    //     if (auth.isAuthenticating) {
    //         setTimeout(() => {
    //             console.error("timed out");
    //             navigate("/error");
    //         }, AppSettings.timeout_ms);
    //     }
    // }, [auth.isAuthenticating]);

    if (
        userSignUpState &&
        userSignUpState !== "NO_ACCOUNT" &&
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
        userSignUpState &&
        userSignUpState !== "NO_ACCOUNT" &&
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
