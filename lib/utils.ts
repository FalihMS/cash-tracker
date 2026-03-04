import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrencyDisplay(value: number | string) {
  if (!value) return ""
  return new Intl.NumberFormat("id-ID").format(Number(value))
}

export function formatCurrencyValue(str: string) {
  return Number(str.replace(/\D/g, ""))
}

export function getTodayISOString() {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  const local = new Date(d.getTime() - offset * 60000)
  return local.toISOString().slice(0, 10)
}

export const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
export const startOfNextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)