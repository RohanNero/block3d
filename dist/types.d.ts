import React from 'react';
import { Config } from 'wagmi';

type Rule = {
    type: string;
    title: string;
    addresses?: string[];
    minimumBal?: string;
    contracts?: Contract[];
    strict?: boolean;
};
type Contract = {
    address: string;
    chainId: number;
    minimumBal?: string;
};
type UserData = {
    address?: string;
    simple?: {
        passing: Rule[];
        failing: Rule[];
    };
    token?: {
        passing: Rule[];
        failing: Rule[];
    };
    nft?: {
        passing: Rule[];
        failing: Rule[];
    };
};
type Block3dConfig = {
    publicRoutes: string[];
    strict: boolean;
    rules: Rule[];
};

declare const Block3dConnectButton: () => React.JSX.Element;

interface Block3rProps {
    children: React.ReactNode;
    wagmiConfig: Config;
    block3dConfig: Block3dConfig;
}
/**
 * @dev This wraps the entire site much like clerk's `ClerkProvider` component
 * 1. Should include Rainbow kit provider and wagmi config objects that currently wrap our site.
 * 2. Should get the user's address, (undefined if not connected), then compare it to our config ruleset
 * 3. Start with `simple` restriction type and move onto `token` after it is functional
 */
declare function Block3r({ children, wagmiConfig, block3dConfig, }: Block3rProps): React.JSX.Element;

interface Block3rContentProps {
    children: React.ReactNode;
    block3dConfig: Block3dConfig;
    wagmiConfig: Config;
}
/**
 * @dev This component handles displaying the <Block3d/> component vs the actual page depending on the `isBlock3d` boolean value
 */
declare function Block3rContent({ children, block3dConfig, wagmiConfig, }: Block3rContentProps): React.JSX.Element;

interface QRCodeModalProps {
    qrModalVisible: boolean;
    setQrModalVisible: (visible: boolean) => void;
    address: string;
}
declare function QRCodeModal({ qrModalVisible, setQrModalVisible, address, }: QRCodeModalProps): React.JSX.Element;

/**
 * @dev This is the core hook that determines whether a user can view a page or not
 * @returns isBlock3d - a boolean value that when true, means the user is blocked from viewing the page
 * @returns userData - an object containing the user's address and 3 sub objects for each rule type (simple, token, nft)
 * These sub-objects each contain two `Rule` arrays, one for passing and one for failing rules
 */
declare function useBlock3r(block3dConfig: Block3dConfig, wagmiConfig: Config): {
    isBlock3d: boolean;
    userData: UserData | undefined;
};

/**
 * @param address is the currently connected user address
 * @return `passing` is a Rule[] containing all simple rule checks the user passed
 * @return `failing` is a Rule[] containing all simple rule checks the user failed
 */
declare function checkSimpleRules(address: string, block3dConfig: Block3dConfig): Promise<{
    simplePassing: Rule[];
    simpleFailing: Rule[];
}>;

/**
 * @param address is the currently connected user address
 * @param block3dConfig is the block3d config object
 * @param wagmiConfig is the wagmi config object
 * @return `passing` is a Rule[] containing all token rule checks the user passed
 * @return `failing` is a Rule[] containing all token rule checks the user failed
 */
declare function checkTokenRules(address: string, block3dConfig: Block3dConfig, wagmiConfig: Config): Promise<{
    tokenPassing: Rule[];
    tokenFailing: Rule[];
}>;

/**
 * @param currentPath is the page the user is currently on
 * @return true if currentPath is listed in `publicRoutes` array in `block3d.config.ts`, false otherwise.
 */
declare function checkIsRoutePublic(currentPath: string, block3dConfig: Block3dConfig): Promise<boolean>;

export { type Block3dConfig, Block3dConnectButton, Block3r, Block3rContent, QRCodeModal, type Rule, type UserData, checkIsRoutePublic, checkSimpleRules, checkTokenRules, useBlock3r };
