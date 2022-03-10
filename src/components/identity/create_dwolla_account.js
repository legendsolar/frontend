import { Alert, Box, Stack, Paper, Grid, Chip, Divider } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { get, ref, set } from "firebase/database";
import { useAuth } from "../../hooks/use_auth";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { useDatabaseObjectData, useDatabase } from "reactfire";
import { useCloudFunctions } from "../../hooks/use_cloud_functions";
import LoadingComponent from "../loading_component";
import ModifyUserInfo from "../user/modify_user_info";
import ProtectedUserInfo from "../user/protected_user_info";

const CreateDwollaAccount = ({ onComplete }) => {
    const auth = useAuth();
    const user = auth.user;

    const attemptCreateNewDwollaVerifiedUser =
        useCloudFunctions().attemptCreateNewDwollaVerifiedUser;

    const [loading, setLoading] = useState(false);
    const [inputValid, setInputValid] = useState([false, false]);
    const [userInfo, setUserInfo] = useState(false);

    const [submitErrorMessage, setSubmitErrorMessage] = useState(undefined);

    const handleSubmit = (event) => {
        event.preventDefault();

        const dwollaObject = {
            name: {
                first: userInfo.firstName.value,
                last: userInfo.lastName.value,
            },
            address: {
                streetAddress: userInfo.streetAddress.value,
                streetAddress2: userInfo.streetAddress2.value,
                city: userInfo.city.value,
                state: userInfo.state.value,
                postalCode: userInfo.postalCode.value,
            },
            dateOfBirth: userInfo.dateOfBirth.value,
            ssn: userInfo.ssn.value,
        };

        console.log(dwollaObject);

        setLoading(true);

        attemptCreateNewDwollaVerifiedUser(dwollaObject)
            .then((resp) => {
                console.log(resp);
                onComplete();
            })
            .catch((error) => {
                console.log(error);
                const errorJson = JSON.parse(JSON.stringify(error));
                console.log(errorJson);
                setSubmitErrorMessage(errorJson.details.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onValidInfo = (newInfo, formId) => {
        const newInputValid = [...inputValid];

        if (!newInfo) {
            newInputValid[formId] = false;
        } else {
            newInputValid[formId] = true;
            setUserInfo({
                ...userInfo,
                ...newInfo,
            });
        }

        setInputValid(newInputValid);
    };

    if (loading) {
        return <LoadingComponent></LoadingComponent>;
    }

    return (
        <Stack spacing={2} sx={{ mt: 4, mb: 4, mr: 4 }}>
            <Stack spacing={2} sx={{ ml: 2 }}>
                <Typography variant="smallHeadline">
                    Personal Information
                </Typography>
                <Typography variant="description">
                    This information will be used to verify your ownership of
                    accounts provided and prevent fraud.{" "}
                </Typography>
            </Stack>

            <ModifyUserInfo
                onValid={(unprotectedUserInfo) => {
                    onValidInfo(unprotectedUserInfo, 0);
                }}
            ></ModifyUserInfo>

            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ pl: 2 }}
            >
                <Typography variant="subtitle1">Identification</Typography>
                <Chip variant="selected" label="Why do we need this?"></Chip>
            </Stack>

            <ProtectedUserInfo
                onValid={(protectedUserInfo) => {
                    onValidInfo(protectedUserInfo, 1);
                }}
            ></ProtectedUserInfo>

            {submitErrorMessage && (
                <Alert severity="error">
                    {"Sorry, retry! " + submitErrorMessage}
                </Alert>
            )}

            <Button
                variant="contained"
                disabled={!inputValid.every((valid) => valid)}
                color="legendaryGreen"
                onClick={handleSubmit}
                fullWidth
            >
                Continue
            </Button>
        </Stack>
    );
};
export default CreateDwollaAccount;
