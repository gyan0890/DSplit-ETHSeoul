import { constants } from 'ethers';
import { Chain, optimism, polygon, polygonMumbai } from 'wagmi/chains';

import { Token } from './transaction';

const production = process.env.NODE_ENV === 'production';

export const enabledChains: Chain[] = production
  ? [polygon, optimism]
  : [polygonMumbai, optimism];

// uses coinmarketcap id
export const chainIcons: { [key: number]: string } = {
  [polygonMumbai.id]: 'https://cryptologos.cc/logos/thumbs/polygon.png',
  [polygon.id]: 'https://cryptologos.cc/logos/thumbs/polygon.png',
  // [scrollTestnet.id]:
  //   'https://scroll.io/static/media/logo_with_text.7c6cafcac81093d6f83b.png',
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
      imageUrl: 'https://cryptologos.cc/logos/thumbs/usd-coin.png',
      gasless: true
    },
    {
      symbol: 'USDT',
      name: 'USDT',
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      decimals: 6,
      chainId: polygon.id,
      coingeckoId: 'tether',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/tether.png',
      gasless: true
    }
  ],
  // [scrollTestnet.id]: [
  //   {
  //     symbol: 'USDC',
  //     name: 'USDC',
  //     address: '0xa0d71b9877f44c744546d649147e3f1e70a93760',
  //     decimals: 18,
  //     chainId: scrollTestnet.id,
  //     coingeckoId: 'usd-coin',
  //     imageUrl: 'https://cryptologos.cc/logos/thumbs/usd-coin.png'
  //   },
  //   {
  //     symbol: scrollTestnet.nativeCurrency.symbol,
  //     name: scrollTestnet.nativeCurrency.name,
  //     address: constants.AddressZero,
  //     decimals: scrollTestnet.nativeCurrency.decimals,
  //     chainId: mainnet.id,
  //     coingeckoId: 'ethereum',
  //     imageUrl: 'https://cryptologos.cc/logos/thumbs/ethereum.png'
  //   }
  // ],
  [optimism.id]: [
    {
      symbol: 'USDC',
      name: 'USDC',
      address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      decimals: 6,
      chainId: optimism.id,
      coingeckoId: 'usd-coin',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/usd-coin.png',
      gasless: false
    },
    {
      symbol: 'USDT',
      name: 'USDT',
      address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      decimals: 6,
      chainId: optimism.id,
      coingeckoId: 'tether',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/tether.png',
      gasless: false
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
      imageUrl: 'https://cryptologos.cc/logos/thumbs/multi-collateral-dai.png',
      gasless: false
    },
    {
      symbol: 'MATIC',
      name: 'MATIC',
      address: constants.AddressZero,
      decimals: 18,
      chainId: polygonMumbai.id,
      coingeckoId: 'matic-network',
      imageUrl: 'https://cryptologos.cc/logos/thumbs/polygon.png',
      gasless: false
    }
  ]
};

export const requestEnabledChains = production ? [polygon] : [polygonMumbai, polygon];

export const requestContracts: { [key: number]: `0x${string}` } = {
  [polygonMumbai.id]: '0x14F2e404152668C9B4e7Bcf54a634030994EB425',
  [polygon.id]: '0x943920E1891Fcc6985EdF03bBdAb21b943768b82'
};

export const networkApiKeys: { [key: number]: string } = {
  [polygon.id]: process.env.NEXT_PUBLIC_BICONOMY_MATIC_API_KEY!
};
