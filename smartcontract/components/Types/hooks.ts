import { MetamaskInpageProvider } from "@metamask/providers";
import { providers } from "ethers";
import { SWRResponse } from "swr";

export type Web3Dependencies = {
  provider: providers.Web3Provider;
  ethereum: MetamaskInpageProvider;
  //contract: NftMarketContract;
  isLoading: boolean;
};

export type CryptoHookFactory<D = any, R = any, P = any> = (
  d: Partial<Web3Dependencies>
) => CryptoHandlerHook<D, R, P>;

export type CryptoHandlerHook<D = any, R = any, P = any> = (
  params?: P
) => CryptoSWRResponse<D, R>;

export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D, R>;
