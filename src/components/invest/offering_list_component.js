import {Stack, Typography, Box, Grid, Button} from '@mui/material';
import PanelsSvg from 'components/icons/panels_svg';
import DefaultComponent from 'components/utils/default_component';

import PanelBlue from 'assets/solar/panel_blue.png';
import PanelRed from 'assets/solar/panel_red.png';
import PanelYellow from 'assets/solar/panel_yellow.png';
import PanelGreen from 'assets/solar/panel_green.png';

const OfferingListComponent = ({offerings, refs, onOfferingClick}) => {
    const mapColorToSrc = (color) => {
        switch (color) {
            case 'blue':
                return PanelBlue;

            case 'red':
                return PanelRed;

            case 'yellow':
                return PanelYellow;

            case 'green':
                return PanelGreen;
        }
    };

    return (
        <Stack spacing={4}>
            {Object.entries(offerings).map(([key, investment], i) => (
                <DefaultComponent key={i} ref={(el) => (refs.current[i] = el)}>
                    <Stack spacing={4}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent={'space-between'}
                        >
                            <Typography variant="headline2">
                                {investment.title}
                            </Typography>
                            <Typography variant="smallHeadline">
                                {investment.minInvestment}
                            </Typography>
                        </Stack>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <Box
                                    sx={{
                                        height: '100%',
                                    }}
                                    display="flex"
                                    justifyContent={'center'}
                                    alignItems="center"
                                >
                                    <img
                                        src={mapColorToSrc(investment.color)}
                                        style={{height: '169px'}}
                                    ></img>
                                </Box>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{height: '100%'}}>
                                <Box
                                    sx={{
                                        height: '240px',
                                        borderRadius: '15px',
                                        backgroundColor: 'whiteHaze.main',
                                        mr: {
                                            xs: 0,
                                            lg: 4,
                                        },
                                        mb: {
                                            xs: 4,
                                            lg: 0,
                                        },
                                        p: 4,
                                    }}
                                    display="flex"
                                    justifyContent={'center'}
                                    alignItems="center"
                                >
                                    <Stack
                                        justifyContent={'space-between'}
                                        sx={{height: '100%'}}
                                        spacing={4}
                                    >
                                        <Typography variant="smallHeadline">
                                            Specifications
                                        </Typography>
                                        {investment.specifications.map(
                                            ({metric, value}) => (
                                                <Stack
                                                    direction="row"
                                                    justifyContent={
                                                        'space-between'
                                                    }
                                                    alignItems="center"
                                                    key={metric + value}
                                                >
                                                    <Typography variant="subtitle3">
                                                        {metric}
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        {value}
                                                    </Typography>
                                                </Stack>
                                            ),
                                        )}
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>

                        <Button
                            variant="primary"
                            onClick={() => {
                                onOfferingClick(key);
                            }}
                        >
                            Executive summary
                        </Button>
                    </Stack>
                </DefaultComponent>
            ))}
        </Stack>
    );
};

export default OfferingListComponent;
