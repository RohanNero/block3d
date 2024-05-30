import { Rule, Block3dConfig } from "../types/block3d";
import { createPublicClient, http, extractChain, Chain } from "viem";
import * as chains from "viem/chains";
import { type Config } from "wagmi";
import { getRpcUrls } from "./getRpcUrls";
import { abi } from "../constants/abi";

/**
 * @param address is the currently connected user address
 * @param block3dConfig is the block3d config object
 * @param wagmiConfig is the wagmi config object
 * @return `passing` is a Rule[] containing all nft rule checks the user passed
 * @return `failing` is a Rule[] containing all nft rule checks the user failed
 */
export async function checkNftRules(
  address: string,
  block3dConfig: Block3dConfig,
  wagmiConfig: Config,
) {
  let passing: Rule[] = [];
  let failing: Rule[] = [];
  const allChains: Chain[] = Object.values(chains);
  const validChainIds = allChains.map((chain) => chain.id);

  let nftRules: Rule[] = block3dConfig.rules.filter(
    (rule) => rule.type === "nft",
  );

  /* Remove invalid rules from the array */
  nftRules = nftRules
    .map((rule) => {
      /* Filter out invalid `Contract`s from the rule's `contracts` array */
      const validContracts = rule.contracts?.filter((contract) => {
        if (!validChainIds.includes(contract.chainId)) {
          return false;
        }
        const minimumBal = parseFloat(
          contract?.minimumBal ?? rule?.minimumBal ?? "0",
        );
        return (
          contract?.address !== undefined &&
          contract.address.length === 42 &&
          minimumBal >= 1
        );
      });

      /* Return the rule with only valid `Contract` objects */
      return {
        ...rule,
        contracts: validContracts,
      };
    })
    .filter((rule) => rule.contracts && rule.contracts.length > 0);

  const rpcUrls = await getRpcUrls(nftRules, wagmiConfig);

  /* Compare user balance to `minimumBal` from config and add to respective array (passing/failing) */
  for (const rule of nftRules) {
    const strictRule = rule.strict ?? false;
    let loopBroken: boolean = false;

    for (const contract of rule.contracts!) {
      const minimumBal = contract.minimumBal ?? rule.minimumBal ?? "0";

      /* If a rule exists on a chain that doesn't have a transport url provided in the wagmi config, we use the default provided by the client */
      let publicClient;
      if (rpcUrls[contract.chainId]) {
        publicClient = createPublicClient({
          transport: http(rpcUrls[contract.chainId]),
        });
      } else {
        /* If there is no transport url, we need to use `extractChain` to create client with default RPC URL for that chain */
        const chain = extractChain({
          chains: allChains,
          id: contract.chainId ?? 1, // If chainId is undefined for some reason we use Ethereum Mainnet
        });
        publicClient = createPublicClient({
          chain: chain,
          transport: http(),
        });
      }

      /* Make the `balanceOf()` function call */
      const balance = await publicClient.readContract({
        address: contract.address as `0x${string}`,
        abi: abi,
        functionName: "balanceOf",
        args: [address],
      });

      const minimumBalNumber = parseFloat(minimumBal);
      const balanceNumber = parseFloat(balance as unknown as string);

      /* If minimum balance is more than user's actual balance, and ruleset is strict, we push the rule to failing array */
      if (minimumBalNumber > balanceNumber && strictRule === true) {
        failing.push(rule);
        loopBroken = true;
        break;
      }

      /* If minimum balance is less than user's actual balance, and ruleset is not strict, we push the rule to passing array */
      if (minimumBalNumber <= balanceNumber && strictRule === false) {
        passing.push(rule);
        loopBroken = true;
        break;
      }
    }

    /* If the loop wasn't broken and reaches this code, either
     * 1. rule type is strict and user had enough nfts
     * 2. rule type isn't strict and user didn't have enough nfts
     */
    if (strictRule === false && loopBroken === false) {
      failing.push(rule);
    } else if (strictRule === true && loopBroken === false) {
      passing.push(rule);
    }
    loopBroken = false;
  }

  return { nftPassing: passing, nftFailing: failing };
}
