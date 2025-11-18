import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(137),
  address: "0x28dAD87Fca53E51d08368AF9F6D7a832530D3bA1",
});


const response = await fetch("https://api.thirdweb.com/v1/contracts/read", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-secret-key": process.env.NEXT_SECRET_THIRDWEB_KEY!,
  },
  body: JSON.stringify({
    calls: [
      {
        contractAddress: "0x28dAD87Fca53E51d08368AF9F6D7a832530D3bA1",
        method: "function balanceOf(address owner) view returns (uint256)",
      },
    ],
    chainId: 137,
  }),
});

export const data = await response.json();
