// LoginPage.tsx
'use client'

import { useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { client } from "../../server-sided/thirdweb/client"; // Import shared client

export default function LoginPage() {
    const router = useRouter();
    const account = useActiveAccount();
    
    useEffect(() => { 
        // if (account) {
        //     router.push('/Admin');
        // }
    }, [account, router]);
    
    if (!account) {
        return (
            <div>
                <h1>Step 1: Login</h1>
                <ConnectButton 
                    client={client}
                    autoConnect={true} // ✅ Enable auto-connect
                />
            </div>
        );
    }
    
    return <div> Redirecting to Admin...</div>;
}