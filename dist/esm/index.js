import e, { useState as t, useEffect as l } from "react";
import n from "next/image";
import {
  ConnectButton as a,
  RainbowKitProvider as r,
} from "@rainbow-me/rainbowkit";
import { useDisconnect as o, useAccount as i, WagmiProvider as s } from "wagmi";
import {
  XCircleIcon as c,
  ArrowLeftOnRectangleIcon as d,
  CheckCircleIcon as m,
  DocumentDuplicateIcon as u,
  QrCodeIcon as f,
} from "@heroicons/react/24/outline";
import { QRCodeSVG as p } from "qrcode.react";
import {
  Table as b,
  TableHeader as g,
  TableColumn as v,
  TableBody as h,
  TableRow as x,
  TableCell as w,
  getKeyValue as E,
} from "@nextui-org/react";
import "@rainbow-me/rainbowkit/styles.css";
import { usePathname as y } from "next/navigation";
import { createPublicClient as N, http as k, extractChain as C } from "viem";
import * as B from "viem/chains";
import { getClient as j } from "@wagmi/core";
import {
  QueryClient as F,
  QueryClientProvider as O,
} from "@tanstack/react-query";
import "../styles.css";
function I({ qrModalVisible: l, setQrModalVisible: n, address: a }) {
  const [r, o] = t(!1);
  return e.createElement(
    "div",
    {
      className:
        "bg-blue-300 p-6 w-full flex justify-center right-full items-center rounded-lg mt-2 z-50 " +
        (l ? "" : "hidden"),
    },
    e.createElement(
      "div",
      { className: "flex flex-col items-center space-y-6 pt-6" },
      e.createElement(
        "div",
        { className: "bg-white rounded-xl" },
        e.createElement(p, { className: "p-4", value: a, size: 256 })
      ),
      e.createElement(
        "div",
        {
          className: "!rounded-xl flex gap-3 relative group hidden lg:block",
          onClick: () => {
            return (
              (e = a),
              void navigator.clipboard
                .writeText(e)
                .then(() => {
                  o(!0),
                    setTimeout(() => {
                      o(!1);
                    }, 800);
                })
                .catch((e) => {
                  console.error("Failed to copy:", e);
                })
            );
            var e;
          },
        },
        e.createElement(
          "div",
          {
            className:
              "cursor-pointer flex items-center font-medium bg-white rounded-lg text-lg p-2",
          },
          a
        ),
        e.createElement(
          "span",
          {
            className:
              "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20",
          },
          1 == r ? "Address Copied!" : "Click to copy address"
        )
      ),
      e.createElement(
        "button",
        { className: "text-white", onClick: () => n(!1) },
        e.createElement(
          "div",
          { className: "relative group" },
          e.createElement(c, {
            className: "h-18 w-12 ml-2 sm:ml-0 stroke-[0.6] hover:scale-[1.1]",
          }),
          e.createElement(
            "span",
            {
              className:
                "bg-blue-300 rounded absolute text-white opacity-0 group-hover:opacity-100 whitespace-nowrap p-2 shadow-lg z-60",
            },
            "Click to close"
          )
        )
      )
    )
  );
}
const z = () => {
  const { disconnect: l } = o(),
    [n, r] = t(!1),
    [i, s] = t(!1);
  return e.createElement(
    a.Custom,
    null,
    ({ account: t, chain: a, openConnectModal: o, mounted: c }) => {
      const p = c && t && a;
      return e.createElement(
        e.Fragment,
        null,
        p
          ? a.unsupported
            ? e.createElement(
                "div",
                {
                  className:
                    "w-full flex flex-row gap-4 justify-evenly p-3 py-4",
                },
                e.createElement(
                  "div",
                  {
                    className:
                      "btn-sm bg-blue-300 text-white rounded-lg h-full text-lg flex items-center cursor-pointer",
                  },
                  "Wrong Network"
                ),
                e.createElement(
                  "div",
                  { className: "rounded-lg bg-blue-300 p-1 pr-2" },
                  e.createElement(
                    "button",
                    {
                      className:
                        "menu-item text-white text-lg !rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] flex items-center",
                      type: "button",
                      onClick: () => l(),
                    },
                    e.createElement(d, { className: "h-9 w-6 ml-2 sm:ml-0" }),
                    "Disconnect"
                  )
                )
              )
            : e.createElement(
                "div",
                { className: "w-full" },
                e.createElement(
                  "div",
                  {
                    className:
                      "p-2 flex flex-row relative font-main justify-evenly gap-12 text-white text-xl",
                  },
                  e.createElement(
                    "div",
                    { className: "flex items-center cursor-pointer" },
                    "Connected to ",
                    null == a ? void 0 : a.name
                  ),
                  e.createElement(
                    "div",
                    { className: "flex flex-row gap-1" },
                    e.createElement(
                      "div",
                      { className: "hidden lg:block" },
                      n
                        ? e.createElement(
                            "div",
                            {
                              className:
                                "!rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] relative group",
                            },
                            e.createElement(
                              "div",
                              { className: "whitespace-nowrap" },
                              t.displayName
                            ),
                            e.createElement(m, {
                              className:
                                "text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0",
                              "aria-hidden": "true",
                            }),
                            e.createElement(
                              "span",
                              {
                                className:
                                  "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20",
                              },
                              "Address Copied!"
                            )
                          )
                        : e.createElement(
                            "div",
                            {
                              className:
                                "!rounded-xl flex gap-3 p-2 hover:bg-[#9fcbfd] relative group",
                              onClick: () => {
                                return (
                                  (e = t.address),
                                  void navigator.clipboard
                                    .writeText(e)
                                    .then(() => {
                                      r(!0),
                                        setTimeout(() => {
                                          r(!1);
                                        }, 800);
                                    })
                                    .catch((e) => {
                                      console.error("Failed to copy:", e);
                                    })
                                );
                                var e;
                              },
                            },
                            e.createElement(
                              "div",
                              {
                                className:
                                  "cursor-pointer flex items-center text-xl",
                              },
                              t.displayName
                            ),
                            e.createElement(u, {
                              className:
                                "text-xl font-normal h-9 w-6 cursor-pointer ml-2 sm:ml-0",
                              "aria-hidden": "true",
                            }),
                            e.createElement(
                              "span",
                              {
                                className:
                                  "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20",
                              },
                              "Click to copy address"
                            )
                          )
                    ),
                    e.createElement(
                      "div",
                      { className: "relative group hidden lg:block" },
                      e.createElement(
                        "button",
                        {
                          onClick: () => s(!0),
                          className:
                            "flex items-center gap-3 px-3 py-2 !rounded-xl hover:bg-[#9fcbfd]",
                        },
                        e.createElement(f, {
                          className: "h-9 w-6 ml-2 sm:ml-0",
                        })
                      ),
                      e.createElement(
                        "span",
                        {
                          className:
                            "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20",
                        },
                        "View QR Code"
                      )
                    ),
                    e.createElement(
                      "div",
                      { className: "relative group" },
                      e.createElement(
                        "button",
                        {
                          className:
                            "menu-item text-[#fd9693] !rounded-xl flex gap-3 py-2 px-3 hover:bg-[#9fcbfd]",
                          type: "button",
                          onClick: () => l(),
                        },
                        e.createElement(d, {
                          className: "h-9 w-6 ml-2 sm:ml-0",
                        })
                      ),
                      e.createElement(
                        "span",
                        {
                          className:
                            "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20",
                        },
                        "Disconnect"
                      )
                    )
                  )
                ),
                e.createElement(I, {
                  setQrModalVisible: s,
                  qrModalVisible: i,
                  address: t.address,
                })
              )
          : e.createElement(
              "button",
              {
                className:
                  "text-white bg-blue-300 rounded text-2xl w-full font-medium p-2",
                onClick: o,
              },
              "Connect Wallet"
            )
      );
    }
  );
};
function D({ userData: t }) {
  var l, n, a, r, o, i;
  const s = [
      { key: "title", label: "Title" },
      ...((null !==
        (a =
          null ===
            (n =
              null === (l = null == t ? void 0 : t.token) || void 0 === l
                ? void 0
                : l.failing) || void 0 === n
            ? void 0
            : n.length) && void 0 !== a
        ? a
        : 0) > 0 ||
      (null !==
        (i =
          null ===
            (o =
              null === (r = null == t ? void 0 : t.nft) || void 0 === r
                ? void 0
                : r.failing) || void 0 === o
            ? void 0
            : o.length) && void 0 !== i
        ? i
        : 0) > 0
        ? [{ key: "minBalance", label: "Minimum Balance" }]
        : []),
      { key: "type", label: "Type" },
    ],
    c = (e) => {
      if (e.length > 20) {
        return e.slice(0, 10) + "..." + e.slice(e.length - 10, e.length);
      }
      return e;
    };
  return e.createElement(
    b,
    {
      className: "w-1/2 text-2xl bg-blue-300 rounded-lg hidden lg:block",
      "aria-label": "Blocked reasons table",
    },
    e.createElement(g, { className: "px-4 mx-4", columns: s }, (t) =>
      e.createElement(
        v,
        {
          className:
            "bg-gray-100 px-4 mx-4 border-blue-300 border-r-4 border-l-4 rounded-xl",
          key: t.key,
        },
        t.label
      )
    ),
    e.createElement(
      h,
      {
        items: (() => {
          var e, l, n;
          let a = [];
          return (
            [
              ...((null === (e = null == t ? void 0 : t.simple) || void 0 === e
                ? void 0
                : e.failing) || []),
              ...((null === (l = null == t ? void 0 : t.token) || void 0 === l
                ? void 0
                : l.failing) || []),
              ...((null === (n = null == t ? void 0 : t.nft) || void 0 === n
                ? void 0
                : n.failing) || []),
            ].forEach((e, t) => {
              var l, n, r;
              a.push({
                key: t,
                title: c(e.title),
                minBalance:
                  "simple" === e.type
                    ? "N/A"
                    : (
                          null ===
                            (n =
                              null === (l = e.contracts) || void 0 === l
                                ? void 0
                                : l[0]) || void 0 === n
                            ? void 0
                            : n.minimumBal
                        )
                      ? c(e.contracts[0].minimumBal)
                      : c(null !== (r = e.minimumBal) && void 0 !== r ? r : ""),
                type:
                  "nft" == e.type
                    ? e.type.toUpperCase()
                    : e.type.charAt(0).toUpperCase() + e.type.slice(1),
              });
            }),
            a
          );
        })(),
      },
      (t) =>
        e.createElement(x, { key: t.key }, (l) =>
          e.createElement(
            w,
            {
              className:
                "bg-gray-100 hover:bg-gray-200 px-4 mx-4 border-blue-300 border-r-4 border-l-4 border-b-4 border-t-4 rounded-xl",
            },
            E(t, l)
          )
        )
    )
  );
}
const M = require("../../public/logo.png"),
  P = require("../../public/github-mark-white.png"),
  q = ({ userData: t }) => {
    var l, a, r;
    return e.createElement(
      "div",
      {
        className:
          "text-center font-main flex flex-col h-screen gap-2 items-center",
      },
      e.createElement(
        "div",
        { className: "w-[51.5%] flex flex-row justify-between mt-[7%]" },
        e.createElement(
          "div",
          { className: "flex flex-col " },
          e.createElement(
            "div",
            { className: "flex flex-row h-4 mb-1 overflow-y-hidden" },
            e.createElement("div", {
              className:
                "bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left hidden xl:block ",
            }),
            e.createElement("div", {
              className: "bg-blue-300 w-[65%] -ml-2 hidden xl:block",
            }),
            e.createElement("div", {
              className:
                "bg-blue-300 rounded-br-lg rounded-tr-full w-[20%] transform -skew-y-12 origin-top-left hidden xl:block",
            })
          ),
          e.createElement(
            "div",
            null,
            e.createElement(
              "div",
              { className: "flex flex-row -ml-[.1rem]" },
              e.createElement(
                "div",
                {
                  className:
                    "p-4 px-8 bg-blue-300 border rounded-lg flex items-center hidden xl:block",
                },
                e.createElement(
                  "div",
                  { className: "rounded-full bg-gray-100" },
                  e.createElement(
                    "a",
                    {
                      target: "_blank",
                      href: "https://block3d.gitbook.io/block3d",
                    },
                    e.createElement(n, {
                      src: M,
                      width: 100,
                      height: 100,
                      alt: "Block3d Logo",
                    })
                  )
                )
              ),
              e.createElement(
                "div",
                { className: "flex flex-col w-1/4" },
                e.createElement("div", {
                  className:
                    "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block",
                }),
                e.createElement("div", {
                  className: "bg-blue-300 ml-1 -mt-2 h-4/5 hidden xl:block",
                }),
                e.createElement("div", {
                  className:
                    "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block",
                })
              )
            )
          )
        ),
        e.createElement(
          "div",
          {
            className:
              "flex flex-row h-3 mb-1 overflow-y-hidden place-self-end -mx-6 w-[10%] ",
          },
          e.createElement("div", {
            className:
              "bg-blue-300 rounded-tl w-[30%] translate-y-1 -skew-y-12 origin-top-left hidden 2xl:block",
          }),
          e.createElement("div", {
            className:
              "bg-blue-300 w-[75%] -ml-1 rounded-tl-md hidden 2xl:block",
          }),
          e.createElement("div", {
            className:
              "bg-blue-300 rounded-tr-xl w-[30%] -skew-y-12 origin-top-left hidden 2xl:block",
          })
        ),
        e.createElement(
          "div",
          { className: "flex flex-col" },
          e.createElement(
            "div",
            { className: "flex flex-row h-4 mb-1 overflow-y-hidden" },
            e.createElement("div", {
              className:
                "bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left ",
            }),
            e.createElement("div", { className: "bg-blue-300 w-[95%] -ml-6" }),
            e.createElement("div", {
              className:
                "bg-blue-300 rounded-br-lg rounded-tr-full w-[14%] -skew-y-12 origin-top-left ",
            })
          ),
          e.createElement(
            "div",
            null,
            e.createElement(
              "div",
              { className: "flex flex-row" },
              e.createElement(
                "div",
                {
                  className:
                    "p-4 px-8 py-[1.75rem] text-5xl text-white flex items-center bg-blue-300 border rounded-lg cursor-pointer",
                },
                "Block3d"
              ),
              e.createElement(
                "div",
                { className: "flex flex-col w-8" },
                e.createElement("div", {
                  className:
                    "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left",
                }),
                e.createElement("div", {
                  className: "bg-blue-300 ml-1 -mt-2 h-4/5",
                }),
                e.createElement("div", {
                  className:
                    "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left",
                })
              )
            )
          )
        ),
        e.createElement(
          "div",
          {
            className:
              "flex flex-row h-3 mb-1 overflow-y-hidden place-self-end -mx-6 w-[10%]",
          },
          e.createElement("div", {
            className:
              "bg-blue-300 rounded-tl w-[30%] translate-y-1 -skew-y-12 origin-top-left hidden 2xl:block",
          }),
          e.createElement("div", {
            className:
              "bg-blue-300 w-[75%] -ml-1 rounded-tl-md hidden 2xl:block",
          }),
          e.createElement("div", {
            className:
              "bg-blue-300 rounded-tr-xl w-[30%] -skew-y-12 origin-top-left hidden 2xl:block",
          })
        ),
        e.createElement(
          "div",
          { className: "flex flex-col " },
          e.createElement(
            "div",
            { className: "flex flex-row h-4 mb-1 overflow-y-hidden" },
            e.createElement("div", {
              className:
                "bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left hidden xl:block",
            }),
            e.createElement("div", {
              className: "bg-blue-300 w-[65%] -ml-2 hidden xl:block",
            }),
            e.createElement("div", {
              className:
                "bg-blue-300 rounded-br-lg rounded-tr-full w-[20%] transform -skew-y-12 origin-top-left hidden xl:block",
            })
          ),
          e.createElement(
            "div",
            null,
            e.createElement(
              "div",
              { className: "flex flex-row" },
              e.createElement(
                "div",
                {
                  className:
                    "p-4 px-8 bg-blue-300 border rounded-lg hidden xl:block",
                },
                e.createElement(
                  "a",
                  {
                    target: "_blank",
                    href: "https://github.com/RohanNero/Block3d",
                  },
                  e.createElement(n, {
                    className: "scale=[1.25]",
                    src: P,
                    width: 100,
                    height: 100,
                    alt: "GitHub Logo",
                  })
                )
              ),
              e.createElement(
                "div",
                { className: "flex flex-col w-1/4" },
                e.createElement("div", {
                  className:
                    "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block",
                }),
                e.createElement("div", {
                  className: "bg-blue-300 ml-1 -mt-2 h-4/5 hidden xl:block",
                }),
                e.createElement("div", {
                  className:
                    "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block",
                })
              )
            )
          )
        )
      ),
      (null !=
        (null === (l = null == t ? void 0 : t.simple) || void 0 === l
          ? void 0
          : l.failing) ||
        null !=
          (null === (a = null == t ? void 0 : t.token) || void 0 === a
            ? void 0
            : a.failing) ||
        null !=
          (null === (r = null == t ? void 0 : t.nft) || void 0 === r
            ? void 0
            : r.failing)) &&
        e.createElement(
          "div",
          { className: "mt-1 flex flex-row w-full justify-center" },
          e.createElement(D, { userData: t }),
          e.createElement(
            "div",
            { className: "flex flex-col w-8" },
            e.createElement("div", {
              className:
                "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden lg:block",
            }),
            e.createElement("div", {
              className: "bg-blue-300 ml-1 -mt-4 h-[85%] hidden lg:block",
            }),
            e.createElement("div", {
              className:
                "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden lg:block",
            })
          )
        ),
      e.createElement(
        "div",
        {
          className: "flex flex-row w-full justify-center mt-2 drop-shadow-xl",
        },
        e.createElement(
          "div",
          { className: "bg-blue-300 flex rounded-lg w-[50.05%]" },
          e.createElement(z, null)
        ),
        e.createElement(
          "div",
          { className: "flex flex-col w-[2rem]" },
          e.createElement("div", {
            className:
              "bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left",
          }),
          e.createElement("div", {
            className: "bg-blue-300 rounded-tl ml-1 -mt-[.35rem] h-[85%]",
          }),
          e.createElement("div", {
            className:
              "bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left",
          })
        )
      )
    );
  };
