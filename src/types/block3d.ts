/* The rules object from the config file */
export type Rule = {
  type: string;
  title: string;
  addresses?: string[];
  minimumBal?: string /* Set this to allow using same minimumBal across different chains */;
  contracts?: Contract[];
  strict?: boolean;
};

/* Used inside Rule type, this represents a smart contract */
type Contract = {
  address: string;
  chainId: number;
  minimumBal?: string /* This takes priority over the blanket `minimumBal` outside of the `contract` object */;
};

/* Type for the userData object that is returned by the `useBlock3r()` hook */
export type UserData = {
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

/* The type for the `block3dConfig` object inside the `block3d.config` file */
export type Block3dConfig = {
  publicRoutes: string[];
  strict: boolean;
  rules: Rule[];
};
