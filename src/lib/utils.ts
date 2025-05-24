import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { UserInfo } from "../types";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function getUserInfo(): UserInfo | null {
  const token = getCookie("authToken");

  if (!token) return null;

  try {
    const decoded = jwtDecode<UserInfo>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}
