// src/components/client-sided/MetaMaskConnect.tsx
"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function MetaMaskConnect() {
  const [hasMetaMask, setHasMetaMask] = useState<boolean | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Run only in browser
    if (typeof window === "undefined") return;

    const isInstalled =
      typeof window.ethereum !== "undefined" &&
      window.ethereum.isMetaMask; // MetaMask injects window.ethereum with isMetaMask flag [web:22][web:25]
    setHasMetaMask(isInstalled);
  }, []);

  const connectMetaMask = async () => {
    setError(null);
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        setHasMetaMask(false);
        return;
      }

      // Request accounts in response to user action [web:27][web:33][web:37]
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (e: any) {
      if (e.code === 4001) {
        // User rejected request [web:27][web:37]
        setError("You rejected the MetaMask connection request.");
      } else {
        setError("Failed to connect to MetaMask.");
      }
    }
  };

  if (hasMetaMask === null) {
    return <div>Checking for MetaMask...</div>;
  }

  if (!hasMetaMask) {
    return (
      <div>
        <p>MetaMask is not installed in your browser.</p>
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download MetaMask
        </a>
      </div>
    );
  }

  return (
    <div>
      {account ? (
        <div>
          <p>Connected account: {account}</p>
        </div>
      ) : (
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
