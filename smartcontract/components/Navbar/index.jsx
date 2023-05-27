import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import { useAccount } from "@/components/hooks/web3/useAccounts";

import WalletBar from "./walletbar";

// Navigation for market place and create nft
const navigation = [
  { name: "Market Place", href: "/", current: true },
  { name: "Create NFT", href: "/nft/create", current: false },
];

export default function Navbar() {
  const { account } = useAccount();
  
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <>
        <WalletBar
          isInstalled={account.isInstalled}
          isLoading={account.isLoading}
          connect={() => {}}
        />
      </>
    </Disclosure>
  );
}
