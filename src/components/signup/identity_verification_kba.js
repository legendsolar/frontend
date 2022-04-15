import {Typography, Stack, Button, CircularProgress} from '@mui/material';
import MultiSelect from 'components/utils/multiselect';
import {useEffect, useState} from 'react';
import {useCloudFunctions} from 'hooks/use_cloud_functions';

const IdentityVerificationKBA = ({onComplete}) => {
    const [selected, setSelected] = useState([]);
    const [kbaQuestions, setKBAQuestions] = useState([]);
    const cloudFunctions = useCloudFunctions();
    const getKBASession = cloudFunctions.getKBASession;
    const returnKBASessionResponse = cloudFunctions.returnKBASessionResponse;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getKBASession()
            .then(({data}) => {
                setKBAQuestions(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    console.log({kbaQuestions: kbaQuestions});
    console.log({selected: selected});

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

    const onSubmit = () => {
        console.log('submitted kba');
        console.log(selected);
        setLoading(true);
        returnKBASessionResponse(selected).then(() => {
            setLoading(false);
            onComplete();
        });
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
                            onChangeListener={onQuestionUpdate}
                        ></MultiSelect>
                    );
                })}

            <Button
                variant="primary"
                onClick={() => {
                    onSubmit();
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
