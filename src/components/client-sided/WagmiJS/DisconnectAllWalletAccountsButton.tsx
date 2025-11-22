'use client'


import { disconnect } from '@wagmi/core';

import { wagmiConfig } from '../../../config/wagmiConfig';


async function DisconnectAllWalletAccounts() {
    console.log(disconnect);
    await disconnect(wagmiConfig);
}

export function DisconnectAllWalletAccountsButton() {
    
    return (
        <div>
            <button onClick={DisconnectAllWalletAccounts}>Disconnect Account</button>
        </div>
    );
}