import {useRef, useState, useEffect, useCallback} from 'react';
import Map from 'react-map-gl';

interface BasicMapProps {
    width: string;
    height: string;
    lat: number;
    lng: number;
    zoom: number;
    markers?: Array<JSX.Element>;
}

const BasicMap = ({width, height, lat, lng, zoom, markers}: BasicMapProps) => {
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
            mapStyle={'mapbox://styles/john-legends/cl6p8ktei000f15sjhbydsx24'}
            dragPan={false}
            dragRotate={false}
            touchZoomRotate={false}
        >
            {markers?.map((marker) => marker)}
        </Map>
    );
};
export default BasicMap;
