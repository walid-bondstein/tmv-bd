import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateVat(amount: number, vatRate: number): number {
  return Math.round(Number(Number((amount * vatRate) / 100)));
}

export function toIndianNumberFormat(input: number | string): number | string {
  const num = Number(input); // safely convert
  if (isNaN(num)) return input; // if invalid input

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20
  }).format(num);
}
