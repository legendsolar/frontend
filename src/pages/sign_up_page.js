import { useState } from "react";

import { Typography, Box, Stack, Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../hooks/use_auth";
import { useNavigate } from "react-router-dom";
import CenteredComponentView from "../views/centered_component_view";
import IconButton from "../components/buttons/google_icon_button";
import ContentDivider from "../components/basics/content_divider";
import { authErrorTranslator } from "../utils/auth_error_translator";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogo from "../components/icons/google_logo";
import SignUpOptionComponent from "../components/user/sign_up_option_component";

export default function SignUpView() {
    const authHook = useAuth();
    const navigate = useNavigate();

    const onSuccessfulSignUp = () => {
        navigate("/complete-account/create");
    };

    const handleFirebaseError = (error) => {
        const translatedError = authErrorTranslator(error);
    };

    const signUpWithGoogle = () => {
                            authHook
                                .signInWithGoogle()
                                .then(() => {
                                    onSuccessfulSignUp();
                                })
                                .catch((error) => {
                                    handleFirebaseError(error);
                                });
    }

    const signUpWithEmail = () => {

                            navigate("/complete-account/create");
    }

    const navigateToSignIn = ()=> {

                             navigate("/signin");
    }

    return (
        <CenteredComponentView>
            <SignUpOptionComponent
                onSignUpWithGoogle={signUpWithGoogle}
                onSignUpWithEmail={signUpWithEmail} 
                onNavigateToSignIn={navigateToSignIn}
            ></SignUpOptionComponent>
        </CenteredComponentView>
    );
}
