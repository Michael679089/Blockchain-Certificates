// components/client-sided/GetBalance.tsx
'use client'

import { useState, useEffect } from 'react'
import { createThirdwebClient, getContract, readContract } from "thirdweb"
import { polygon } from "thirdweb/chains"
import { useActiveAccount } from "thirdweb/react"

export default function GetBalance() {
  const [balance, setBalance] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const account = useActiveAccount()

  // Create client
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!
  })

  // Connect to contract
  const contract = getContract({
    client,
    chain: polygon,
    address: "0x28dAD87Fca53E51d08368AF9F6D7a832530D3bA1",
  })

  const fetchBalance = async (walletAddress: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Read the balanceOf function from the contract
      const result = await readContract({
        contract,
        method: "function balanceOf(address owner) view returns (uint256)",
        params: [walletAddress],
      })
      
      setBalance(result.toString())
    } catch (err: any) {
      console.error('Error fetching balance:', err)
      setError(err.message || 'Failed to fetch balance')
    } finally {
      setLoading(false)
    }
  }

  // Auto-fetch when account is connected
  useEffect(() => {
    if (account?.address) {
      fetchBalance(account.address)
    }
  }, [account?.address])

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-xl font-bold mb-4">NFT Balance</h2>
      
      {loading && (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <p>Loading balance...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {balance !== null && !loading && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">Balance:</p>
          <p className="text-2xl">{balance} NFTs</p>
          {account?.address && (
            <p className="text-sm mt-2 break-all">Wallet: {account.address}</p>
          )}
        </div>
      )}

      {!account && (
        <p className="text-gray-500">Please connect your wallet first</p>
      )}

      {account?.address && (
        <button
          onClick={() => fetchBalance(account.address!)}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Loading...' : 'Refresh Balance'}
        </button>
      )}
    </div>
  )
}