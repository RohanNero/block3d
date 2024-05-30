"use client";
import React from "react";
import { Config, WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Block3rContent } from "./Block3rContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../styles.css";
import { Block3dConfig } from "../types/block3d";

const queryClient = new QueryClient();

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
export function Block3r({
  children,
  wagmiConfig,
  block3dConfig,
}: Block3rProps) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Block3rContent
                block3dConfig={block3dConfig}
                wagmiConfig={wagmiConfig}
              >
                {children}
              </Block3rContent>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
