import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwindcss utility to merge multiple classes to make code look a bit organized
// and easier conditional addition of classes 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
