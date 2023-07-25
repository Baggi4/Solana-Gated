import React from 'react';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react/solana';
import { Network } from '@thirdweb-dev/sdk/solana';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

export const network: Network = 'devnet';
export const domain = 'example.org';
export const wallet = new PhantomWalletAdapter();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ThirdwebProvider
        authConfig={{
          authUrl: '/api/auth',
          domain: process.env.VERCEL_URL || domain,
          loginRedirect: '/',
        }}
        network={network}
      >
        <WalletModalProvider wallets={[wallet]}>
          <Component {...pageProps} />
        </WalletModalProvider>
      </ThirdwebProvider>
    </React.StrictMode>
  );
}

export default MyApp;
