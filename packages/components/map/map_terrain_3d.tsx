import settings from 'app_settings';
import useInterval from 'hooks/use_interval';
import {useRef, useState, useEffect, useCallback} from 'react';
import Map from 'react-map-gl';

interface MapTerrain3DProps {
    width: string;
    height: string;
    lat: number;
    lng: number;
    zoom: number;
    markers?: Array<JSX.Element>;
    initBearing: number;
}

export const MapTerrain3D = ({
    width,
    height,
    lat,
    lng,
    zoom,
    markers,
    initBearing,
}: MapTerrain3DProps) => {
    const mapRef: any = useRef();

    const time = 1000;

    const [bearing, setBearing] = useState(initBearing);

    useInterval(() => setBearing((bearing + 1) % 360), time);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.easeTo({bearing, duration: time, easing: (x) => x});
        }
    }, [bearing]);

    return (
        <Map
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: zoom,
                bearing: 0,
                pitch: 80,
            }}
            maxPitch={85}
            ref={mapRef}
            style={{width, height}}
            mapStyle={settings.mapBoxStyleUrl}
            dragPan={false}
            dragRotate={false}
            touchZoomRotate={false}
            scrollZoom={false}
            terrain={{source: 'mapbox-dem', exaggeration: 1.0}}
        >
            {markers?.map((marker) => marker)}
        </Map>
    );
};
