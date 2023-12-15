import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// generate a random string of length n (default 10)
export function randomString(n = 10) {
  return Math.random().toString(36).substr(2, n)
}