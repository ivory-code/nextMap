"use client";

export const getSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem(key) || "null");
  }
  return null;
};

export const setSessionStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};