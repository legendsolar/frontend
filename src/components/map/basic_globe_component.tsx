import 'mapbox_init';

// @ts-ignore
import mapboxgl from '!mapbox-gl';

import {useRef, useState, useEffect} from 'react';

const BasicGlobe = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            projection: 'globe',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
        });
    });

    useEffect(() => {
        if (map.current) {
            // @ts-ignore
            map.current.easeTo({
                center: [lng, lat],
                duration: 1000,
                easing(t: any) {
                    return t;
                },
            });
        }
    }, [lat, lng]);

    useEffect(() => {
        setTimeout(() => {
            setLng(lng + 5);
        }, 1000);
    }, [lng]);

    return (
        <div
            style={{height: '100vh'}}
            ref={mapContainer}
            className="map-container"
        />
    );
};
export default BasicGlobe;
