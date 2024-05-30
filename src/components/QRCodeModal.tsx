"use client";
import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { QRCodeSVG } from "qrcode.react";
import "../../styles.css";

interface QRCodeModalProps {
  qrModalVisible: boolean;
  setQrModalVisible: (visible: boolean) => void;
  address: string;
}

export function QRCodeModal({
  qrModalVisible,
  setQrModalVisible,
  address,
}: QRCodeModalProps) {
  const [addressCopied, setAddressCopied] = useState(false);

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
    <div
      className={`bg-blue-300 p-6 w-full flex justify-center right-full items-center rounded-lg mt-2 z-50 ${qrModalVisible ? "" : "hidden"}`}
    >
      <div className="flex flex-col items-center space-y-6 pt-6">
        {/* QR Code SVG*/}
        <div className="bg-white rounded-xl">
          <QRCodeSVG className="p-4" value={address} size={256} />
        </div>
        {/* Address display */}
        <div
          className="!rounded-xl flex gap-3 relative group hidden lg:block"
          onClick={() => copyToClipboard(address)}
        >
          <div className="cursor-pointer flex items-center font-medium bg-white rounded-lg text-lg p-2">
            {address}
          </div>
          <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
            {addressCopied == true
              ? "Address Copied!"
              : "Click to copy address"}
          </span>
        </div>

        {/* Button to close the modal */}
        <button className="text-white" onClick={() => setQrModalVisible(false)}>
          <div className="relative group">
            <XCircleIcon className="h-18 w-12 ml-2 sm:ml-0 stroke-[0.6] hover:scale-[1.1]" />
            <span className="bg-blue-300 rounded absolute text-white opacity-0 group-hover:opacity-100 whitespace-nowrap p-2 shadow-lg z-60">
              Click to close
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
