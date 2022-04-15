import {useReducer, useRef} from 'react';
import InvestContent from '../content/invest_content';
import {Box, Typography, Paper, Stack, Button, Grid} from '@mui/material';
import SideBarView from '../views/side_bar_view';
import OfferingComponent from '../components/invest/offering';
import DefaultComponent from '../components/utils/default_component';
import SolarPicture from '../assets/solar_frame.png';
import PanelsSvg from '../components/icons/panels_svg';
import {useTheme} from '@mui/material';
import MetricList from '../components/summary/metric_list';
import PrecommitLetterComponent from '../components/invest/precommit_letter_component';
import {useParams} from 'react-router-dom';
import investmentOpportunities from '../utils/asset_data';

const InvestPage = () => {
    const theme = useTheme();
    const {assetName} = useParams();
    const assetId = assetName;
    const asset = investmentOpportunities[assetId];

    const contentRefs = useRef([]);
    const drawerTitles = ['Contact', 'Wallet', 'Accounts'];

    const initState = {
        userState: 'EDITING',
    };

    const reducer = (state, action) => {
        console.log({state, action});
        console.log(state.userState, action.type);
        switch (action.type) {
            case 'CHANGE_USERSTATE':
                return {
                    ...state,
                    userState: action.userState,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initState);

    const sidebarEditState = (
        <Stack spacing={4}>
            <Typography variant="smallHeadline">Pre-commit</Typography>
            <PanelsSvg color={theme.palette[asset.color].main}></PanelsSvg>
            <MetricList valuePairs={asset.metrics} dividers={true}></MetricList>
            <Button
                variant="primary"
                onClick={() =>
                    dispatch({
                        type: 'CHANGE_USERSTATE',
                        userState: 'REVIEWING',
                    })
                }
            >
                Sign pre-commitment
            </Button>
        </Stack>
    );

    const sidebarReviewState = (
        <Stack spacing={4}>
            <PanelsSvg color={theme.palette.skyBlue.main}></PanelsSvg>
            <MetricList valuePairs={asset.metrics}></MetricList>

            {state.userState === 'REVIEWING' && (
                <Button
                    variant="secondary"
                    onClick={() =>
                        dispatch({
                            type: 'CHANGE_USERSTATE',
                            userState: 'EDITING',
                        })
                    }
                >
                    {'Edit pre-commitment'}
                </Button>
            )}

            {state.userState === 'CONFIRMED' && (
                <Button variant="secondary" disabled={true} onClick={() => {}}>
                    {'Complete payment'}
                </Button>
            )}
        </Stack>
    );

    const precommitConfirmed = (
        <DefaultComponent>
            <Stack spacing={4}>
                <Typography variant="smallHeadline">Confirmation</Typography>
                <Typography variant="headline1">
                    Pre-commitment confirmed
                </Typography>
                <Button sx={{width: '200px'}} variant="medium" disabled={true}>
                    Review Commitment
                </Button>
            </Stack>
        </DefaultComponent>
    );

    return (
        <SideBarView
            drawerAppearsOnBotton={true}
            drawerAppearsOnTop={false}
            header={state.userState === 'CONFIRMED' && precommitConfirmed}
            drawer={
                <Paper variant="container">
                    {state.userState === 'EDITING' && sidebarEditState}
                    {state.userState === 'REVIEWING' && sidebarReviewState}
                    {state.userState === 'CONFIRMED' && sidebarReviewState}
                </Paper>
            }
            mainContent={
                <div>
                    {state.userState === 'EDITING' && (
                        <InvestContent assetId={assetId}></InvestContent>
                    )}

                    {state.userState === 'REVIEWING' && (
                        <PrecommitLetterComponent
                            onComplete={() =>
                                dispatch({
                                    type: 'CHANGE_USERSTATE',
                                    userState: 'CONFIRMED',
                                })
                            }
                        ></PrecommitLetterComponent>
                    )}

                    {state.userState === 'CONFIRMED' && (
                        <InvestContent assetId={assetId}></InvestContent>
                    )}
                </div>
            }
        ></SideBarView>
    );
};

InvestPage.propTypes = {};

export default InvestPage;
