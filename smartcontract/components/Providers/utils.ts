import { SetupHooks,Web3Hooks } from "../hooks/web3/setupHooks";
import { Web3Dependencies } from "../../../types/hooks";
import { MetaMaskInpageProvider} from "@metamask/providers";
import { Contract, ethers} from "ethers";

declare global {
    interferance window{
        ethereum: MetaMaskInpageProvider;
    }
}

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
}
    export type Web3State = {
        isLoading: boolean;
        hooks:Web3Hooks;
    } & Nullable<Web3Dependencies>

    export const createDefaultState = () => {
        return {
            ethereum: null,
            provider: null,
            contract: null,
            isLoading: true,
            hooks: SetupHooks({isLoading: true} as any)
        }
    }
    export const createWeb3State = ({
        ethereum,
        provider,
        contract,
        isLoading,
    }: Web3Dependancies) => {
        return {
            ethereum,
            provider,
            contract,
            isLoading,
            hooks: SetupHooks({ethereum, provider, isLoading})

        }
    }

    //
 