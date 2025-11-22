'use client'

import * as React from 'react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { WagmiProvider, createConfig, http, useConfig } from 'wagmi'
// import { mainnet } from 'wagmi/chains'
import { ThirdwebProvider } from 'thirdweb/react'

// const queryClient = new QueryClient()

// export const configA = createConfig({ 
//   chains: [mainnet], 
//   transports: { 
//     [mainnet.id]: http(), 
//   }, 
// })

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
        {children}
    </ThirdwebProvider>
  )
}
