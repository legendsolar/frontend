import {Stack, Button, Grid, Box, Typography} from '@mui/material';
import MetricList from 'components/summary/metric_list';
import DocumentIcon from 'components/icons/document_icon';

const offering = {
    title: 'Barnyard Solar',
    content: [],
};

const OfferingComponent = ({}) => {
    return (
        <Stack spacing={2}>
            <Stack direction="row" justifyContent={'space-between'}>
                <Stack>
                    <Typography variant="label">Executive Summary</Typography>
                    <Typography variant="headline2">Barnyard Solar</Typography>
                </Stack>
                <Stack>
                    <Typography variant="label">
                        Estimated net return
                    </Typography>
                    <Typography variant="headline2" align="right">
                        10.5%
                    </Typography>
                </Stack>
            </Stack>

            <Box
                sx={{
                    m: 2,
                    width: '100%',
                    height: '259px',
                    backgroundColor: '#f4f5f5',
                    borderRadius: '20px',
                }}
            ></Box>

            <Typography variant="smallHeadline">
                Commodo Vestibulum Sollicitudin Pellentesque
            </Typography>

            <Typography variant="body2">
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit.
            </Typography>

            <Grid container spacing={2} sx={{width: '100%'}}>
                <Grid item sm={12} md={6}>
                    <Box
                        sx={{
                            backgroundColor: '#f4f5f5',
                            borderRadius: '10px',
                            p: 1,
                        }}
                    >
                        <Typography>Economics</Typography>
                        <MetricList
                            valuePairs={[
                                {
                                    metric: 'Negociated PPA Rate',
                                    value: '140/300',
                                },
                                {
                                    metric: 'Total Investment',
                                    value: '$25,000',
                                },
                            ]}
                        ></MetricList>
                    </Box>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Box
                        sx={{
                            backgroundColor: '#f4f5f5',
                            borderRadius: '10px',
                            p: 1,
                        }}
                    >
                        <Typography>Specifications</Typography>
                        <MetricList
                            valuePairs={[
                                {
                                    metric: 'Negociated PPA Rate',
                                    value: '140/300',
                                },
                                {
                                    metric: 'Total Investment',
                                    value: '$25,000',
                                },
                            ]}
                        ></MetricList>
                    </Box>
                </Grid>
            </Grid>

            <Typography variant="smallHeadline">
                Commodo Vestibulum Sollicitudin Pellentesque
            </Typography>

            <Typography variant="body2">
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit.
            </Typography>

            <Typography variant="smallHeadline">Documents</Typography>

            <Grid container spacing={2} sx={{width: '100%'}}>
                <Grid item xs={12} lg={4}>
                    <Box
                        sx={{
                            backgroundColor: '#f4f5f5',
                            borderRadius: '10px',
                            p: 2,
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent={'center'}
                            alignItems="center"
                            spacing={2}
                        >
                            <DocumentIcon></DocumentIcon>
                            <Typography variant="subtitle1">
                                Prospectus
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Box
                        sx={{
                            backgroundColor: '#f4f5f5',
                            borderRadius: '10px',
                            p: 2,
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent={'center'}
                            alignItems="center"
                            spacing={2}
                        >
                            <DocumentIcon></DocumentIcon>
                            <Typography variant="subtitle1">
                                {`Subscription \nAgreement`}
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Box
                        sx={{
                            backgroundColor: '#f4f5f5',
                            borderRadius: '10px',
                            p: 2,
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent={'center'}
                            alignItems="center"
                            spacing={2}
                        >
                            <DocumentIcon></DocumentIcon>
                            <Typography variant="subtitle1">
                                {`Wiring \nInstructions`}
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default OfferingComponent;
