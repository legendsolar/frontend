import {useRef, useState, useEffect, useCallback} from 'react';
import Map from 'react-map-gl';
import Marker from 'components/map/marker';

interface BasicGlobeProps {
    width: string;
    height: string;
    lat: number;
    lng: number;
    zoom: number;
    markers?: Array<JSX.Element>;
}

const BasicGlobe = ({
    width,
    height,
    lat,
    lng,
    zoom,
    markers,
}: BasicGlobeProps) => {
    const mapRef: any = useRef();

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [lng, lat],
                duration: 1000,
            });
        }
    }, [lat, lng]);

    return (
        <Map
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: zoom,
            }}
            ref={mapRef}
            style={{width, height}}
            mapStyle={'mapbox://styles/mapbox/light-v10'}
            projection={'globe'}
        >
            {markers?.map((marker) => marker)}
        </Map>
    );
};
export default BasicGlobe;
