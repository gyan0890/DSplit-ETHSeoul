import { constants } from 'ethers';
import {
	Chain, auroraTestnet, filecoinHyperspace, 
} from 'wagmi/chains';

import { Token } from './transaction';

export const calibration = {
  id: 314159,
  name: 'Filecoin - Calibration testnet',
  network: 'calibration',
  nativeCurrency: {
    decimals: 18,
    name: 'tFIL',
    symbol: 'tFIL',
  },
  rpcUrls: {
    public: { http: ['https://filecoin-calibration.chainup.net/rpc/v1'] },
    default: { http: ['https://filecoin-calibration.chainup.net/rpc/v1'] },
  },
  blockExplorers: {
    etherscan: { name: 'Filscan', url: 'https://calibration.filscan.io' },
    default: { name: 'Filscan', url: 'https://snowtrace.io' },
  },
} as const satisfies Chain

export const chiado = {
  id: 10200,
  name: 'Chiado',
  network: 'chiado',
  nativeCurrency: {
    decimals: 18,
    name: 'xDAI',
    symbol: 'xDAI',
  },
  rpcUrls: {
    public: { http: ['https://rpc.chiadochain.net'] },
    default: { http: ['https://rpc.chiadochain.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'BlockScout', url: 'https://blockscout.chiadochain.net' },
    default: { name: 'BlockScout', url: 'https://blockscout.chiadochain.net' },
  },
} as const satisfies Chain

export const enabledChains: Chain[] = [
  auroraTestnet, filecoinHyperspace, chiado, calibration
];

// uses coinmarketcap id
export const chainIcons: { [key: number]: string } = {
  [auroraTestnet.id]: 'https://cryptologos.cc/logos/thumbs/aurora.png',
  [filecoinHyperspace.id]: 'https://cryptologos.cc/logos/thumbs/filecoin.png',
  [chiado.id]: 'https://cryptologos.cc/logos/thumbs/gnosis-gno.png',
  [calibration.id]: 'https://cryptologos.cc/logos/thumbs/filecoin.png',
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

export const requestEnabledChains = [auroraTestnet, filecoinHyperspace, chiado, calibration];

export const requestContracts: { [key: number]: `0x${string}` } = {
  [auroraTestnet.id]: '0x14F2e404152668C9B4e7Bcf54a634030994EB425',
  [filecoinHyperspace.id]: '0x14F2e404152668C9B4e7Bcf54a634030994EB425',
  [chiado.id]: '0x14F2e404152668C9B4e7Bcf54a634030994EB425',
  [calibration.id]: '0x14F2e404152668C9B4e7Bcf54a634030994EB425'
};
