import {Typography, Stack} from '@mui/material';
import ContentDivider from 'components/basics/content_divider';
import TestMetricGauge from 'components/gauges/tests/test_metric_gauge';
import BasicMap from 'components/map/basic_map_component';
import TransferDataGrid from 'components/transfers/transfer_data_grid';
import Component from 'components/basics/component';
import RooftopContent from 'content/rooftop_content';
import {testTransfers} from 'static_data/placeholder_transfers';
import SideBarView from 'views/side_bar_view';

interface PortfolioContentProps {
    title?: string;
    address?: string;
    subtitle?: string;
    allTimeReturn?: JSX.Element;
    realTimeData?: JSX.Element;
    sidebar?: JSX.Element;
    transactions?: JSX.Element;
    investmentSupport?: JSX.Element;
    about?: JSX.Element;
    details?: JSX.Element;
    documents?: JSX.Element;
}

const PortfolioContent = ({
    title = '',
    address = '',
    subtitle = '',
}: PortfolioContentProps) => {
    return (
        <div>
            <Stack sx={{mb: 3}}>
                <Typography variant={'headline2' as any}>{title}</Typography>

                <Stack direction="row" justifyContent={'space-between'}>
                    <Typography variant={'monoButton' as any}>
                        {address}
                    </Typography>
                    <Typography variant={'monoButton' as any}>
                        {subtitle}
                    </Typography>
                </Stack>
            </Stack>
            <Component sx={{height: '400px', m: 0, p: 0}}>
                <BasicMap
                    lat={40.73061}
                    lng={-73.935242}
                    width={'100%'}
                    height={'400px'}
                    zoom={10}
                ></BasicMap>
            </Component>

            <Stack>
                <SideBarView
                    drawer={<div></div>}
                    mainContent={
                        <div>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    All time return
                                </Typography>
                            </ContentDivider>

                            <Stack direction={'row'}></Stack>

                            <RooftopContent
                                widgets={
                                    <Stack direction={'row'}>
                                        <Stack>
                                            <Component>
                                                <TestMetricGauge></TestMetricGauge>
                                            </Component>
                                        </Stack>

                                        <Stack></Stack>
                                    </Stack>
                                }
                            ></RooftopContent>
                        </div>
                    }
                ></SideBarView>

                <ContentDivider>
                    <Typography variant={'monoButton' as any}>
                        Transactions
                    </Typography>
                </ContentDivider>
                <TransferDataGrid
                    transfers={testTransfers.slice(0, 5)}
                    loading={false}
                    sx={{
                        height: '500px',
                    }}
                ></TransferDataGrid>

                <SideBarView
                    drawer={
                        <ContentDivider>
                            <Typography variant={'monoButton' as any}>
                                Investment Support
                            </Typography>
                        </ContentDivider>
                    }
                    mainContent={
                        <div>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    About this investment
                                </Typography>
                            </ContentDivider>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Details
                                </Typography>
                            </ContentDivider>
                            <ContentDivider>
                                <Typography variant={'monoButton' as any}>
                                    Documents
                                </Typography>
                            </ContentDivider>
                        </div>
                    }
                ></SideBarView>
            </Stack>
        </div>
    );
};

export default PortfolioContent;
