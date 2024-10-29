export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars)}...${address.substring(56 - chars)}`;
}
