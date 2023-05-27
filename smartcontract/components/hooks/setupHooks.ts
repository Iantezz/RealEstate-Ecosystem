import { Web3Dependencies } from "../../../../types/hooks";
import { UseAccountHook, hookFactory as createAccountHook, useAccountHok } from "./use Accounts";

export type Web3Hooks = {
    useAcount: UseAccountHook;


}
export type SetupHooks = {
    (d: Web3Dependencies): Web3Hooks
}

export const SetupHooks = (deps) => {
    return{
        useAccount: createAccountHook(deps)
    }
}