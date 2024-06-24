import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserData } from "../types/block3d";
import { type Config, useAccount } from "wagmi";
import { Block3dConfig } from "../types/block3d";
import { checkBlock3d } from "../utils/checkBlock3d";

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

  useEffect(() => {
    const checkAccess = async () => {
      if (currentPath) {
        console.log("Validating user...");
        const { block3d, userData } = await checkBlock3d(
          address,
          chain?.id,
          currentPath,
          block3dConfig,
          wagmiConfig
        );
        setBlock3d(block3d);
        setUserData(userData);
      }
    };

    checkAccess();
  }, [chain, address, currentPath, block3dConfig]);

  return { isBlock3d: block3d, userData: userData };
}
