import { Typography, Stack, Button } from "@mui/material";
import ImageUpload from "../image_upload";
import MultiSelect from "../multiselect";
import { useEffect, useState } from "react";
import {
    getKBASession,
    useCloudFunctions,
} from "../../hooks/use_cloud_functions";
import { returnKBASessionResponse } from "../../hooks/use_cloud_functions";

const IdentityVerificationKBA = ({ onComplete }) => {
    const [selected, setSelected] = useState([]);
    const [kbaQuestions, setKBAQuestions] = useState([]);
    const cloudFunctions = useCloudFunctions();
    const getKBASession = cloudFunctions.getKBASession;
    const returnKBASessionResponse = cloudFunctions.returnKBASessionResponse;

    useEffect(() => {
        getKBASession().then(({ data }) => {
            setKBAQuestions(data.questions);
        });
    }, []);

    const onQuestionUpdate = ({ id, value }) => {
        setSelected({ ...selected, [id]: value });
    };

    const submitDisabled = () => {
        return kbaQuestions
            .map((question) => {
                if (!selected[question.id]) return true;
            })
            .some((q) => q);
    };

    const onSubmit = () => {
        console.log("submitted kba");
        console.log(selected);
        returnKBASessionResponse(selected).then(() => {
            onComplete();
        });
    };

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">
                Identity Verification
            </Typography>
            <Typography variant="description">
                We need to ask a few questions to verify your identity
            </Typography>

            {kbaQuestions.map((question) => {
                return (
                    <MultiSelect
                        key={question.id}
                        id={question.id}
                        text={question.text}
                        fields={question.answers}
                        value={selected[question.id]}
                        onChangeListener={onQuestionUpdate}
                    ></MultiSelect>
                );
            })}

            <Button
                variant="primary"
                onClick={onSubmit}
                disabled={submitDisabled()}
            >
                Submit
            </Button>
        </Stack>
    );
};

export default IdentityVerificationKBA;
