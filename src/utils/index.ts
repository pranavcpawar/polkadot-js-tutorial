export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function truncate(_walletAddress: string | undefined): string {
  if (!_walletAddress) return ''
  return _walletAddress.substring(0, 6) + '...' + _walletAddress.slice(-4)
}
