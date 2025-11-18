import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateVat(amount: number, vatRate: number): number {
  return Number(Number((amount * vatRate) / 100).toFixed(0));
}
