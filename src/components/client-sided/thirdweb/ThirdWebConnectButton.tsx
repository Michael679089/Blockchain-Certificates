'use client'

import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "../../server-sided/thirdweb/client";
import { createWallet } from "thirdweb/wallets";

export default function ThirdWebConnectButton() {

    

  return (
    <ConnectButton
      client={client}
      autoConnect={true}
      wallets={[createWallet("io.metamask")]} // Only MetaMask
      connectModal={{
        showThirdwebBranding: false,
        size: "compact",
        titleIcon:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ymr3UNKopfI0NmUY95Dr-0589vG-91KuAA&s",
      }}
      theme={darkTheme({
        colors: {
          modalBg: "hsl(0, 0%, 4%)",
        },
      })}
      connectButton={{
        label: (
          <span className="inline-flex items-center gap-2">
            <img
              src="/pictures/icons/MetaMask-icon-fox.svg"
              alt="MetaMask"
              className="h-5 w-5 pointer-events-none"
            />
            <span>Connect Wallet</span>
          </span>
        ),
      }}
    />
  );
}

