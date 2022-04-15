import {Stack, Typography} from '@mui/material';
import ScrollBottomToComplete from '../utils/scroll_bottom_complete.js';
import PrivacyPolicy from '../../assets/legal/privacy.js';
import TermsAndConditions from '../../assets/legal/termsAndConditions.js';
import {ref} from 'firebase/database';
import {useCloudFunctions} from '../../hooks/use_cloud_functions';
import {useState, useEffect} from 'react';
import {useAuth} from '../../hooks/use_auth';
import {useDatabase} from 'reactfire';
import {useDatabaseObjectData} from 'reactfire';
import scrollToPosition from '../../utils/scroll_to_position';
import LoadingComponent from '../utils/loading_component';

const PolicyAcceptanceComponent = ({onComplete}) => {
    const cloudFunctions = useCloudFunctions();
    const auth = useAuth();
    const user = auth.user;

    const database = useDatabase();
    const {status, data: userInfo} = useDatabaseObjectData(
        ref(database, 'users/' + user.uid),
    );

    const [loading, setLoading] = useState(false);

    const initialState = {
        privacy: false,
        privacyVersion: null,
        termsAndConditions: false,
        termsAndConditionsVersion: null,
    };

    const [policyAcceptance, setPolicyAcceptance] = useState(initialState);

    useEffect(() => {
        if (status == 'success') {
            if (
                userInfo &&
                userInfo.acceptance &&
                userInfo?.acceptance?.privacy &&
                userInfo?.acceptance?.termsAndConditions
            ) {
                setPolicyAcceptance({
                    privacy: !!userInfo.acceptance.privacy.accepted,
                    privacyVersion: null,
                    termsAndConditions:
                        !!userInfo.acceptance.termsAndConditions.accepted,
                    termsAndConditionsVersion: null,
                });
            }
        }

        console.log(userInfo);
    }, [status]);

    const onCompleteItem = (event, item) => {
        const newPolicyAcceptance = {...policyAcceptance};
        newPolicyAcceptance[item] = true;

        setPolicyAcceptance(newPolicyAcceptance);

        if (
            newPolicyAcceptance.privacy ||
            newPolicyAcceptance.termsAndConditions
        ) {
            setLoading(true);

            scrollToPosition(0);

            cloudFunctions
                .updateUserAcceptanceState({
                    privacy: {
                        accepted: newPolicyAcceptance.privacy,
                        version: null,
                    },
                    termsAndConditions: {
                        accepted: newPolicyAcceptance.termsAndConditions,
                        version: null,
                    },
                })
                .then(() => {
                    onComplete();
                    setLoading(false);
                });
        }
    };

    if (loading) {
        return <LoadingComponent></LoadingComponent>;
    }

    return (
        <Stack spacing={6}>
            {!policyAcceptance.privacy && (
                <ScrollBottomToComplete
                    onComplete={(event) => {
                        onCompleteItem(event, 'privacy');
                    }}
                    completed={policyAcceptance.privacy}
                >
                    <div
                        dangerouslySetInnerHTML={{__html: PrivacyPolicy}}
                    ></div>
                </ScrollBottomToComplete>
            )}

            {policyAcceptance.privacy && (
                <ScrollBottomToComplete
                    onComplete={(event) => {
                        onCompleteItem(event, 'termsAndConditions');
                    }}
                    completed={policyAcceptance.termsAndConditions}
                >
                    <div
                        dangerouslySetInnerHTML={{__html: TermsAndConditions}}
                    ></div>
                </ScrollBottomToComplete>
            )}
        </Stack>
    );
};

export default PolicyAcceptanceComponent;
