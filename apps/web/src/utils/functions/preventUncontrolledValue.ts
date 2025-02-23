export function preventUncontrolledValue<T>(value: T | null, fallback: T): T {
  if (value !== null && value !== undefined) {
    return value;
  }
  return fallback;
}
