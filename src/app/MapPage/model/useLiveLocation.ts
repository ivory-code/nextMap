"use client";

import { useEffect, useState } from "react";

const useLiveLocation = () => {
  const [position, setPosition] = useState<[number, number] | null>(null); // ✅ [number, number] 명시적 지정

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]); // ✅ 배열 형태로 저장
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
