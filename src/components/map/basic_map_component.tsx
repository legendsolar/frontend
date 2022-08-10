import 'mapbox_init';

// @ts-ignore
import mapboxgl from '!mapbox-gl';

import {useRef, useState, useEffect} from 'react';

const BasicMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
            interactive: false,
        });
    });

    return (
        <div
            style={{height: '100vh'}}
            ref={mapContainer}
            className="map-container"
        />
    );
};
export default BasicMap;
