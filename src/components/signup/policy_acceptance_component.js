import {Stack} from '@mui/material';
import ScrollBottomToComplete from 'components/utils/scroll_bottom_complete.js';
import PrivacyPolicy from 'assets/legal/privacy.js';
import TermsAndConditions from 'assets/legal/termsAndConditions.js';
import scrollToPosition from 'utils/scroll_to_position';
import LoadingComponent from 'components/utils/loading_component';
import {useUser} from 'hooks/use_user';

const PolicyAcceptanceComponent = ({onComplete}) => {
    const {useGetUserAcceptance, useSetUser} = useUser();
    const {loading, error, data} = useGetUserAcceptance();
    const [setUser] = useSetUser();

    if (loading) {
        return <LoadingComponent></LoadingComponent>;
    }

    const acceptanceList = data?.user?.acceptance;

    const policyAcceptance = {
        privacy: acceptanceList ? acceptanceList.includes('PRIVACY') : false,
        termsAndConditions: acceptanceList
            ? acceptanceList.includes('TERMS_CONDITIONS')
            : false,
    };

    const onCompleteItem = (event, item) => {
        const acceptanceToStore = [item];

        if (acceptanceList) {
            acceptanceToStore.push(...acceptanceList);
        }

        setUser({
            variables: {
                input: {
                    acceptance: acceptanceToStore,
                },
            },
        });

        if (policyAcceptance.privacy || policyAcceptance.termsAndConditions) {
            onComplete();
        } else {
            scrollToPosition(0);
        }
    };

    return (
        <Stack spacing={6}>
            {!policyAcceptance.privacy && (
                <ScrollBottomToComplete
                    onComplete={(event) => {
                        onCompleteItem(event, 'PRIVACY');
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
                        onCompleteItem(event, 'TERMS_CONDITIONS');
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
