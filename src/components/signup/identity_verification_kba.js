import {Typography, Stack, Button, CircularProgress} from '@mui/material';
import MultiSelect from 'components/inputs/multiselect';
import {useEffect, useState} from 'react';

const IdentityVerificationKBA = ({onSubmit, kbaQuestions}) => {
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const onQuestionUpdate = (event) => {
        setSelected({...selected, [event.target.name]: event.target.value});
    };

    const submitDisabled = () => {
        return kbaQuestions
            .map((question) => {
                if (!selected[question.id]) return true;
            })
            .some((q) => q);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="description">
                We need to ask a few questions to verify your identity
            </Typography>

            {kbaQuestions &&
                kbaQuestions.map((question) => {
                    return (
                        <MultiSelect
                            key={question.id}
                            name={question.id}
                            text={question.text}
                            fields={question.answers}
                            selected={{value: selected[question.id]}}
                            onChangeListener={onQuestionUpdate}
                        ></MultiSelect>
                    );
                })}

            <Button
                variant="primary"
                onClick={() => {
                    onSubmit(selected);
                }}
                disabled={submitDisabled()}
            >
                {loading ? (
                    <CircularProgress color="light"></CircularProgress>
                ) : (
                    'Submit'
                )}
            </Button>
        </Stack>
    );
};

export default IdentityVerificationKBA;
