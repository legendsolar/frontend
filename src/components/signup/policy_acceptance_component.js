import {Stack, Typography, Checkbox, Button, Link} from '@mui/material';
import ScrollBottomToComplete from 'components/utils/scroller.js';
import PrivacyPolicy from 'assets/legal/privacy.js';
import TermsAndConditions from 'assets/legal/termsAndConditions.js';
import scrollToPosition from 'utils/scroll_to_position';
import LoadingComponent from 'components/utils/loading_component';
import {useUser} from 'hooks/use_user';
import {useState} from 'react';

const PolicyAcceptanceComponent = ({onComplete}) => {
    const {useGetUserAcceptance, useSetUser} = useUser();
    const {loading, error, data} = useGetUserAcceptance();
    const [setUser] = useSetUser();

    const [dwollaCheckbox, setDwollaCheckbox] = useState(false);

    if (loading) {
        return <LoadingComponent></LoadingComponent>;
    }

    const acceptanceList = data?.user?.acceptance;

    const policyAcceptance = {
        privacy: acceptanceList ? acceptanceList.includes('PRIVACY') : false,
        termsAndConditions: acceptanceList
            ? acceptanceList.includes('TERMS_CONDITIONS')
            : false,
        dwolla: acceptanceList ? acceptanceList.includes('DWOLLA') : false,
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

        if (policyAcceptance.dwolla) {
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

            {policyAcceptance.privacy && !policyAcceptance.termsAndConditions && (
                <ScrollBottomToComplete
                    onComplete={(event) => {
                        onCompleteItem(event, 'TERMS_CONDITIONS');
                    }}
                    completed={policyAcceptance.termsAndConditions}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: TermsAndConditions,
                        }}
                    ></div>
                </ScrollBottomToComplete>
            )}

            {policyAcceptance.termsAndConditions && policyAcceptance.privacy && (
                <Stack>
                    <Stack direction={'row'}>
                        <Checkbox
                            onChange={(event) => {
                                setDwollaCheckbox(event.target.checked);
                            }}
                            sx={{
                                fontSize: '22px',
                                mt: 'auto',
                                mb: 'auto',
                            }}
                        ></Checkbox>
                        <Typography>
                            {`By checking this box you agree to our partner`}

                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                    'https://www.dwolla.com/legal/tos/#legal-content'
                                }
                            >
                                {` Dwolla's Terms of Service`}
                            </Link>

                            {` and `}

                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                    'https://www.dwolla.com/legal/platform-agreement/#legal-content'
                                }
                            >{`Privacy Policy`}</Link>
                        </Typography>
                    </Stack>

                    <Button
                        variant="primary"
                        disabled={!dwollaCheckbox}
                        onClick={() => onCompleteItem(event, 'DWOLLA')}
                    >
                        Accept
                    </Button>
                </Stack>
            )}
        </Stack>
    );
};

export default PolicyAcceptanceComponent;
