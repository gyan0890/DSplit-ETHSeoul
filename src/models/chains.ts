import { constants } from 'ethers';
import {
	Chain, auroraTestnet, filecoinHyperspace
} from 'wagmi/chains';

import { Token } from './transaction';

export const enabledChains: Chain[] = [
  auroraTestnet, filecoinHyperspace
];

// uses coinmarketcap id
export const chainIcons: { [key: number]: string } = {
  [auroraTestnet.id]: 'https://cryptologos.cc/logos/thumbs/aurora.png',
  [filecoinHyperspace.id]: 'https://cryptologos.cc/logos/thumbs/filecoin.png',
};

export const tokens: { [key: number]: Token[] } = {
  [auroraTestnet.id]: [
    {
      symbol: auroraTestnet.nativeCurrency.symbol,
      name: auroraTestnet.nativeCurrency.name,
      address: constants.AddressZero,
      decimals: auroraTestnet.nativeCurrency.decimals,
      chainId: auroraTestnet.id,
      coingeckoId: 'aurora-network',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/aurora.png',
      gasless: false
    }
  ],
  [filecoinHyperspace.id]: [
    {
      symbol: filecoinHyperspace.nativeCurrency.symbol,
      address: constants.AddressZero,
      name: filecoinHyperspace.nativeCurrency.name,
      decimals: filecoinHyperspace.nativeCurrency.decimals,
      chainId: filecoinHyperspace.id,
      coingeckoId: 'fvm-network',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/filecoin.png',
      gasless: false
    }
  ],
};

export const requestEnabledChains = [auroraTestnet, filecoinHyperspace];

export const requestContracts: { [key: number]: `0x${string}` } = {
  [auroraTestnet.id]: '0x14F2e404152668C9B4e7Bcf54a634030994EB425',
  [filecoinHyperspace.id]: '0x14F2e404152668C9B4e7Bcf54a634030994EB425',
};
