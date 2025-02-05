"use client";

import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

const useLiveLocation = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => console.error("위치 정보를 가져오는 데 실패했습니다:", error),
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return position;
};

export default useLiveLocation;
