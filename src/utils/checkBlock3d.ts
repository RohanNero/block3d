import { checkIsRoutePublic } from "../utils/checkIsRoutePublic";
import { checkSimpleRules } from "../utils/checkSimpleRules";
import { checkTokenRules } from "../utils/checkTokenRules";
import { checkNftRules } from "../utils/checkNftRules";
import { Block3dConfig } from "../types/block3d";
import { type Config } from "wagmi";
import { UserData } from "../types/block3d";

/* Contains page restriction checks */
export const checkBlock3d = async (
  address: `0x${string}` | undefined,
  chain: number | undefined,
  currentPath: string,
  block3dConfig: Block3dConfig,
  config: Config
) => {
  /* Check if config file was loaded correctly */
  if (config === undefined || block3dConfig === undefined) {
    console.log("Block3d Config is undefined.");
    return { block3d: true, userData: undefined };
  }

  /* Check if the current route is public */
  const isPublic = await checkIsRoutePublic(currentPath, block3dConfig);
  if (isPublic === true) {
    console.log("Current route is public.");
    return { block3d: false, userData: undefined };
  }

  /* If address or chain are undefined, we must return since utility functions depend on them */
  if (address === undefined || chain === undefined) {
    console.log("Address or Chain is undefined!");
    return { block3d: true, userData: undefined };
  }

  const { simplePassing, simpleFailing } = await checkSimpleRules(
    address,
    block3dConfig
  );
  const { tokenPassing, tokenFailing } = await checkTokenRules(
    address,
    block3dConfig,
    config
  );
  const { nftPassing, nftFailing } = await checkNftRules(
    address,
    block3dConfig,
    config
  );

  const userData: UserData = {
    address: address,
    simple: {
      passing: simplePassing,
      failing: simpleFailing,
    },
    token: {
      passing: tokenPassing,
      failing: tokenFailing,
    },
    nft: {
      passing: nftPassing,
      failing: nftFailing,
    },
  };

  /* Simple rule type checks 
    If any simple rule checks failed and strict is set to true, we return block3d and userData */
  if (
    block3dConfig.strict === true &&
    (simpleFailing?.length ? simpleFailing.length : 0) > 0
  ) {
    return { block3d: true, userData: userData };
  }
  /* If any simple rule checks passed and strict is set to false, we return block3d and userData */
  if (
    block3dConfig.strict === false &&
    (simplePassing?.length ? simplePassing.length : 0) > 0
  ) {
    return { block3d: false, userData: userData };
  }

  /* Token rule type checks
    If any token rule checks failed and strict is set to true, we return block3d and userData */
  if (
    block3dConfig.strict === true &&
    (tokenFailing?.length ? tokenFailing.length : 0) > 0
  ) {
    return { block3d: true, userData: userData };
  }
  /* If any token rule checks passed and strict is set to false, we return block3d and userData */
  if (
    block3dConfig.strict === false &&
    (tokenPassing?.length ? tokenPassing.length : 0) > 0
  ) {
    return { block3d: false, userData: userData };
  }

  /* Nft rule type checks
    If any nft rule checks failed and strict is set to true, we return block3d and userData */
  if (
    block3dConfig.strict === true &&
    (nftFailing?.length ? nftFailing.length : 0) > 0
  ) {
    return { block3d: true, userData: userData };
  }
  /* If any nft rule checks passed and strict is set to false, we return block3d and userData */
  if (
    block3dConfig.strict === false &&
    (nftPassing?.length ? nftPassing.length : 0) > 0
  ) {
    return { block3d: false, userData: userData };
  }

  /* If you reach the end of this function it means one of two things
   * 1. strict rules are enabled and the user passed all of them
   * 2. strict rules are disabeld and the user didn't pass any of them
   */
  if (block3dConfig.strict === true) {
    return { block3d: false, userData: userData };
  } else {
    return { block3d: true, userData: userData };
  }
};
