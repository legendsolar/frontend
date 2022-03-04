import { Typography, Stack, Button } from "@mui/material";
import ImageUpload from "./image_upload";
import MultiSelect from "./multiselect";
import { useEffect, useState } from "react";

const IdentityVerification = ({ questions, idVerification, onSubmit }) => {
    const [selected, setSelected] = useState([]);

    const onQuestionUpdate = ({ id, value }) => {
        setSelected({ ...selected, [id]: value });
    };

    const submitDisabled = () => {
        return questions
            .map((question) => {
                if (!selected[question.id]) return true;
            })
            .some((q) => q);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">
                Identity Verification
            </Typography>
            <Typography variant="description">
                We need to ask a few questions to verify your identity
            </Typography>

            {questions.map((question) => {
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

            {idVerification && (
                <Stack>
                    <Typography variant="description">
                        Document Upload
                    </Typography>
                    <ImageUpload></ImageUpload>
                </Stack>
            )}

            <Button
                variant="primary"
                onClick={() => onSubmit(selected)}
                disabled={submitDisabled()}
            >
                Submit
            </Button>
        </Stack>
    );
};

export default IdentityVerification;
