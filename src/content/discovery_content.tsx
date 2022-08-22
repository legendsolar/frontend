import {
    Stack,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicGlobe from 'components/map/basic_globe_component';
import Component from 'components/basics/component';
import {useState} from 'react';
import Marker from 'components/map/marker';
import {ProspectiveAsset} from 'components/discovery/types';
import {currencyFormatter} from 'utils/number_formatter';

interface DiscoveryContentProps {
    assets: Array<ProspectiveAsset>;
}

const DiscoveryContent = ({assets}: DiscoveryContentProps) => {
    const [selectedAsset, setSelectedAsset] = useState(assets[0]);

    return (
        <Stack
            direction={'row'}
            sx={{
                mt: '40px',
            }}
        >
            <Stack
                width={'500px'}
                sx={{
                    ml: '55px',
                    mr: '70px',
                }}
                alignItems={'flex-start'}
            >
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
                            setSelectedAsset(asset);
                        }}
                        expanded={selectedAsset === asset}
                        key={idx}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Stack>
                                <Typography>{asset.title}</Typography>
                                <Typography variant={'label' as any}>
                                    {`${currencyFormatter(
                                        asset.minInvestment,
                                    )} | ${asset.numberOfPanels} panels`}
                                </Typography>
                            </Stack>
                        </AccordionSummary>

                        <Component
                            sx={{
                                backgroundColor: 'whiteFog.main',
                                p: 2,
                            }}
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

                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                            >
                                <Stack>
                                    <Typography variant={'label' as any}>
                                        {'Estimated ROI'}
                                    </Typography>
                                    <Typography variant={'label' as any}>
                                        {asset.estimatedROI}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Button
                                variant={'secondary' as any}
                                color={'light' as any}
                            >
                                Learn more
                            </Button>
                        </Component>
                    </Accordion>
                ))}
            </Stack>

            <Component
                standardWidth={false}
                sx={{
                    width: '100%',
                    height: '80vh',
                    p: 0,
                    overflow: 'hidden',
                    borderRadius: '20px',
                }}
            >
                <BasicGlobe
                    lat={selectedAsset.location.lat}
                    lng={selectedAsset.location.lng}
                    zoom={5}
                    width="100%"
                    height="80vh"
                    markers={assets.map((asset) => (
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
                                    sx={{p: 2}}
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
        </Stack>
    );
};

export default DiscoveryContent;
