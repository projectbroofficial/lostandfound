// Utility validation functions for forms

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[0-9\-\s]{7,15}$/.test(phone);
}

export function isNonEmpty(str: string): boolean {
  return str.trim().length > 0;
}
