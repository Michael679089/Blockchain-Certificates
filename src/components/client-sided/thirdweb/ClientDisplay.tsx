// ClientDisplay.tsx
'use client'

import { AccountName, AccountProvider, AutoConnect, useActiveAccount } from "thirdweb/react";
import { client } from "../../server-sided/thirdweb/client";
import { ConnectButton } from "thirdweb/react";

// Testing 2
import { ChainProvider, ChainIcon, ChainName } from "thirdweb/react";
import { ethereum, polygonAmoy } from "thirdweb/chains";
import { autoConnect } from "thirdweb/wallets";

export default function ClientDisplay() {
    console.log("ClientDisplay: Loading user account");
    const account = useActiveAccount();
    if (!account) {
        console.log("auto connecting");
        return (
            <AutoConnect client={client}/>
        )
    }
    else if (account) {
        return (
            <div className="bg-green-800 p-4">
                <h1>Your wallet information</h1>
                
                {/* Separate the ConnectButton - don't mix it with AccountProvider */}
                <div className="mb-4">
                    <ConnectButton client={client}></ConnectButton>
                </div>

                <div className="space-y-2">
                    <p>Account Address: {account.address}</p>
                    
                    {/* AccountName in its own section, away from ConnectButton */}
                    <div>
                        <span className="font-semibold">Account Name: </span>
                        <AccountProvider address={account.address} client={client}>
                            <AccountName />
                        </AccountProvider>
                    </div>

                    {/* Chain info */}
                    <div className="mt-4 ">
                        <ChainProvider chain={polygonAmoy}>
                            <div className="flex items-center gap-2">
                                <ChainIcon client={client} className="w-24"/>
                                <ChainName />
                            </div>
                        </ChainProvider>
                    </div>
                </div>
            </div>
        );
    }

    
}