'use client'

import { Children } from "react";
import { createThirdwebClient, ThirdwebClient } from "thirdweb";
import { ThirdwebProvider, useConnect, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { preAuthenticate } from "thirdweb/wallets/in-app";

const client = createThirdwebClient({ clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID! });
const wallet = inAppWallet();

// Thirdweb Connect button
import { ConnectButton } from "thirdweb/react";


// Component Imports
import { redirect } from "next/dist/server/api-utils";

import { useRouter } from 'next/navigation';
import LoginPage from "./LoginPage";
import Forms from "./Forms";



export default function ThirdWebApp() {
    const client: ThirdwebClient = createThirdwebClient({ clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID! });
    console.log("Thirdweb App Page");


    const account = useActiveAccount();
    console.log("connected to", account?.address);
    console.log("estimated gas", account?.estimateGas);
}