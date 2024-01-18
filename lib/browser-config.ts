export function isBrowser(): boolean {
  return typeof window !== "undefined"
}

export function isSmallScreen(): boolean {
  return isBrowser() && window.innerWidth < 768
}
