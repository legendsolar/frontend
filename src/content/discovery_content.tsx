import {
    Stack,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    Button,
    Grid,
} from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import BasicGlobe from 'components/map/basic_globe_component';
import Component from 'components/basics/component';
import {useState} from 'react';
import Marker from 'components/map/marker';
import {ProspectiveAsset} from 'components/discovery/types';
import {currencyFormatter, numberFormatter} from 'utils/number_formatter';
import SideBarView from 'views/side_bar_view';
import {CalendarIcon, CashIcon, PowerIcon} from 'components/icons/emoji_icons';
import {Location} from 'schema/schema_gen_types';
import settings from 'app_settings';

interface DiscoveryContentProps {
    assets: Array<ProspectiveAsset>;
    onAssetClick(asset: ProspectiveAsset): void;
}

const DiscoveryContent = ({assets, onAssetClick}: DiscoveryContentProps) => {
    const [selectedAsset, setSelectedAsset] = useState<ProspectiveAsset>();

    const globeLocation: Location = selectedAsset
        ? selectedAsset.location
        : settings.defaultDiscoveryPageMapLocation;

    const assetMarkerArray = [
        ...assets.filter((asset) => asset !== selectedAsset),
    ];

    if (selectedAsset) {
        assetMarkerArray.push(selectedAsset);
    }

    return (
        <SideBarView
            drawerPosition={'right'}
            constrainedDrawerPostion={'bottom'}
            constrainedBreakpoint={'lg'}
            drawerGridSize={7}
            drawer={
                <Component
                    standardWidth={false}
                    sx={{
                        width: '100%',
                        height: '70vh',
                        p: 0,
                        overflow: 'hidden',
                        borderRadius: '20px',
                        mt: 4,
                    }}
                >
                    <BasicGlobe
                        lat={globeLocation.lat}
                        lng={globeLocation.lng}
                        zoom={selectedAsset ? 5 : 3}
                        width="100%"
                        height="70vh"
                        markers={assetMarkerArray.map((asset) => (
                            <Marker
                                lng={asset.location.lng}
                                lat={asset.location.lat}
                            >
                                <div
                                    style={{
                                        transform: 'translate(0%, -100%)',
                                    }}
                                >
                                    <Component
                                        standardWidth={false}
                                        sx={{
                                            p: 2,
                                        }}
                                        onClick={() => {}}
                                    >
                                        <Typography
                                            variant={'label' as any}
                                            color={'legendaryGreen.main' as any}
                                        >
                                            {asset === selectedAsset
                                                ? asset.title
                                                : '☀️'}
                                        </Typography>
                                    </Component>
                                    <div
                                        style={{
                                            content: '',
                                            position: 'absolute',
                                            bottom: '100%',

                                            top: '95%',
                                            left: '50%',
                                            transform: 'translateX(-50%)',

                                            /* the arrow */
                                            border: '8px solid #000',
                                            borderColor:
                                                'white transparent transparent transparent',
                                        }}
                                    ></div>
                                </div>
                            </Marker>
                        ))}
                    ></BasicGlobe>
                </Component>
            }
            mainContent={
                <Stack alignItems={'flex-start'}>
                    <Typography
                        variant={'smallHeadline' as any}
                        sx={{mb: '60px', mt: '20px'}}
                    >
                        Available Panels
                    </Typography>

                    {assets.map((asset, idx) => (
                        <Accordion
                            variant={'none' as any}
                            sx={{width: '100%'}}
                            onChange={() => {
                                if (selectedAsset !== asset) {
                                    setSelectedAsset(asset);
                                } else {
                                    setSelectedAsset(undefined);
                                }
                            }}
                            expanded={selectedAsset === asset}
                            key={idx}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandCircleDownIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Stack>
                                    <Typography variant="subtitle1">
                                        {asset.title}
                                    </Typography>
                                    <Typography variant={'monoButton' as any}>
                                        {`${currencyFormatter(
                                            asset.minInvestment,
                                        )} | ${asset.numberOfPanels} panels`}
                                    </Typography>
                                </Stack>
                            </AccordionSummary>

                            <Component
                                sx={{
                                    width: '100%',
                                    backgroundColor: 'whiteFog.main',
                                    p: 4,
                                }}
                                standardWidth={false}
                            >
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography variant={'label' as any}>
                                        {asset.address.streetAddress}
                                    </Typography>
                                    <Typography variant={'label' as any}>
                                        {`${asset.address.city}, ${asset.address.state} ${asset.address.postalCode}`}
                                    </Typography>
                                </Stack>

                                <Grid container rowSpacing={4}>
                                    <Grid item xs={12} lg={4}>
                                        <Stack alignItems={'center'}>
                                            <CashIcon></CashIcon>
                                            <Typography
                                                variant={'subtitle1' as any}
                                                sx={{textAlign: 'center'}}
                                            >
                                                {asset.estimatedROI + '%'}
                                            </Typography>
                                            <Typography
                                                variant={'monoButton' as any}
                                                sx={{textAlign: 'center'}}
                                            >
                                                {'Estimated ROI'}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <Stack alignItems={'center'}>
                                            <PowerIcon></PowerIcon>
                                            <Typography
                                                variant={'subtitle1' as any}
                                                sx={{textAlign: 'center'}}
                                            >
                                                {numberFormatter(
                                                    asset.capacity_kW,
                                                ) + 'kW'}
                                            </Typography>
                                            <Typography
                                                variant={'monoButton' as any}
                                                sx={{textAlign: 'center'}}
                                            >
                                                {'Installed Capacity'}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <Stack alignItems={'center'}>
                                            <CalendarIcon />
                                            <Typography
                                                variant={'subtitle1' as any}
                                                sx={{textAlign: 'center'}}
                                            >
                                                {asset.holdTerm_years +
                                                    ' years'}
                                            </Typography>
                                            <Typography
                                                variant={'monoButton' as any}
                                                sx={{textAlign: 'center'}}
                                            >
                                                {'Hold Term'}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>

                                <Button
                                    sx={{width: '100%', m: -4}}
                                    variant={'secondary' as any}
                                    color={'light' as any}
                                    onClick={() => onAssetClick(asset)}
                                >
                                    Learn more
                                </Button>
                            </Component>
                        </Accordion>
                    ))}
                </Stack>
            }
        ></SideBarView>
    );
};

export default DiscoveryContent;
