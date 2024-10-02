import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function debounce<Func extends (...args: any[]) => any>(func: Func, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<Func>) {
    if (timeout) {
      clearTimeout(timeout); // Clear previous timeout if it exists
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

