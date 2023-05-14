export const chunk = (arr: any[], len: number) => {
  var chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
};

export const smallWalletAddress = (address: `0x${string}`, length = 4): string =>
  `${address.substring(0, length)}..${address.substring(address.length - length)}`;
