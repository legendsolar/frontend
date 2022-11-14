import {Facility, Location} from 'schema/schema_gen_types';
import Component from '../basics/component';
import {Typography} from '@mui/material';
import {Marker} from './marker';

interface Props {
    location: Location;
    title: string;
}

export const TooltipMarker = ({location, title}: Props) => {
    return (
        <Marker lng={location.lng || 0} lat={location.lat || 0}>
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
                        {title}
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
    );
};
