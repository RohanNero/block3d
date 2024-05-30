import { useBlock3r } from "../hooks/useBlock3r";
import Block3d from "./Block3d";
import { Config } from "wagmi";
import React from "react";
import "../../styles.css";
import { Block3dConfig } from "../types/block3d";

interface Block3rContentProps {
  children: React.ReactNode;
  block3dConfig: Block3dConfig;
  wagmiConfig: Config;
}

/**
 * @dev This component handles displaying the <Block3d/> component vs the actual page depending on the `isBlock3d` boolean value
 */
export function Block3rContent({
  children,
  block3dConfig,
  wagmiConfig,
}: Block3rContentProps) {
  const { isBlock3d, userData } = useBlock3r(block3dConfig, wagmiConfig);

  if (isBlock3d) {
    return <Block3d userData={userData} />;
  } else {
    return <div>{children}</div>;
  }
}
