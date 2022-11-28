import { useInterval } from "@project/hooks/use_interval";
import { useRef, useState, useEffect, useCallback } from "react";
import Map from "react-map-gl";
import mapboxGlSupported from "@mapbox/mapbox-gl-supported";

interface MapTerrain3DProps {
  width: string;
  height: string;
  lat: number;
  lng: number;
  zoom: number;
  markers?: Array<JSX.Element>;
  initBearing: number;
  animation?: {
    enabled: boolean;
    degreesPerSecond: number;
  };
}

export const MapTerrain3D = ({
  width,
  height,
  lat,
  lng,
  zoom,
  markers,
  initBearing,
  animation = {
    enabled: true,
    degreesPerSecond: 1,
  },
}: MapTerrain3DProps) => {
  const mapRef: any = useRef();

  const [animationEnabled, setAnimationEnabled] = useState(false);

  useEffect(() => {
    const hardwareAccelerated = mapboxGlSupported.supported({
      failIfMajorPerformanceCaveat: true,
    });

    if (hardwareAccelerated) {
      setAnimationEnabled(animation.enabled);
    } else {
      setAnimationEnabled(false);
    }
  }, [animation.enabled]);

  const time = 1000;
  const [bearing, setBearing] = useState(initBearing);

  useInterval(
    () => setBearing((bearing + animation.degreesPerSecond) % 360),
    animationEnabled ? time : undefined,
    true
  );

  useEffect(() => {
    if (mapRef.current && animationEnabled) {
      mapRef.current.easeTo({ bearing, duration: 1000, easing: (x) => x });
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
      style={{ width, height }}
      mapStyle={"mapbox://styles/lassorfeasley/cl83yjanv002z15mvq9wu36io"}
      dragPan={false}
      dragRotate={false}
      touchZoomRotate={false}
      scrollZoom={false}
      terrain={{ source: "mapbox-dem", exaggeration: 1.0 }}
    >
      {markers?.map((marker) => marker)}
    </Map>
  );
};
