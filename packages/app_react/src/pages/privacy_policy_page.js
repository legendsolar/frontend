import {Button, Typography} from '@mui/material';
import DualPaneView from '@project/components/views/dual_pane_view';

import WomanPanelsSVG from '@project/components/assets/images/women_panel.svg';
import {Scroller} from '@project/components/nav/scroller';
import {Component} from '@project/components/basics/component';
import {useLocation, useNavigate} from 'react-router-dom';
import {ROUTES} from '../routes/routes';
import {BackButton} from '@project/components/buttons/back_button';
import {siteCopy} from '../static/copy';
const PrivacyPolicyPage = () => {
    const navigate = useNavigate();
    return (
        <DualPaneView
            upperLeftCorner={
                <BackButton
                    variant="mono"
                    onClick={() => navigate(ROUTES.CREATE_ACCOUNT)}
                ></BackButton>
            }
            leftPane={
                <Component>
                    <Typography variant="smallHeadline">
                        Privacy Policy
                    </Typography>

                    <Scroller sx={{height: '450px'}}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: siteCopy.privacyPolicy,
                            }}
                        ></div>
                    </Scroller>
                </Component>
            }
            rightPane={<img src={WomanPanelsSVG} width="375px"></img>}
        ></DualPaneView>
    );
};

export default PrivacyPolicyPage;
