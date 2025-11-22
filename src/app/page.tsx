import MetaMaskConnect from "@/components/client-sided/MetaMaskConnect";
import LoginPage from "@/components/client-sided/thirdweb/LoginPage";
import { ThirdWebConnectButtonPrimary } from "@/components/client-sided/thirdweb/ThirdWebConnectButtonPrimary";
import TopBar from "@/components/server-sided/Topbar";

export default function Home() {
  return (
    <div
      className="login-page"
    >
      <TopBar />
      
      <div className="flex items-center justify-center gap-5">
        <div className="w-full max-w-lg px-8 py-12 bg-white bg-opacity-80 shadow-lg rounded-xl mt-12 flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <img
              src="/pictures/icons/diploma.png"
              className="w-20 h-20 mb-6"
              alt="Diploma Icon"
            />
            <div className="text-4xl font-bold mb-2 text-primary-color">LedgerGrad:</div>
            <p className="text-lg text-gray-700 mb-4 text-center">
              Diploma Verifier using Blockchain Technology Demo
            </p>
          </div>
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Connect MetaMask using ThirdWeb SDK</h1>
          <ThirdWebConnectButtonPrimary></ThirdWebConnectButtonPrimary>
          <div>
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 mt-5">Go to Public verifier</h1>
          </div>
          <button className="p-4 m-2 bg-primary-color text-white">Public Verifier</button>
        </div>
      </div>

      
    </div>
  );
}
