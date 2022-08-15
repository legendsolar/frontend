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
import DefaultComponent from 'components/utils/default_component';
import {useState} from 'react';
import Marker from 'components/map/marker';

interface DiscoveryContentProps {
    assets: Array<any>;
}

const DiscoveryContent = ({assets}: DiscoveryContentProps) => {
    const [selectedAsset, setSelectedAsset] = useState(assets[0]);

    return (
        <Stack direction={'row'}>
            <Stack width={'500px'} alignItems={'center'}>
                <Typography variant={'headline2' as any} sx={{mt: 5, mb: 10}}>
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
                            <Typography>{asset.title}</Typography>
                        </AccordionSummary>

                        <DefaultComponent
                            paper
                            standardWidth={false}
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
                                    {'2868 Dutton Meadow'}
                                </Typography>
                                <Typography variant={'label' as any}>
                                    {'Santa Rosa, CA 95407'}
                                </Typography>
                            </Stack>

                            <Button
                                variant={'secondary' as any}
                                color={'light' as any}
                            >
                                Learn more
                            </Button>
                        </DefaultComponent>
                    </Accordion>
                ))}
            </Stack>

            <DefaultComponent
                standardWidth={false}
                paper
                sx={{
                    width: '100%',
                    height: '80vh',
                    p: 0,
                    overflow: 'hidden',
                    borderRadius: '20px',
                }}
            >
                <BasicGlobe
                    lat={selectedAsset.lat}
                    lng={selectedAsset.lng}
                    zoom={3}
                    width="100%"
                    height="80vh"
                    markers={assets.map((asset) => (
                        <Marker lng={asset.lng} lat={asset.lat}>
                            <div
                                style={{
                                    transform: 'translate(0%, -100%)',
                                }}
                            >
                                <DefaultComponent
                                    paper
                                    standardWidth={false}
                                    sx={{p: 2}}
                                    style={{}}
                                >
                                    <Typography
                                        variant={'label' as any}
                                        color={'legendaryGreen.main' as any}
                                    >
                                        {asset === selectedAsset
                                            ? asset.title
                                            : '☀️'}
                                    </Typography>
                                </DefaultComponent>
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
            </DefaultComponent>
        </Stack>
    );
};

export default DiscoveryContent;
