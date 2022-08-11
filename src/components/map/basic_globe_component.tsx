import 'mapbox_init';

// @ts-ignore
import mapboxgl from '!mapbox-gl';

import {useRef, useState, useEffect} from 'react';

interface BasicGlobeProps {
    width: string;
    height: string;
    lat: number;
    lng: number;
    zoom: number;
}

const BasicGlobe = ({width, height, lat, lng, zoom}: BasicGlobeProps) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            projection: 'globe',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
            interactive: false,
        });
    });

    useEffect(() => {
        if (map.current) {
            // @ts-ignore
            map.current.flyTo({
                center: [lng, lat],
                duration: 1000,
            });
        }
    }, [lat, lng]);

    return (
        <div
            style={{width, height}}
            ref={mapContainer}
            className="map-container"
        />
    );
};
export default BasicGlobe;
