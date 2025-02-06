"use client";

import { useEffect, useState } from "react";

const useLocationAddress = (lat: number | null, lon: number | null) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (lat === null || lon === null) return;

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        console.error("주소 변환 실패:", error);
        setAddress("주소를 찾을 수 없습니다.");
      }
    };

    fetchAddress();
  }, [lat, lon]);

  return address;
};

export default useLocationAddress;
