"use client";

import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          sessionStorage.setItem("lastMapCenter", JSON.stringify(userLocation));
        },
        () => {
          console.error("위치 정보를 가져올 수 없습니다.");
        }
      );
    }
  }, []);

  return location;
};

export default useLocation;