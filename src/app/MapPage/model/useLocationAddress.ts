"use client";

import { useEffect, useState } from "react";

const useLocationAddress = (lat: number | null, lon: number | null) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (lat === null || lon === null) return;

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        if (data && data.display_name) {
          setAddress(data.display_name);
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
