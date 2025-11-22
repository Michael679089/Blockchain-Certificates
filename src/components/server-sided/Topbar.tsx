import ThirdWebConnectButton from "../client-sided/thirdweb/ThirdWebConnectButton";


export default function TopBar() {
  return (
    <div className="w-full bg-secondary-color outline-[#F0F2F3] text-black flex justify-end p-2">
      <ThirdWebConnectButton />
    </div>
  );
}