function A(e, t, l, n) {
  return new (l || (l = Promise))(function (a, r) {
    function o(e) {
      try {
        s(n.next(e));
      } catch (e) {
        r(e);
      }
    }
    function i(e) {
      try {
        s(n.throw(e));
      } catch (e) {
        r(e);
      }
    }
    function s(e) {
      var t;
      e.done
        ? a(e.value)
        : ((t = e.value),
          t instanceof l
            ? t
            : new l(function (e) {
                e(t);
              })).then(o, i);
    }
    s((n = n.apply(e, t || [])).next());
  });
}
function T(e, t) {
  return A(this, void 0, void 0, function* () {
    return t.publicRoutes.includes(e)
      ? (console.log("Current page is public!"), !0)
      : (console.log("Current page is not public!"), !1);
  });
}
function V(e, t) {
  return A(this, void 0, void 0, function* () {
    let l = [],
      n = [];
    return (
      t.rules
        .filter((e) => "simple" === e.type)
        .forEach((t) => {
          var a;
          (null === (a = t.addresses) || void 0 === a ? void 0 : a.includes(e))
            ? l.push(t)
            : n.push(t);
        }),
      { simplePassing: l, simpleFailing: n }
    );
  });
}
function S(e, t) {
  return A(this, void 0, void 0, function* () {
    const l = new Set();
    e.forEach((e) => {
      e.contracts &&
        (null == e ||
          e.contracts.forEach((e) => {
            l.add(e.chainId);
          }));
    });
    const n = Array.from(l);
    let a = {};
    return (
      n.forEach((e) =>
        A(this, void 0, void 0, function* () {
          const l = yield j(t, { chainId: e }),
            n = null == l ? void 0 : l.transport.url;
          n && (a[e] = n);
        })
      ),
      a
    );
  });
}
"function" == typeof SuppressedError && SuppressedError;
const Q = [
  {
    constant: !0,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
];
function R(e, t, l) {
  return A(this, void 0, void 0, function* () {
    var n, a, r, o;
    let i = [],
      s = [];
    const c = Object.values(B),
      d = c.map((e) => e.id);
    let m = t.rules.filter((e) => "token" === e.type);
    m = m
      .map((e) => {
        var t;
        const l =
          null === (t = e.contracts) || void 0 === t
            ? void 0
            : t.filter((t) => {
                var l, n;
                if (!d.includes(t.chainId)) return !1;
                const a = parseFloat(
                  null !==
                    (n =
                      null !== (l = null == t ? void 0 : t.minimumBal) &&
                      void 0 !== l
                        ? l
                        : null == e
                          ? void 0
                          : e.minimumBal) && void 0 !== n
                    ? n
                    : "0"
                );
                return (
                  void 0 !== (null == t ? void 0 : t.address) &&
                  42 === t.address.length &&
                  a >= 1
                );
              });
        return Object.assign(Object.assign({}, e), { contracts: l });
      })
      .filter((e) => e.contracts && e.contracts.length > 0);
    const u = yield S(m, l);
    for (const t of m) {
      const l = null !== (n = t.strict) && void 0 !== n && n;
      let d = !1;
      for (const n of t.contracts) {
        const m =
          null !==
            (r =
              null !== (a = n.minimumBal) && void 0 !== a ? a : t.minimumBal) &&
          void 0 !== r
            ? r
            : "0";
        let f, p;
        if (u[n.chainId]) f = N({ transport: k(u[n.chainId]) });
        else {
          const e = C({
            chains: c,
            id: null !== (o = n.chainId) && void 0 !== o ? o : 1,
          });
          f = N({ chain: e, transport: k() });
        }
        p =
          "0x0000000000000000000000000000000000000000" === n.address
            ? yield f.getBalance({ address: e })
            : yield f.readContract({
                address: n.address,
                abi: Q,
                functionName: "balanceOf",
                args: [e],
              });
        const b = parseFloat(m),
          g = parseFloat(p);
        if (b > g && !0 === l) {
          s.push(t), (d = !0);
          break;
        }
        if (b <= g && !1 === l) {
          i.push(t), (d = !0);
          break;
        }
      }
      !1 === l && !1 === d ? s.push(t) : !0 === l && !1 === d && i.push(t),
        (d = !1);
    }
    return { tokenPassing: i, tokenFailing: s };
  });
}
function _(e, n) {
  const [a, r] = t(void 0),
    [o, s] = t(!0),
    { address: c, chain: d } = i(),
    m = y();
  l(() => {
    console.log("account:", c), console.log("block3dConfig:", e), u(e, n);
  }, [d, c, m, e]);
  const u = (t, l) =>
    A(this, void 0, void 0, function* () {
      if (
        (r((e) => {
          var t;
          return Object.assign(Object.assign({}, e), {
            address:
              null !== (t = null == c ? void 0 : c.toString()) && void 0 !== t
                ? t
                : "",
          });
        }),
        void 0 === t)
      )
        return s(!1), void console.log("Block3d Config is undefined.");
      if (!0 === (yield T(m, t)))
        return s(!1), void console.log("Current route is public.");
      if (void 0 === c || void 0 === d)
        return void console.log("Address or Chain is undefined!");
      const { simplePassing: n, simpleFailing: a } = yield V(c, t),
        { tokenPassing: o, tokenFailing: i } = yield R(c, t, l),
        { nftPassing: u, nftFailing: f } = yield (function (e, t, l) {
          return A(this, void 0, void 0, function* () {
            var n, a, r, o;
            let i = [],
              s = [];
            const c = Object.values(B),
              d = c.map((e) => e.id);
            let m = t.rules.filter((e) => "nft" === e.type);
            m = m
              .map((e) => {
                var t;
                const l =
                  null === (t = e.contracts) || void 0 === t
                    ? void 0
                    : t.filter((t) => {
                        var l, n;
                        if (!d.includes(t.chainId)) return !1;
                        const a = parseFloat(
                          null !==
                            (n =
                              null !==
                                (l = null == t ? void 0 : t.minimumBal) &&
                              void 0 !== l
                                ? l
                                : null == e
                                  ? void 0
                                  : e.minimumBal) && void 0 !== n
                            ? n
                            : "0"
                        );
                        return (
                          void 0 !== (null == t ? void 0 : t.address) &&
                          42 === t.address.length &&
                          a >= 1
                        );
                      });
                return Object.assign(Object.assign({}, e), { contracts: l });
              })
              .filter((e) => e.contracts && e.contracts.length > 0);
            const u = yield S(m, l);
            for (const t of m) {
              const l = null !== (n = t.strict) && void 0 !== n && n;
              let d = !1;
              for (const n of t.contracts) {
                const m =
                  null !==
                    (r =
                      null !== (a = n.minimumBal) && void 0 !== a
                        ? a
                        : t.minimumBal) && void 0 !== r
                    ? r
                    : "0";
                let f;
                if (u[n.chainId]) f = N({ transport: k(u[n.chainId]) });
                else {
                  const e = C({
                    chains: c,
                    id: null !== (o = n.chainId) && void 0 !== o ? o : 1,
                  });
                  f = N({ chain: e, transport: k() });
                }
                const p = yield f.readContract({
                    address: n.address,
                    abi: Q,
                    functionName: "balanceOf",
                    args: [e],
                  }),
                  b = parseFloat(m),
                  g = parseFloat(p);
                if (b > g && !0 === l) {
                  s.push(t), (d = !0);
                  break;
                }
                if (b <= g && !1 === l) {
                  i.push(t), (d = !0);
                  break;
                }
              }
              !1 === l && !1 === d
                ? s.push(t)
                : !0 === l && !1 === d && i.push(t),
                (d = !1);
            }
            return { nftPassing: i, nftFailing: s };
          });
        })(c, t, l);
      if (
        (r((e) =>
          Object.assign(Object.assign({}, e), {
            simple: { passing: n, failing: a },
            token: { passing: o, failing: i },
            nft: { passing: u, failing: f },
          })
        ),
        !0 === e.strict && ((null == a ? void 0 : a.length) ? a.length : 0) > 0)
      )
        s(!0);
      else if (
        !1 === e.strict &&
        ((null == n ? void 0 : n.length) ? n.length : 0) > 0
      )
        s(!1);
      else if (
        !0 === e.strict &&
        ((null == i ? void 0 : i.length) ? i.length : 0) > 0
      )
        s(!0);
      else if (
        !1 === e.strict &&
        ((null == o ? void 0 : o.length) ? o.length : 0) > 0
      )
        s(!1);
      else if (
        !0 === e.strict &&
        ((null == f ? void 0 : f.length) ? f.length : 0) > 0
      )
        s(!0);
      else {
        if (
          !(
            !1 === e.strict &&
            ((null == u ? void 0 : u.length) ? u.length : 0) > 0
          )
        )
          return !0 === e.strict ? void s(!1) : void s(!0);
        s(!1);
      }
    });
  return { isBlock3d: o, userData: a };
}
function L({ children: t, block3dConfig: l, wagmiConfig: n }) {
  const { isBlock3d: a, userData: r } = _(l, n);
  return a
    ? e.createElement(q, { userData: r })
    : e.createElement("div", null, t);
}
const U = new F();
function W({ children: t, wagmiConfig: l, block3dConfig: n }) {
  return e.createElement(
    "html",
    { lang: "en" },
    e.createElement(
      "body",
      null,
      e.createElement(
        s,
        { config: l },
        e.createElement(
          O,
          { client: U },
          e.createElement(
            r,
            null,
            e.createElement(L, { block3dConfig: n, wagmiConfig: l }, t)
          )
        )
      )
    )
  );
}
export {
  z as Block3dConnectButton,
  W as Block3r,
  L as Block3rContent,
  I as QRCodeModal,
  T as checkIsRoutePublic,
  V as checkSimpleRules,
  R as checkTokenRules,
  _ as useBlock3r,
};
//# sourceMappingURL=index.js.map
