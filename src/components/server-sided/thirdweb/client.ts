// lib/thirdweb.ts (create this file)
import { createThirdwebClient } from "thirdweb";
import { inAppWallet } from "thirdweb/wallets";

export const client = createThirdwebClient({ 
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID! 
});

export const wallet = inAppWallet();