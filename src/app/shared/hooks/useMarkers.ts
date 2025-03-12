"use client";

import { useEffect, useState } from "react";

const useMarkers = () => {
  const [markers, setMarkers] = useState<{ lat: number; lng: number; img: string }[]>([]);

  useEffect(() => {
    const savedMarkers = JSON.parse(sessionStorage.getItem("photoMarkers") || "[]");
    setMarkers(savedMarkers);
  }, []);

  const addMarker = (lat: number, lng: number, img: string) => {
    const newMarker = { lat, lng, img };
    const updatedMarkers = [...markers, newMarker];
    setMarkers(updatedMarkers);
    sessionStorage.setItem("photoMarkers", JSON.stringify(updatedMarkers));
  };

  return { markers, addMarker };
};

export default useMarkers;
