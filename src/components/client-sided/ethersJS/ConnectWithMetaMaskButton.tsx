"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";


declare global {
  interface Window {
    ethereum?: any;
  }
}

// function OUTSIDE component, gets setters via params
async function connectWallet(
  setAccount: (a: string | null) => void,
  setError: (e: string | null) => void
) {
  try {
    setError(null);

    if (!window.ethereum || !window.ethereum.isMetaMask) {
      setError("MetaMask is not installed. Please install it first.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  } catch (e: any) {
    if (e.code === 4001) {
      setError("You rejected the connection request.");
    } else {
      setError("Failed to connect to MetaMask.");
    }
  }
}

// simple “disconnect” = clear local state
function disconnectWallet(
  setAccount: (a: string | null) => void,
  setError: (e: string | null) => void
) {
  setAccount(null);
  setError(null);
}

export default function ConnectWithMetaMaskButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-connect on load IF user already granted access before
  useEffect(() => {
    const autoConnect = async () => {
      try {
        if (!window.ethereum || !window.ethereum.isMetaMask) return;

        const accounts: string[] = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts && accounts.length > 0) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
        }
      } catch (e) {
        console.error("Auto-connect failed", e);
      }
    };

    autoConnect();
  }, []);

  return (
    <div>
      <div className="">
        {account ? (
          <div>
            <p>Connected as: {account}</p>
            <button
              onClick={() => disconnectWallet(setAccount, setError)}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => connectWallet(setAccount, setError)}
          >
            Connect MetaMask (ethers.js)
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
