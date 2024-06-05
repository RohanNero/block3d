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

  const failing =
    (userData.simple?.failing?.length ?? 0) +
    (userData.token?.failing?.length ?? 0) +
    (userData.nft?.failing?.length ?? 0);
  const passing =
    (userData.simple?.passing?.length ?? 0) +
    (userData.token?.passing?.length ?? 0) +
    (userData.nft?.passing?.length ?? 0);

  if (block3dConfig.strict === true && failing > 0) {
    /* If any rule checks failed and strict is set to true, the user is blocked */
    return { block3d: true, userData: userData };
  } else if (block3dConfig.strict === false && passing > 0) {
    /* If any rule checks passed and strict is set to false, the user isn't blocked */
    return { block3d: false, userData: userData };
  } else {
    /* If the code reachs this block it means one of two things:
     * 1. strict rules are enabled and the user passed all of them
     * 2. strict rules are disabeld and the user didn't pass any of them
     * This means the block3d boolean indicating whether the user can view the page is
     * equal to the inverse of the `strict` boolean value set inside the block3d config file
     */
    return { block3d: !block3dConfig.strict, userData: userData };
  }
};
