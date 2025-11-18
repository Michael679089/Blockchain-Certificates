import LoginPage from "@/components/client-sided/thirdweb/LoginPage";

import GetBalance from "../components/client-sided/thirdweb/ContractFunctions"; 

export default function Home() {
  console.log("Inside the login page");

  // THIS IS THE LOGIN PAGE
  return (
    <div className="">
      
      <h1> Step 1: Login your ThirdWeb Account </h1>
      <LoginPage></LoginPage> 
      <div> The Purpose of this login page is to log-in to your Wallet or ThirdWeb Wallet</div>
      <GetBalance/>

      <button> Public Verifier </button>

    </div>
  );
}
