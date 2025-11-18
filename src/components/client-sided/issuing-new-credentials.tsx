// components/client-sided/IssuingNewCredentialsFixed.tsx
'use client'

import { useState } from 'react'
import { createThirdwebClient, getContract, prepareContractCall, sendTransaction } from "thirdweb"
import { polygon } from "thirdweb/chains"
import { useActiveAccount } from "thirdweb/react"
import { upload } from "thirdweb/storage"

type MintMethod = 'mintTo' | 'safeMint' | 'mint' | 'awardItem'

export default function IssuingNewCredentialsFixed() {
    const [formData, setFormData] = useState({
        credentialType: '',
        walletAddress: '',
        studentId: '',
        firstName: '',
        lastName: '',
        credentialTitle: '',
        additionalMetadata: '',
        issuedBy: ''
    })
    const [mintMethod, setMintMethod] = useState<MintMethod>('mintTo')
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('')
    const account = useActiveAccount()

    const client = createThirdwebClient({
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!
    })

    const contract = getContract({
        client,
        chain: polygon,
        address: "0x28dAD87Fca53E51d08368AF9F6D7a832530D3bA1",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateWalletAddress = (address: string) => {
        return /^0x[a-fA-F0-9]{40}$/.test(address)
    }

    const mintCredentialNFT = async () => {
        if (!account) {
            setStatus('Error: Please connect your wallet first')
            return
        }

        setIsLoading(true)
        setStatus('Processing...')

        try {
            // Validate wallet address
            if (!validateWalletAddress(formData.walletAddress)) {
                throw new Error('Invalid wallet address format')
            }

            setStatus('Preparing metadata...')

            // Prepare metadata
            const metadata = {
                name: formData.credentialTitle,
                description: `${formData.credentialType} issued to ${formData.firstName} ${formData.lastName}`,
                image: "ipfs://QmYOUR_IMAGE_CID_HERE",
                attributes: [
                    {
                        trait_type: "Credential Type",
                        value: formData.credentialType
                    },
                    {
                        trait_type: "Student ID",
                        value: formData.studentId
                    },
                    {
                        trait_type: "First Name",
                        value: formData.firstName
                    },
                    {
                        trait_type: "Last Name",
                        value: formData.lastName
                    },
                    {
                        trait_type: "Issued By",
                        value: formData.issuedBy
                    },
                    {
                        trait_type: "Issue Date",
                        value: new Date().toISOString()
                    },
                    {
                        trait_type: "Additional Info",
                        value: formData.additionalMetadata
                    }
                ]
            }

            setStatus('Uploading metadata to IPFS...')

            // Upload metadata to IPFS
            const metadataUri = await upload({
                client,
                files: [metadata],
            })

            setStatus(`Preparing transaction using ${mintMethod}...`)

            let transaction

            // Try different function signatures based on selected method
            switch (mintMethod) {
                case 'mintTo':
                    transaction = prepareContractCall({
                        contract,
                        method: "function mintTo(address to, string uri)",
                        params: [formData.walletAddress, metadataUri],
                    })
                    break
                
                case 'safeMint':
                    transaction = prepareContractCall({
                        contract,
                        method: "function safeMint(address to, string uri)",
                        params: [formData.walletAddress, metadataUri],
                    })
                    break
                
                case 'mint':
                    transaction = prepareContractCall({
                        contract,
                        method: "function mint(address to, string uri)",
                        params: [formData.walletAddress, metadataUri],
                    })
                    break
                
                case 'awardItem':
                    transaction = prepareContractCall({
                        contract,
                        method: "function awardItem(address player, string tokenURI) returns (uint256)",
                        params: [formData.walletAddress, metadataUri],
                    })
                    break
            }

            setStatus('Minting NFT... Please confirm in your wallet')

            // Send the transaction
            const result = await sendTransaction({
                transaction,
                account,
            })

            setStatus(`✅ Success! NFT minted to ${formData.walletAddress}

Transaction Hash: ${result.transactionHash}

View on Polygonscan:
https://polygonscan.com/tx/${result.transactionHash}`)

            // Reset form
            setFormData({
                credentialType: '',
                walletAddress: '',
                studentId: '',
                firstName: '',
                lastName: '',
                credentialTitle: '',
                additionalMetadata: '',
                issuedBy: ''
            })

        } catch (error: any) {
            console.error('Error minting NFT:', error)
            
            let errorMessage = error.message || 'Failed to mint NFT'
            
            if (errorMessage.includes('execution reverted')) {
                errorMessage = `Execution Reverted - Possible reasons:
                
1. You don't have permission to mint (not owner or no MINTER_ROLE)
2. Wrong function name - try a different mint method above
3. Contract is paused
4. Invalid parameters

Check the Contract Debugger to see if you're the owner.`
            }
            
            setStatus(`Error: ${errorMessage}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">Issue New Credential</h1>
                <p className="text-sm text-gray-600 mb-6">Create and mint NFT credentials to students</p>
                
                {!account && (
                    <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                        ⚠️ Please connect your wallet to mint credentials
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {/* Mint Method Selection */}
                    <div className="bg-blue-50 border border-blue-300 p-4 rounded">
                        <label className="block font-medium mb-2 text-blue-800">
                            Select Mint Function Method *
                        </label>
                        <select 
                            value={mintMethod}
                            onChange={(e) => setMintMethod(e.target.value as MintMethod)}
                            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="mintTo">mintTo (address, uri)</option>
                            <option value="safeMint">safeMint (address, uri)</option>
                            <option value="mint">mint (address, uri)</option>
                            <option value="awardItem">awardItem (address, uri)</option>
                        </select>
                        <p className="text-xs text-blue-700 mt-2">
                            Try different methods if one doesn't work. Check your contract's ABI on Polygonscan.
                        </p>
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Credential Type *</label>
                        <select 
                            name="credentialType"
                            value={formData.credentialType}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- SELECT TYPE --</option>
                            <option value="Degree Certificate">Degree Certificate</option>
                            <option value="Course Completion">Course Completion</option>
                            <option value="Honor/Award">Honor/Award</option>
                            <option value="Workshop Completion">Workshop Completion</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Student Wallet Address *</label>
                        <input 
                            name="walletAddress"
                            value={formData.walletAddress}
                            onChange={handleChange}
                            placeholder="0x..."
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">Student ID *</label>
                            <input 
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                placeholder="STU2024001"
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-gray-700">Issued By *</label>
                            <input 
                                name="issuedBy"
                                value={formData.issuedBy}
                                onChange={handleChange}
                                placeholder="University Name"
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">First Name *</label>
                            <input 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="John"
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-gray-700">Last Name *</label>
                            <input 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Credential Title *</label>
                        <input 
                            name="credentialTitle"
                            value={formData.credentialTitle}
                            onChange={handleChange}
                            placeholder="Bachelor of Science in Computer Science"
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Additional Metadata</label>
                        <textarea 
                            name="additionalMetadata"
                            value={formData.additionalMetadata}
                            onChange={handleChange}
                            placeholder="GPA: 3.8, Honors: Magna Cum Laude"
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button 
                        onClick={mintCredentialNFT}
                        disabled={isLoading || !account || !formData.credentialType || !formData.walletAddress || !formData.studentId || !formData.firstName || !formData.lastName || !formData.credentialTitle || !formData.issuedBy}
                        className="bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Processing...' : 'Issue New Credential'}
                    </button>
                </div>

                {status && (
                    <div className={`mt-6 p-4 rounded-lg ${status.includes('Error') ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                        <p className={`font-medium ${status.includes('Error') ? 'text-red-800' : 'text-green-800'}`}>
                            {status.includes('Error') ? '❌ Error' : '✅ Status'}
                        </p>
                        <pre className={`mt-2 text-sm whitespace-pre-wrap ${status.includes('Error') ? 'text-red-700' : 'text-green-700'}`}>
                            {status}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}