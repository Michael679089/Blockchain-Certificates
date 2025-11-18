// app/api/mint/route.ts (server-side)
import { createThirdwebClient } from "thirdweb";

const serverClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
  secretKey: process.env.NEXT_SECRET_THIRDWEB_KEY! // ✅ OK here
});

export async function POST(request: Request) {
  // Use serverClient for privileged operations
}