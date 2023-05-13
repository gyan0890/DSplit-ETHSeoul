import { zeroAddress } from 'viem';
import { Chain, mainnet, optimism, polygon, polygonMumbai } from 'wagmi/chains';

import { Token } from './transaction';

const production = process.env.NODE_ENV === 'production';

export const enabledChains: Chain[] = production
  ? [polygon, optimism, mainnet]
  : [polygonMumbai, optimism, mainnet];

// uses coinmarketcap id
export const chainIcons: { [key: number]: string } = {
  [polygonMumbai.id]: 'https://cryptologos.cc/logos/thumbs/polygon.png',
  [polygon.id]: 'https://cryptologos.cc/logos/thumbs/polygon.png',
  [mainnet.id]: 'https://cryptologos.cc/logos/thumbs/ethereum.png',
  [optimism.id]: 'https://cryptologos.cc/logos/thumbs/optimism-ethereum.png'
};

export const tokens: { [key: number]: Token[] } = {
  [polygon.id]: [
    {
      symbol: 'USDC',
      name: 'USDC',
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
      chainId: polygon.id,
      coingeckoId: 'usd-coin',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/usd-coin.png'
    },
    {
      symbol: 'USDT',
      name: 'USDT',
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      decimals: 6,
      chainId: polygon.id,
      coingeckoId: 'tether',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/tether.png'
    }
  ],
  [mainnet.id]: [
    {
      symbol: 'USDC',
      name: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      chainId: mainnet.id,
      coingeckoId: 'usd-coin',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/usd-coin.png'
    },
    {
      symbol: 'USDT',
      name: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      chainId: mainnet.id,
      coingeckoId: 'tether',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/tether.png'
    }
  ],
  [optimism.id]: [
    {
      symbol: 'USDC',
      name: 'USDC',
      address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      decimals: 6,
      chainId: optimism.id,
      coingeckoId: 'usd-coin',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/usd-coin.png'
    },
    {
      symbol: 'USDT',
      name: 'USDT',
      address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      decimals: 6,
      chainId: optimism.id,
      coingeckoId: 'tether',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/tether.png'
    }
  ],
  [polygonMumbai.id]: [
    {
      symbol: 'GFARMDAI',
      name: 'GFARMDAI',
      address: '0x04B2A6E51272c82932ecaB31A5Ab5aC32AE168C3',
      decimals: 18,
      chainId: polygonMumbai.id,
      coingeckoId: 'dai',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/multi-collateral-dai.png'
    },
    {
      symbol: 'MATIC',
      name: 'MATIC',
      address: zeroAddress,
      decimals: 18,
      chainId: polygonMumbai.id,
      coingeckoId: 'matic-network',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/polygon.png'
    }
  ]
};
