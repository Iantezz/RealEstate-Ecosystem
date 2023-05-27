import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers/dist/MetaMaskInpageProvider";

const pageReload = () => {
  window.location.reload();
};

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
  const isLocked = !(await ethereum._metamask.isUnlocked());
  if (isLocked) {
    pageReload();
  }
};

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on("chainChanged", pageReload);
  ethereum.on("accountsChanged", handleAccount(ethereum));
};

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener("chainChanged", pageReload);
  ethereum?.removeListener("accountsChanged", handleAccount(ethereum));
};

type Web3State = {
  ethereum: MetaMaskInpageProvider | undefined;
  provider: ethers.providers.Web3Provider | undefined;
};

const createDefaultState = (): Web3State => ({
  ethereum: undefined,
  provider: undefined,
});

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent = ({ children }) => {
  const [web3State, setWeb3State] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initiateWeb3() {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          // const contract = await loadContract("NftMarket", provider)

          const signer = provider.getSigner();
          // const signedContract = contract.connect(signer)

          setTimeout(() => setGlobalListeners(window.ethereum), 500);
          setWeb3State({
            ethereum: window.ethereum,
            provider,
          });
        } else {
          console.error("Please install a web3 wallet");
        }
      } catch (e) {
        console.error("Error initializing web3:", e);
      }
    }

    initiateWeb3();
    return () => removeGlobalListeners(window.ethereum);
  }, []);

  return <Web3Context.Provider value={web3State}>{children}</Web3Context.Provider>;
};

export function useWeb3() {
  return useContext(Web3Context);
}


