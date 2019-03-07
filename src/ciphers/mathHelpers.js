export function mod(n, m) {
  return ((n % m) + m) % m;
}


export function placeWithinRange(num, min, max) {
  return Math.max(min, Math.min(max, num))
}