import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { QRCodeModal } from "./QRCodeModal";
import React from "react";

/* Custom Wagmi Connect Button */
export const Block3dConnectButton = () => {
  const { disconnect } = useDisconnect();
  const [addressCopied, setAddressCopied] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const copyToClipboard = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setAddressCopied(true);
        setTimeout(() => {
          setAddressCopied(false);
        }, 800);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              // Not connected display
              if (!connected) {
                return (
                  <button
                    className="text-white bg-blue-300 rounded text-2xl w-full font-medium p-2"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </button>
                );
              }

              // Chain not supported display
              if (chain.unsupported) {
                return (
                  <div className="w-full flex flex-row gap-4 justify-evenly p-3 py-4">
                    <div className="btn-sm bg-blue-300 text-white rounded-lg h-full text-lg flex items-center cursor-pointer">
                      Wrong Network
                    </div>
                    {/* Disconnect icon */}
                    <div className="rounded-lg bg-blue-300 p-1 pr-2">
                      <button
                        className="menu-item text-white text-lg !rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] flex items-center"
                        type="button"
                        onClick={() => disconnect()}
                      >
                        <ArrowLeftOnRectangleIcon className="h-9 w-6 ml-2 sm:ml-0" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                );
              }

              // Connected to supported chain display
              return (
                <div className="w-full">
                  <div className="p-2 flex flex-row relative font-main justify-evenly gap-12 text-white text-xl">
                    {/* Chain div */}
                    <div className="flex items-center cursor-pointer">
                      Connected to {chain?.name}
                    </div>
                    {/* User info div */}
                    <div className="flex flex-row gap-1">
                      {/* User address and copy icon */}
                      <div className="hidden lg:block">
                        {addressCopied ? (
                          <div className="!rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] relative group">
                            <div className="whitespace-nowrap">
                              {account.displayName}
                            </div>
                            <CheckCircleIcon
                              className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                              aria-hidden="true"
                            />
                            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                              Address Copied!
                            </span>
                          </div>
                        ) : (
                          <div
                            className="!rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] relative group"
                            onClick={() => copyToClipboard(account.address)}
                          >
                            <div className="cursor-pointer flex items-center text-xl">
                              {account.displayName}
                            </div>
                            <DocumentDuplicateIcon
                              className="text-xl font-normal h-9 w-6 cursor-pointer ml-2 sm:ml-0"
                              aria-hidden="true"
                            />
                            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                              Click to copy address
                            </span>
                          </div>
                        )}
                      </div>
                      {/* QR code icon */}
                      <div className="relative group hidden lg:block">
                        <button
                          onClick={() => setQrModalVisible(true)}
                          className="flex items-center gap-3 px-3 py-2 !rounded-xl hover:bg-[#9fcbfd]"
                        >
                          <QrCodeIcon className="h-9 w-6 ml-2 sm:ml-0" />
                        </button>
                        <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                          View QR Code
                        </span>
                      </div>
                      {/* Disconnect icon */}
                      <div className="relative group">
                        <button
                          className="menu-item text-[#fd9693] !rounded-xl flex gap-3 py-2 px-3 hover:bg-[#9fcbfd]"
                          type="button"
                          onClick={() => disconnect()}
                        >
                          <ArrowLeftOnRectangleIcon className="h-9 w-6 ml-2 sm:ml-0" />
                        </button>
                        <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                          Disconnect
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* QR code modal */}
                  <QRCodeModal
                    setQrModalVisible={setQrModalVisible}
                    qrModalVisible={qrModalVisible}
                    address={account.address}
                  />
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
