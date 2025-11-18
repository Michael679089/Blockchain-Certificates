import ClientDisplay from "@/components/client-sided/thirdweb/ClientDisplay"
import { createThirdwebClient, ThirdwebClient } from "thirdweb";



import {client} from "../../components/server-sided/thirdweb/client";
import { AccountName, useConnectedWallets } from "thirdweb/react";
import IssuingNewCredentials from "@/components/client-sided/issuing-new-credentials";
import GetBalance from "@/components/client-sided/thirdweb/ContractFunctions";
import ContractDebugger from "@/components/client-sided/thirdweb/ContractDebugger";

export default function page() {


    // THIS IS THE ADMIN PAGE

    if (client) {
        return (

        <div className="bg-white text-black">
            <h1>Welcome to admin</h1>
            <ClientDisplay></ClientDisplay>

            <br/>
            {/* Display a form to add certificates to the blockchain */}

            <h1> Step 2: Issue new credentials </h1>
            <IssuingNewCredentials/>
            

            <br/>
            {/* Display a form to add users to the database */}
            <h1> Step 2.1: Add new users to the platform </h1>
            <h1> This is still a work in progress </h1>
            <form>
                <label> Wallet Address </label>
                <input></input>
                <label> Student Number </label>
                <input></input>
                <label>First Name</label>
                <input></input>
                <label>Last Name</label>
                <input></input>
                <label>Year Level</label>
                <label>Program</label>
                <label>Role</label>
                <button>ADD NEW USER</button>                
            </form>

            <ContractDebugger/>
        </div>
    )
    }
}