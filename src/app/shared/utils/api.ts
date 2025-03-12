import { getSessionStorage, setSessionStorage } from "@/app/shared/utils/storage";

export const fetchMarkers = async () => {
  const cachedMarkers = getSessionStorage("photoMarkers");
  if (cachedMarkers) return cachedMarkers;

  const response = await fetch("/api/markers");
  const markers = await response.json();
  setSessionStorage("photoMarkers", markers);
  return markers;
};

export const uploadPhoto = async (lat: number, lng: number, img: string, description: string) => {
  const newMarker = { lat, lng, img, description };
  const existingMarkers = getSessionStorage("photoMarkers") || [];
  existingMarkers.push(newMarker);
  setSessionStorage("photoMarkers", existingMarkers);
  return newMarker;
};