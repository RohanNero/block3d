import React, { useState, useEffect } from 'react';
import { ConnectButton, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useDisconnect, useAccount, WagmiProvider } from 'wagmi';
import { XCircleIcon, ArrowLeftOnRectangleIcon, CheckCircleIcon, DocumentDuplicateIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { QRCodeSVG } from 'qrcode.react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import '@rainbow-me/rainbowkit/styles.css';
import { createPublicClient, http, extractChain } from 'viem';
import * as chains from 'viem/chains';
import { getClient } from '@wagmi/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles.css';

function QRCodeModal({ qrModalVisible, setQrModalVisible, address, }) {
    const [addressCopied, setAddressCopied] = useState(false);
    const copyToClipboard = (text) => {
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
    return (React.createElement("div", { className: `bg-blue-300 p-6 w-full flex justify-center right-full items-center rounded-lg mt-2 z-50 ${qrModalVisible ? "" : "hidden"}` },
        React.createElement("div", { className: "flex flex-col items-center space-y-6 pt-6" },
            React.createElement("div", { className: "bg-white rounded-xl" },
                React.createElement(QRCodeSVG, { className: "p-4", value: address, size: 256 })),
            React.createElement("div", { className: "!rounded-xl flex gap-3 relative group hidden lg:block", onClick: () => copyToClipboard(address) },
                React.createElement("div", { className: "cursor-pointer flex items-center font-medium bg-white rounded-lg text-lg p-2" }, address),
                React.createElement("span", { className: "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" }, addressCopied == true
                    ? "Address Copied!"
                    : "Click to copy address")),
            React.createElement("button", { className: "text-white", onClick: () => setQrModalVisible(false) },
                React.createElement("div", { className: "relative group" },
                    React.createElement(XCircleIcon, { className: "h-18 w-12 ml-2 sm:ml-0 stroke-[0.6] hover:scale-[1.1]" }),
                    React.createElement("span", { className: "bg-blue-300 rounded absolute text-white opacity-0 group-hover:opacity-100 whitespace-nowrap p-2 shadow-lg z-60" }, "Click to close"))))));
}

/* Custom Wagmi Connect Button */
const Block3dConnectButton = () => {
    const { disconnect } = useDisconnect();
    const [addressCopied, setAddressCopied] = useState(false);
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const copyToClipboard = (text) => {
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
    return (React.createElement(ConnectButton.Custom, null, ({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        return (React.createElement(React.Fragment, null, (() => {
            // Not connected display
            if (!connected) {
                return (React.createElement("button", { className: "text-white bg-blue-300 rounded text-2xl w-full font-medium p-2", onClick: openConnectModal }, "Connect Wallet"));
            }
            // Chain not supported display
            if (chain.unsupported) {
                return (React.createElement("div", { className: "w-full flex flex-row gap-4 justify-evenly p-3 py-4" },
                    React.createElement("div", { className: "btn-sm bg-blue-300 text-white rounded-lg h-full text-lg flex items-center cursor-pointer" }, "Wrong Network"),
                    React.createElement("div", { className: "rounded-lg bg-blue-300 p-1 pr-2" },
                        React.createElement("button", { className: "menu-item text-white text-lg !rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] flex items-center", type: "button", onClick: () => disconnect() },
                            React.createElement(ArrowLeftOnRectangleIcon, { className: "h-9 w-6 ml-2 sm:ml-0" }),
                            "Disconnect"))));
            }
            // Connected to supported chain display
            return (React.createElement("div", { className: "w-full" },
                React.createElement("div", { className: "p-2 flex flex-row relative font-main justify-evenly gap-12 text-white text-xl" },
                    React.createElement("div", { className: "flex items-center cursor-pointer" },
                        "Connected to ", chain === null || chain === void 0 ? void 0 :
                        chain.name),
                    React.createElement("div", { className: "flex flex-row gap-1" },
                        React.createElement("div", { className: "hidden lg:block" }, addressCopied ? (React.createElement("div", { className: "!rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] relative group" },
                            React.createElement("div", { className: "whitespace-nowrap" }, account.displayName),
                            React.createElement(CheckCircleIcon, { className: "text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0", "aria-hidden": "true" }),
                            React.createElement("span", { className: "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" }, "Address Copied!"))) : (React.createElement("div", { className: "!rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] relative group", onClick: () => copyToClipboard(account.address) },
                            React.createElement("div", { className: "cursor-pointer flex items-center text-xl" }, account.displayName),
                            React.createElement(DocumentDuplicateIcon, { className: "text-xl font-normal h-9 w-6 cursor-pointer ml-2 sm:ml-0", "aria-hidden": "true" }),
                            React.createElement("span", { className: "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" }, "Click to copy address")))),
                        React.createElement("div", { className: "relative group hidden lg:block" },
                            React.createElement("button", { onClick: () => setQrModalVisible(true), className: "flex items-center gap-3 px-3 py-2 !rounded-xl hover:bg-[#9fcbfd]" },
                                React.createElement(QrCodeIcon, { className: "h-9 w-6 ml-2 sm:ml-0" })),
                            React.createElement("span", { className: "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" }, "View QR Code")),
                        React.createElement("div", { className: "relative group" },
                            React.createElement("button", { className: "menu-item text-[#fd9693] !rounded-xl flex gap-3 py-2 px-3 hover:bg-[#9fcbfd]", type: "button", onClick: () => disconnect() },
                                React.createElement(ArrowLeftOnRectangleIcon, { className: "h-9 w-6 ml-2 sm:ml-0" })),
                            React.createElement("span", { className: "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" }, "Disconnect")))),
                React.createElement(QRCodeModal, { setQrModalVisible: setQrModalVisible, qrModalVisible: qrModalVisible, address: account.address })));
        })()));
    }));
};

/* This is a nextui table containing a list of rules the user is failing/not meeting criteria for */
function Block3dTable({ userData }) {
    var _a, _b, _c, _d, _e, _f;
    /* Boolean representing whether or not the user is currently failing any token or nft rules (used to conditionally render `minimumBal`) */
    const hasTokenOrNftRules = ((_c = (_b = (_a = userData === null || userData === void 0 ? void 0 : userData.token) === null || _a === void 0 ? void 0 : _a.failing) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0 ||
        ((_f = (_e = (_d = userData === null || userData === void 0 ? void 0 : userData.nft) === null || _d === void 0 ? void 0 : _d.failing) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0) > 0;
    /* Creates the Table columns */
    const columns = [
        {
            key: "title",
            label: "Title",
        },
        /* Conditionally include the "Minimum Balance" column based on userData */
        ...(hasTokenOrNftRules
            ? [
                {
                    key: "minBalance",
                    label: "Minimum Balance",
                },
            ]
            : []),
        {
            key: "type",
            label: "Type",
        },
    ];
    /* Creates the Table rows */
    const getRows = () => {
        var _a, _b, _c;
        let rows = [];
        const allFailingRules = [
            ...(((_a = userData === null || userData === void 0 ? void 0 : userData.simple) === null || _a === void 0 ? void 0 : _a.failing) || []),
            ...(((_b = userData === null || userData === void 0 ? void 0 : userData.token) === null || _b === void 0 ? void 0 : _b.failing) || []),
            ...(((_c = userData === null || userData === void 0 ? void 0 : userData.nft) === null || _c === void 0 ? void 0 : _c.failing) || []),
        ];
        allFailingRules.forEach((rule, index) => {
            var _a, _b, _c;
            rows.push({
                key: index,
                title: formatTableData(rule.title),
                minBalance: rule.type === "simple"
                    ? "N/A"
                    : ((_b = (_a = rule.contracts) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.minimumBal)
                        ? formatTableData(rule.contracts[0].minimumBal)
                        : formatTableData((_c = rule.minimumBal) !== null && _c !== void 0 ? _c : ""),
                type: rule.type == "nft"
                    ? rule.type.toUpperCase()
                    : rule.type.charAt(0).toUpperCase() + rule.type.slice(1),
            });
        });
        return rows;
    };
    /* Manually truncates data if it is over 20 characters in length */
    const formatTableData = (data) => {
        if (data.length > 20) {
            const front = data.slice(0, 10);
            const back = data.slice(data.length - 10, data.length);
            return front + "..." + back;
        }
        else {
            return data;
        }
    };
    return (React.createElement(Table, { className: "w-1/2 text-2xl bg-blue-300 rounded-lg hidden lg:block", "aria-label": "Blocked reasons table" },
        React.createElement(TableHeader, { className: "px-4 mx-4", columns: columns }, (column) => (React.createElement(TableColumn, { className: "bg-gray-100 px-4 mx-4 border-blue-300 border-r-4 border-l-4 rounded-xl", key: column.key }, column.label))),
        React.createElement(TableBody, { items: getRows() }, (item) => (React.createElement(TableRow, { key: item.key }, (columnKey) => (React.createElement(TableCell, { className: "bg-gray-100 hover:bg-gray-200 px-4 mx-4 border-blue-300 border-r-4 border-l-4 border-b-4 border-t-4 rounded-xl" }, getKeyValue(item, columnKey))))))));
}

var img$1 = "data:image/png;base64,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";

var img = "data:image/png;base64,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";

/**
 * @dev This component is displayed to the user when they aren't able to view the page
 */
const Block3d = ({ userData }) => {
    var _a, _b, _c;
    /* Main display containing a table of all failing rules and a connect button */
    return (React.createElement("div", { className: "text-center font-main flex flex-col h-screen gap-2 items-center" },
        React.createElement("div", { className: "w-[51.5%] flex flex-row justify-between mt-[7%]" },
            React.createElement("div", { className: "flex flex-col " },
                React.createElement("div", { className: "flex flex-row h-4 mb-1 overflow-y-hidden" },
                    React.createElement("div", { className: "bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left hidden xl:block " }),
                    React.createElement("div", { className: "bg-blue-300 w-[65%] -ml-2 hidden xl:block" }),
                    React.createElement("div", { className: "bg-blue-300 rounded-br-lg rounded-tr-full w-[20%] transform -skew-y-12 origin-top-left hidden xl:block" })),
                React.createElement("div", null,
                    React.createElement("div", { className: "flex flex-row -ml-[.1rem]" },
                        React.createElement("div", { className: "p-4 px-8 bg-blue-300 border rounded-lg flex items-center hidden xl:block" },
                            React.createElement("div", { className: "rounded-full bg-gray-100" },
                                React.createElement("a", { target: "_blank", href: "https://block3d.gitbook.io/block3d" },
                                    React.createElement("img", { src: img$1, width: 100, height: 100, alt: "Block3d Logo" })))),
                        React.createElement("div", { className: "flex flex-col w-1/4" },
                            React.createElement("div", { className: "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block" }),
                            React.createElement("div", { className: "bg-blue-300 ml-1 -mt-2 h-4/5 hidden xl:block" }),
                            React.createElement("div", { className: "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block" }))))),
            React.createElement("div", { className: "flex flex-row h-3 mb-1 overflow-y-hidden place-self-end -mx-6 w-[10%] " },
                React.createElement("div", { className: "bg-blue-300 rounded-tl w-[30%] translate-y-1 -skew-y-12 origin-top-left hidden 2xl:block" }),
                React.createElement("div", { className: "bg-blue-300 w-[75%] -ml-1 rounded-tl-md hidden 2xl:block" }),
                React.createElement("div", { className: "bg-blue-300 rounded-tr-xl w-[30%] -skew-y-12 origin-top-left hidden 2xl:block" })),
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("div", { className: "flex flex-row h-4 mb-1 overflow-y-hidden" },
                    React.createElement("div", { className: "bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left " }),
                    React.createElement("div", { className: "bg-blue-300 w-[95%] -ml-6" }),
                    React.createElement("div", { className: "bg-blue-300 rounded-br-lg rounded-tr-full w-[14%] -skew-y-12 origin-top-left " })),
                React.createElement("div", null,
                    React.createElement("div", { className: "flex flex-row" },
                        React.createElement("div", { className: "p-4 px-8 py-[1.75rem] text-5xl text-white flex items-center bg-blue-300 border rounded-lg cursor-pointer" }, "Block3d"),
                        React.createElement("div", { className: "flex flex-col w-8" },
                            React.createElement("div", { className: "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left" }),
                            React.createElement("div", { className: "bg-blue-300 ml-1 -mt-2 h-4/5" }),
                            React.createElement("div", { className: "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left" }))))),
            React.createElement("div", { className: "flex flex-row h-3 mb-1 overflow-y-hidden place-self-end -mx-6 w-[10%]" },
                React.createElement("div", { className: "bg-blue-300 rounded-tl w-[30%] translate-y-1 -skew-y-12 origin-top-left hidden 2xl:block" }),
                React.createElement("div", { className: "bg-blue-300 w-[75%] -ml-1 rounded-tl-md hidden 2xl:block" }),
                React.createElement("div", { className: "bg-blue-300 rounded-tr-xl w-[30%] -skew-y-12 origin-top-left hidden 2xl:block" })),
            React.createElement("div", { className: "flex flex-col " },
                React.createElement("div", { className: "flex flex-row h-4 mb-1 overflow-y-hidden" },
                    React.createElement("div", { className: "bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left hidden xl:block" }),
                    React.createElement("div", { className: "bg-blue-300 w-[65%] -ml-2 hidden xl:block" }),
                    React.createElement("div", { className: "bg-blue-300 rounded-br-lg rounded-tr-full w-[20%] transform -skew-y-12 origin-top-left hidden xl:block" })),
                React.createElement("div", null,
                    React.createElement("div", { className: "flex flex-row" },
                        React.createElement("div", { className: "p-4 px-8 bg-blue-300 border rounded-lg hidden xl:block" },
                            React.createElement("a", { target: "_blank", href: "https://github.com/RohanNero/Block3d" },
                                React.createElement("img", { className: "scale=[1.25]", src: img, width: 100, height: 100, alt: "GitHub Logo" }))),
                        React.createElement("div", { className: "flex flex-col w-1/4" },
                            React.createElement("div", { className: "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block" }),
                            React.createElement("div", { className: "bg-blue-300 ml-1 -mt-2 h-4/5 hidden xl:block" }),
                            React.createElement("div", { className: "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block" })))))),
        (((_a = userData === null || userData === void 0 ? void 0 : userData.simple) === null || _a === void 0 ? void 0 : _a.failing) != undefined ||
            ((_b = userData === null || userData === void 0 ? void 0 : userData.token) === null || _b === void 0 ? void 0 : _b.failing) != undefined ||
            ((_c = userData === null || userData === void 0 ? void 0 : userData.nft) === null || _c === void 0 ? void 0 : _c.failing) != undefined) && (React.createElement("div", { className: "mt-1 flex flex-row w-full justify-center" },
            React.createElement(Block3dTable, { userData: userData }),
            React.createElement("div", { className: "flex flex-col w-8" },
                React.createElement("div", { className: "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden lg:block" }),
                React.createElement("div", { className: "bg-blue-300 ml-1 -mt-4 h-[85%] hidden lg:block" }),
                React.createElement("div", { className: "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden lg:block" })))),
        React.createElement("div", { className: "flex flex-row w-full justify-center mt-2 drop-shadow-xl" },
            React.createElement("div", { className: "bg-blue-300 flex rounded-lg w-[50.05%]" },
                React.createElement(Block3dConnectButton, null)),
            React.createElement("div", { className: "flex flex-col w-[2rem]" },
                React.createElement("div", { className: "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left" }),
                React.createElement("div", { className: "bg-blue-300 rounded-tl ml-1 -mt-[.35rem] h-[85%]" }),
                React.createElement("div", { className: "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left" })))));
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @param currentPath is the page the user is currently on
 * @return true if currentPath is listed in `publicRoutes` array in `block3d.config.ts`, false otherwise.
 */
function checkIsRoutePublic(currentPath, block3dConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        if (block3dConfig.publicRoutes.includes(currentPath)) {
            return true;
        }
        else {
            return false;
        }
    });
}

/**
 * @param address is the currently connected user address
 * @return `passing` is a Rule[] containing all simple rule checks the user passed
 * @return `failing` is a Rule[] containing all simple rule checks the user failed
 */
function checkSimpleRules(address, block3dConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        let passing = [];
        let failing = [];
        let simpleRules = block3dConfig.rules.filter((rule) => rule.type === "simple");
        simpleRules.forEach((rule) => {
            var _a;
            ((_a = rule.addresses) === null || _a === void 0 ? void 0 : _a.includes(address)) ? passing.push(rule) : failing.push(rule);
        });
        return { simplePassing: passing, simpleFailing: failing };
    });
}

/**
 * @dev This function views the wagmi config and retrieves any necessary provided RPC URLs, if none are provided we use the default values
 * @param rules is an array of valid rule types
 * @param wagmiConig is the current wagmi config object
 * @return `rpcUrls` is an KV object with chainIds mapped to RPC URLs
 */
function getRpcUrls(rules, wagmiConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        /* Step 1: Use Set to store only unique chainIds */
        const chainIds = new Set();
        rules.forEach((rule) => {
            if (rule.contracts) {
                rule === null || rule === void 0 ? void 0 : rule.contracts.forEach((contract) => {
                    chainIds.add(contract.chainId);
                });
            }
        });
        const chainIdsArray = Array.from(chainIds);
        /* Step 2: View RPC URLs and add them to KV object  */
        let rpcUrls = {};
        chainIdsArray.forEach((chainId) => __awaiter(this, void 0, void 0, function* () {
            const client = yield getClient(wagmiConfig, {
                chainId: chainId,
            });
            const url = client === null || client === void 0 ? void 0 : client.transport.url;
            if (url) {
                rpcUrls[chainId] = url;
            }
        }));
        /* Step 3: Return the KV object */
        return rpcUrls;
    });
}

const abi = [
    {
        constant: true,
        inputs: [
            {
                name: "_owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "balance",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
];

/**
 * @param address is the currently connected user address
 * @param block3dConfig is the block3d config object
 * @param wagmiConfig is the wagmi config object
 * @return `passing` is a Rule[] containing all token rule checks the user passed
 * @return `failing` is a Rule[] containing all token rule checks the user failed
 */
function checkTokenRules(address, block3dConfig, wagmiConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        let passing = [];
        let failing = [];
        const allChains = Object.values(chains);
        const validChainIds = allChains.map((chain) => chain.id);
        let tokenRules = block3dConfig.rules.filter((rule) => rule.type === "token");
        /* Remove invalid rules from the array */
        tokenRules = tokenRules
            .map((rule) => {
            var _a;
            /* Filter out invalid `Contract`s from the rule's `contracts` array */
            const validContracts = (_a = rule.contracts) === null || _a === void 0 ? void 0 : _a.filter((contract) => {
                var _a, _b;
                if (!validChainIds.includes(contract.chainId)) {
                    return false;
                }
                const minimumBal = parseFloat((_b = (_a = contract === null || contract === void 0 ? void 0 : contract.minimumBal) !== null && _a !== void 0 ? _a : rule === null || rule === void 0 ? void 0 : rule.minimumBal) !== null && _b !== void 0 ? _b : "0");
                return ((contract === null || contract === void 0 ? void 0 : contract.address) !== undefined &&
                    contract.address.length === 42 &&
                    minimumBal >= 1);
            });
            /* Return the rule with only valid `Contract` objects */
            return Object.assign(Object.assign({}, rule), { contracts: validContracts });
        })
            .filter((rule) => rule.contracts && rule.contracts.length > 0);
        const rpcUrls = yield getRpcUrls(tokenRules, wagmiConfig);
        /* Compare user balance to `minimumBal` from config and add to respective array (passing/failing) */
        for (const rule of tokenRules) {
            const strictRule = (_a = rule.strict) !== null && _a !== void 0 ? _a : false;
            let loopBroken = false;
            for (const contract of rule.contracts) {
                const minimumBal = (_c = (_b = contract.minimumBal) !== null && _b !== void 0 ? _b : rule.minimumBal) !== null && _c !== void 0 ? _c : "0";
                /* If a rule exists on a chain that doesn't have a transport url provided in the wagmi config, we use the default provided by the client */
                let publicClient;
                if (rpcUrls[contract.chainId]) {
                    publicClient = createPublicClient({
                        transport: http(rpcUrls[contract.chainId]),
                    });
                }
                else {
                    /* If there is no transport url, we need to use `extractChain` to create client with default RPC URL for that chain */
                    const chain = extractChain({
                        chains: allChains,
                        id: (_d = contract.chainId) !== null && _d !== void 0 ? _d : 1, // If chainId is undefined for some reason we use Ethereum Mainnet
                    });
                    publicClient = createPublicClient({
                        chain: chain,
                        transport: http(),
                    });
                }
                let balance;
                /* If contract address is address(0), we view native currency balance */
                if (contract.address === "0x0000000000000000000000000000000000000000") {
                    balance = yield publicClient.getBalance({
                        address: address,
                    });
                }
                else {
                    balance = yield publicClient.readContract({
                        address: contract.address,
                        abi: abi,
                        functionName: "balanceOf",
                        args: [address],
                    });
                }
                const minimumBalNumber = parseFloat(minimumBal);
                const balanceNumber = parseFloat(balance);
                /* If minimum balance is more than user's actual balance, and ruleset is strict, we push the rule to failing array */
                if (minimumBalNumber > balanceNumber && strictRule === true) {
                    failing.push(rule);
                    loopBroken = true;
                    break;
                }
                /* If minimum balance is less than user's actual balance, and ruleset is not strict, we push the rule to passing array */
                if (minimumBalNumber <= balanceNumber && strictRule === false) {
                    passing.push(rule);
                    loopBroken = true;
                    break;
                }
            }
            /* If the loop wasn't broken and reaches this code, either
             * 1. rule type is strict and user had enough tokens
             * 2. rule type isn't strict and user didn't have enough tokens
             */
            if (strictRule === false && loopBroken === false) {
                failing.push(rule);
            }
            else if (strictRule === true && loopBroken === false) {
                passing.push(rule);
            }
            loopBroken = false;
        }
        return { tokenPassing: passing, tokenFailing: failing };
    });
}

/**
 * @param address is the currently connected user address
 * @param block3dConfig is the block3d config object
 * @param wagmiConfig is the wagmi config object
 * @return `passing` is a Rule[] containing all nft rule checks the user passed
 * @return `failing` is a Rule[] containing all nft rule checks the user failed
 */
function checkNftRules(address, block3dConfig, wagmiConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        let passing = [];
        let failing = [];
        const allChains = Object.values(chains);
        const validChainIds = allChains.map((chain) => chain.id);
        let nftRules = block3dConfig.rules.filter((rule) => rule.type === "nft");
        /* Remove invalid rules from the array */
        nftRules = nftRules
            .map((rule) => {
            var _a;
            /* Filter out invalid `Contract`s from the rule's `contracts` array */
            const validContracts = (_a = rule.contracts) === null || _a === void 0 ? void 0 : _a.filter((contract) => {
                var _a, _b;
                if (!validChainIds.includes(contract.chainId)) {
                    return false;
                }
                const minimumBal = parseFloat((_b = (_a = contract === null || contract === void 0 ? void 0 : contract.minimumBal) !== null && _a !== void 0 ? _a : rule === null || rule === void 0 ? void 0 : rule.minimumBal) !== null && _b !== void 0 ? _b : "0");
                return ((contract === null || contract === void 0 ? void 0 : contract.address) !== undefined &&
                    contract.address.length === 42 &&
                    minimumBal >= 1);
            });
            /* Return the rule with only valid `Contract` objects */
            return Object.assign(Object.assign({}, rule), { contracts: validContracts });
        })
            .filter((rule) => rule.contracts && rule.contracts.length > 0);
        const rpcUrls = yield getRpcUrls(nftRules, wagmiConfig);
        /* Compare user balance to `minimumBal` from config and add to respective array (passing/failing) */
        for (const rule of nftRules) {
            const strictRule = (_a = rule.strict) !== null && _a !== void 0 ? _a : false;
            let loopBroken = false;
            for (const contract of rule.contracts) {
                const minimumBal = (_c = (_b = contract.minimumBal) !== null && _b !== void 0 ? _b : rule.minimumBal) !== null && _c !== void 0 ? _c : "0";
                /* If a rule exists on a chain that doesn't have a transport url provided in the wagmi config, we use the default provided by the client */
                let publicClient;
                if (rpcUrls[contract.chainId]) {
                    publicClient = createPublicClient({
                        transport: http(rpcUrls[contract.chainId]),
                    });
                }
                else {
                    /* If there is no transport url, we need to use `extractChain` to create client with default RPC URL for that chain */
                    const chain = extractChain({
                        chains: allChains,
                        id: (_d = contract.chainId) !== null && _d !== void 0 ? _d : 1, // If chainId is undefined for some reason we use Ethereum Mainnet
                    });
                    publicClient = createPublicClient({
                        chain: chain,
                        transport: http(),
                    });
                }
                /* Make the `balanceOf()` function call */
                const balance = yield publicClient.readContract({
                    address: contract.address,
                    abi: abi,
                    functionName: "balanceOf",
                    args: [address],
                });
                const minimumBalNumber = parseFloat(minimumBal);
                const balanceNumber = parseFloat(balance);
                /* If minimum balance is more than user's actual balance, and ruleset is strict, we push the rule to failing array */
                if (minimumBalNumber > balanceNumber && strictRule === true) {
                    failing.push(rule);
                    loopBroken = true;
                    break;
                }
                /* If minimum balance is less than user's actual balance, and ruleset is not strict, we push the rule to passing array */
                if (minimumBalNumber <= balanceNumber && strictRule === false) {
                    passing.push(rule);
                    loopBroken = true;
                    break;
                }
            }
            /* If the loop wasn't broken and reaches this code, either
             * 1. rule type is strict and user had enough nfts
             * 2. rule type isn't strict and user didn't have enough nfts
             */
            if (strictRule === false && loopBroken === false) {
                failing.push(rule);
            }
            else if (strictRule === true && loopBroken === false) {
                passing.push(rule);
            }
            loopBroken = false;
        }
        return { nftPassing: passing, nftFailing: failing };
    });
}

/* Contains page restriction checks */
const checkBlock3d = (address, chain, currentPath, block3dConfig, config) => __awaiter(void 0, void 0, void 0, function* () {
    /* Check if config file was loaded correctly */
    if (config === undefined || block3dConfig === undefined) {
        console.log("Block3d Config is undefined.");
        return { block3d: true, userData: undefined };
    }
    /* Check if the current route is public */
    const isPublic = yield checkIsRoutePublic(currentPath, block3dConfig);
    if (isPublic === true) {
        console.log("Current route is public.");
        return { block3d: false, userData: undefined };
    }
    /* If address or chain are undefined, we must return since utility functions depend on them */
    if (address === undefined || chain === undefined) {
        console.log("Address or Chain is undefined!");
        return { block3d: true, userData: undefined };
    }
    const { simplePassing, simpleFailing } = yield checkSimpleRules(address, block3dConfig);
    const { tokenPassing, tokenFailing } = yield checkTokenRules(address, block3dConfig, config);
    const { nftPassing, nftFailing } = yield checkNftRules(address, block3dConfig, config);
    const userData = {
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
    if (block3dConfig.strict === true &&
        ((simpleFailing === null || simpleFailing === void 0 ? void 0 : simpleFailing.length) ? simpleFailing.length : 0) > 0) {
        return { block3d: true, userData: userData };
    }
    /* If any simple rule checks passed and strict is set to false, we return block3d and userData */
    if (block3dConfig.strict === false &&
        ((simplePassing === null || simplePassing === void 0 ? void 0 : simplePassing.length) ? simplePassing.length : 0) > 0) {
        return { block3d: false, userData: userData };
    }
    /* Token rule type checks
      If any token rule checks failed and strict is set to true, we return block3d and userData */
    if (block3dConfig.strict === true &&
        ((tokenFailing === null || tokenFailing === void 0 ? void 0 : tokenFailing.length) ? tokenFailing.length : 0) > 0) {
        return { block3d: true, userData: userData };
    }
    /* If any token rule checks passed and strict is set to false, we return block3d and userData */
    if (block3dConfig.strict === false &&
        ((tokenPassing === null || tokenPassing === void 0 ? void 0 : tokenPassing.length) ? tokenPassing.length : 0) > 0) {
        return { block3d: false, userData: userData };
    }
    /* Nft rule type checks
      If any nft rule checks failed and strict is set to true, we return block3d and userData */
    if (block3dConfig.strict === true &&
        ((nftFailing === null || nftFailing === void 0 ? void 0 : nftFailing.length) ? nftFailing.length : 0) > 0) {
        return { block3d: true, userData: userData };
    }
    /* If any nft rule checks passed and strict is set to false, we return block3d and userData */
    if (block3dConfig.strict === false &&
        ((nftPassing === null || nftPassing === void 0 ? void 0 : nftPassing.length) ? nftPassing.length : 0) > 0) {
        return { block3d: false, userData: userData };
    }
    /* If you reach the end of this function it means one of two things
     * 1. strict rules are enabled and the user passed all of them
     * 2. strict rules are disabeld and the user didn't pass any of them
     */
    if (block3dConfig.strict === true) {
        return { block3d: false, userData: userData };
    }
    else {
        return { block3d: true, userData: userData };
    }
});

/**
 * @dev This is the core hook that determines whether a user can view a page or not
 * @returns isBlock3d - a boolean value that when true, means the user is blocked from viewing the page
 * @returns userData - an object containing the user's address and 3 sub objects for each rule type (simple, token, nft)
 * These sub-objects each contain two `Rule` arrays, one for passing and one for failing rules
 */
function useBlock3r(block3dConfig, wagmiConfig) {
    const [userData, setUserData] = useState(undefined);
    const [block3d, setBlock3d] = useState(true);
    const { address, chain } = useAccount();
    useEffect(() => {
        const checkAccess = () => __awaiter(this, void 0, void 0, function* () {
            if (window.location.pathname) {
                console.log("Validating user...");
                const { block3d, userData } = yield checkBlock3d(address, chain === null || chain === void 0 ? void 0 : chain.id, window.location.pathname, block3dConfig, wagmiConfig);
                setBlock3d(block3d);
                setUserData(userData);
            }
        });
        checkAccess();
    }, [chain, address, window.location.pathname, block3dConfig]);
    return { isBlock3d: block3d, userData: userData };
}

/**
 * @dev This component handles displaying the <Block3d/> component vs the actual page depending on the `isBlock3d` boolean value
 */
function Block3rContent({ children, block3dConfig, wagmiConfig, }) {
    const { isBlock3d, userData } = useBlock3r(block3dConfig, wagmiConfig);
    console.log("Block3rContent:", isBlock3d, userData);
    if (isBlock3d) {
        return React.createElement(Block3d, { userData: userData });
    }
    else {
        return React.createElement("div", null, children);
    }
}

const queryClient = new QueryClient();
/**
 * @dev This wraps the entire site much like clerk's `ClerkProvider` component
 * 1. Should include Rainbow kit provider and wagmi config objects that currently wrap our site.
 * 2. Should get the user's address, (undefined if not connected), then compare it to our config ruleset
 * 3. Start with `simple` restriction type and move onto `token` after it is functional
 */
function Block3r({ children, wagmiConfig, block3dConfig, }) {
    return (React.createElement(WagmiProvider, { config: wagmiConfig },
        React.createElement(QueryClientProvider, { client: queryClient },
            React.createElement(RainbowKitProvider, null,
                React.createElement(Block3rContent, { block3dConfig: block3dConfig, wagmiConfig: wagmiConfig }, children)))));
}

export { Block3dConnectButton, Block3r, Block3rContent, QRCodeModal, checkBlock3d, checkIsRoutePublic, checkNftRules, checkSimpleRules, checkTokenRules, getRpcUrls, useBlock3r };
//# sourceMappingURL=index.js.map
