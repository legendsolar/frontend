import {Stack, Button, CircularProgress} from '@mui/material';
import ModifyUserInfo from './modify_user_info';
import {useState} from 'react';
import {useCloudFunctions} from '../../hooks/use_cloud_functions';
import {transformUserDataToDwollaObject} from '../signup/utils';

const UpdateUserInfo = () => {
    const cloudFunctions = useCloudFunctions();
    const [userInfo, setUserInfo] = useState(false);
    const [inputValid, setInputValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const onUpdate = (newUserInfo) => {
        const error = Object.keys(newUserInfo)
            .map((key) => {
                return newUserInfo[key].error;
            })
            .some((el) => el);

        setInputValid(!error);

        if (!error) {
            setUserInfo({...newUserInfo});
        }
    };

    const onSubmit = () => {
        console.log(userInfo);

        const dwollaObject = transformUserDataToDwollaObject(userInfo);

        setLoading(true);
        cloudFunctions
            .updateDwollaUser(dwollaObject)
            .then((resp) => {
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                const errorJson = JSON.parse(JSON.stringify(error));
                console.log(errorJson);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Stack>
            <ModifyUserInfo
                onUpdate={(newUserInfo) => {
                    onUpdate(newUserInfo);
                }}
                disabled={{
                    firstName: true,
                    lastName: true,
                }}
            ></ModifyUserInfo>
            <Button
                variant="primary"
                disabled={!inputValid || loading}
                onClick={onSubmit}
            >
                {loading ? (
                    <CircularProgress color="dark" size={30} />
                ) : (
                    'Update'
                )}
            </Button>
        </Stack>
    );
};

export default UpdateUserInfo;
