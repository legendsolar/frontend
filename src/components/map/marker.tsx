import {Typography} from '@mui/material';
import {Marker as ReactMarker} from 'react-map-gl';

interface MarkerProps {
    lng: number;
    lat: number;
    children: JSX.Element;
}

const Marker = ({lat, lng, children}: MarkerProps) => {
    return (
        <ReactMarker longitude={lng} latitude={lat}>
            {children}
        </ReactMarker>
    );
};

export default Marker;
