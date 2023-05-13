'use client';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { Baskervville } from 'next/font/google';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { Logo } from '@/components';
import { enabledChains } from '@/models/chains';
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';

const baskervville = Baskervville({ subsets: ['latin'], weight: ['400'] });

const { chains, publicClient } = configureChains(enabledChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY! }),
  publicProvider()
]);
const { connectors } = getDefaultWallets({
  appName: 'frenmo',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="mt-8">
            <Logo />
            <div className="mt-2">
              <ConnectButton
                showBalance={false}
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full'
                }}
              />
            </div>
          </div>
          <div className={`${baskervville.className} mt-16`}>{children}</div>
        </div>
        <ToastContainer />
        <footer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
