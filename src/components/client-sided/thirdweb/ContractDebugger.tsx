// components/client-sided/ContractDebugger.tsx
'use client'

import { useState } from 'react'
import { createThirdwebClient, getContract, readContract } from "thirdweb"
import { polygon } from "thirdweb/chains"
import { useActiveAccount } from "thirdweb/react"

export default function ContractDebugger() {
    const [contractInfo, setContractInfo] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const account = useActiveAccount()

    const client = createThirdwebClient({
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!
    })

    const contract = getContract({
        client,
        chain: polygon,
        address: "0x28dAD87Fca53E51d08368AF9F6D7a832530D3bA1",
    })

    const debugContract = async () => {
        setLoading(true)
        setError(null)
        setContractInfo(null)

        try {
            const info: any = {}

            // Check contract name
            try {
                const name = await readContract({
                    contract,
                    method: "function name() view returns (string)",
                    params: [],
                })
                info.name = name
            } catch (e) {
                info.name = "Unable to read"
            }

            // Check contract symbol
            try {
                const symbol = await readContract({
                    contract,
                    method: "function symbol() view returns (string)",
                    params: [],
                })
                info.symbol = symbol
            } catch (e) {
                info.symbol = "Unable to read"
            }

            // Check if contract has owner
            try {
                const owner = await readContract({
                    contract,
                    method: "function owner() view returns (address)",
                    params: [],
                })
                info.owner = owner
                info.isOwner = account?.address?.toLowerCase() === owner.toLowerCase()
            } catch (e) {
                info.owner = "Unable to read (may not have owner function)"
            }

            // Check total supply
            try {
                const totalSupply = await readContract({
                    contract,
                    method: "function totalSupply() view returns (uint256)",
                    params: [],
                })
                info.totalSupply = totalSupply.toString()
            } catch (e) {
                info.totalSupply = "Unable to read"
            }

            // Check if minting is paused
            try {
                const paused = await readContract({
                    contract,
                    method: "function paused() view returns (bool)",
                    params: [],
                })
                info.paused = paused
            } catch (e) {
                info.paused = "No pause function"
            }

            // Check supported interfaces
            try {
                // ERC721
                const isERC721 = await readContract({
                    contract,
                    method: "function supportsInterface(bytes4 interfaceId) view returns (bool)",
                    params: ["0x80ac58cd"], // ERC721 interface ID
                })
                info.isERC721 = isERC721
            } catch (e) {
                info.isERC721 = "Unable to check"
            }

            setContractInfo(info)

        } catch (err: any) {
            console.error('Debug error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Contract Debugger</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Contract: <code className="bg-gray-100 px-2 py-1 rounded">0x28dAD87Fca53E51d08368AF9F6D7a832530D3bA1</code>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    Chain: Polygon (137)
                </p>

                {account && (
                    <p className="text-sm text-gray-600 mb-4">
                        Your wallet: <code className="bg-gray-100 px-2 py-1 rounded text-xs break-all">{account.address}</code>
                    </p>
                )}

                <button
                    onClick={debugContract}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Checking...' : 'Debug Contract'}
                </button>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
                        <p className="text-red-800 font-bold">Error:</p>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {contractInfo && (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold">Contract Information:</h3>
                        
                        <div className="bg-gray-50 p-4 rounded space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <span className="font-medium">Name:</span>
                                <span>{contractInfo.name}</span>
                                
                                <span className="font-medium">Symbol:</span>
                                <span>{contractInfo.symbol}</span>
                                
                                <span className="font-medium">Total Supply:</span>
                                <span>{contractInfo.totalSupply}</span>
                                
                                <span className="font-medium">Owner:</span>
                                <span className="text-xs break-all">{contractInfo.owner}</span>
                                
                                <span className="font-medium">You are owner:</span>
                                <span className={contractInfo.isOwner ? 'text-green-600' : 'text-red-600'}>
                                    {contractInfo.isOwner ? '✅ Yes' : '❌ No'}
                                </span>
                                
                                <span className="font-medium">Paused:</span>
                                <span>{contractInfo.paused?.toString() || 'N/A'}</span>
                                
                                <span className="font-medium">Is ERC721:</span>
                                <span>{contractInfo.isERC721?.toString() || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded">
                            <p className="font-bold text-yellow-800 mb-2">Common Issues:</p>
                            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                                <li>If you're NOT the owner, you may not have permission to mint</li>
                                <li>If paused is TRUE, minting is disabled</li>
                                <li>Check if your contract uses <code>safeMint</code>, <code>mint</code>, or <code>mintTo</code></li>
                                <li>Some contracts require specific roles (MINTER_ROLE)</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-300 p-4 rounded">
                            <p className="font-bold text-blue-800 mb-2">Next Steps:</p>
                            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                                <li>Check if you need to be the owner or have MINTER_ROLE</li>
                                <li>Verify the exact function name in your contract</li>
                                <li>Check if minting is paused</li>
                                <li>Look at your contract on Polygonscan to see the ABI</li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}