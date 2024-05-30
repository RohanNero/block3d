import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { checkIsRoutePublic } from "../utils/checkIsRoutePublic";
import { checkSimpleRules } from "../utils/checkSimpleRules";
import { checkTokenRules } from "../utils/checkTokenRules";
import { checkNftRules } from "../utils/checkNftRules";
import { UserData } from "../types/block3d";
import { type Config, useAccount } from "wagmi";
import { Block3dConfig } from "../types/block3d";

/**
 * @dev This is the core hook that determines whether a user can view a page or not
 * @returns isBlock3d - a boolean value that when true, means the user is blocked from viewing the page
 * @returns userData - an object containing the user's address and 3 sub objects for each rule type (simple, token, nft)
 * These sub-objects each contain two `Rule` arrays, one for passing and one for failing rules
 */
export function useBlock3r(block3dConfig: Block3dConfig, wagmiConfig: Config) {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [block3d, setBlock3d] = useState<boolean>(true);
  const { address, chain } = useAccount();
  const currentPath = usePathname();

  /* This useEffect triggers the access control block3r function logic */
  useEffect(() => {
    console.log("account:", address);
    console.log("block3dConfig:", block3dConfig);
    checkBlock3d(block3dConfig, wagmiConfig);
  }, [chain, address, currentPath, block3dConfig]);

  /* Contains page restriction checks */
  const checkBlock3d = async (config: Block3dConfig, wConfig: Config) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      address: address?.toString() ?? "",
    }));

    /* Check if config file was loaded correctly */
    if (config === undefined) {
      setBlock3d(false);
      console.log("Block3d Config is undefined.");
      return;
    }

    /* Check if the current route is public */
    const isPublic = await checkIsRoutePublic(currentPath, config);
    if (isPublic === true) {
      setBlock3d(false);
      console.log("Current route is public.");
      return;
    }

    /* If address or chain are undefined, we must return since utility functions depend on them */
    if (address === undefined || chain === undefined) {
      console.log("Address or Chain is undefined!");
      return;
    }

    const { simplePassing, simpleFailing } = await checkSimpleRules(
      address,
      config,
    );
    const { tokenPassing, tokenFailing } = await checkTokenRules(
      address,
      config,
      wConfig,
    );
    const { nftPassing, nftFailing } = await checkNftRules(
      address,
      config,
      wConfig,
    );

    /* Update useState `userData` object */
    setUserData((prevUserData) => ({
      ...prevUserData,
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
    }));

    /* Simple rule type checks 
    If any simple rule checks failed and strict is set to true, we return block3d and userData */
    if (
      block3dConfig.strict === true &&
      (simpleFailing?.length ? simpleFailing.length : 0) > 0
    ) {
      setBlock3d(true);
      return;
    }
    /* If any simple rule checks passed and strict is set to false, we return block3d and userData */
    if (
      block3dConfig.strict === false &&
      (simplePassing?.length ? simplePassing.length : 0) > 0
    ) {
      setBlock3d(false);
      return;
    }

    /* Token rule type checks
    If any token rule checks failed and strict is set to true, we return block3d and userData */
    if (
      block3dConfig.strict === true &&
      (tokenFailing?.length ? tokenFailing.length : 0) > 0
    ) {
      setBlock3d(true);
      return;
    }
    /* If any token rule checks passed and strict is set to false, we return block3d and userData */
    if (
      block3dConfig.strict === false &&
      (tokenPassing?.length ? tokenPassing.length : 0) > 0
    ) {
      setBlock3d(false);
      return;
    }

    /* Nft rule type checks
    If any nft rule checks failed and strict is set to true, we return block3d and userData */
    if (
      block3dConfig.strict === true &&
      (nftFailing?.length ? nftFailing.length : 0) > 0
    ) {
      setBlock3d(true);
      return;
    }
    /* If any nft rule checks passed and strict is set to false, we return block3d and userData */
    if (
      block3dConfig.strict === false &&
      (nftPassing?.length ? nftPassing.length : 0) > 0
    ) {
      setBlock3d(false);
      return;
    }

    /* If you reach the end of this function it means one of two things
     * 1. strict rules are enabled and the user passed all of them
     * 2. strict rules are disabeld and the user didn't pass any of them
     */
    if (block3dConfig.strict === true) {
      setBlock3d(false);
      return;
    } else {
      setBlock3d(true);
      return;
    }
  };

  return { isBlock3d: block3d, userData: userData };
}
