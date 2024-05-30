import { Rule } from "../types/block3d";
import { type Config } from "wagmi";
import { getClient } from "@wagmi/core";

interface RpcUrls {
  [chainId: number]: string;
}

/**
 * @dev This function views the wagmi config and retrieves any necessary provided RPC URLs, if none are provided we use the default values
 * @param rules is an array of valid rule types
 * @param wagmiConig is the current wagmi config object
 * @return `rpcUrls` is an KV object with chainIds mapped to RPC URLs
 */
export async function getRpcUrls(rules: Rule[], wagmiConfig: Config) {
  /* Step 1: Use Set to store only unique chainIds */
  const chainIds = new Set<number>();
  rules.forEach((rule) => {
    if (rule.contracts) {
      rule?.contracts.forEach((contract) => {
        chainIds.add(contract.chainId);
      });
    }
  });
  const chainIdsArray = Array.from(chainIds);

  /* Step 2: View RPC URLs and add them to KV object  */
  let rpcUrls: RpcUrls = {};

  chainIdsArray.forEach(async (chainId) => {
    const client = await getClient(wagmiConfig, {
      chainId: chainId,
    });

    const url = client?.transport.url;
    if (url) {
      rpcUrls[chainId] = url;
    }
  });

  /* Step 3: Return the KV object */
  return rpcUrls;
}
