import e, { useState as l, useEffect as t } from "react";
import {
  ConnectButton as a,
  RainbowKitProvider as n,
} from "@rainbow-me/rainbowkit";
import { useDisconnect as o, useAccount as r, WagmiProvider as i } from "wagmi";
import {
  XCircleIcon as A,
  ArrowLeftOnRectangleIcon as s,
  CheckCircleIcon as d,
  DocumentDuplicateIcon as c,
  QrCodeIcon as m,
} from "@heroicons/react/24/outline";
import { QRCodeSVG as u } from "qrcode.react";
import {
  Table as g,
  TableHeader as v,
  TableColumn as f,
  TableBody as b,
  TableRow as p,
  TableCell as C,
  getKeyValue as B,
} from "@nextui-org/react";
import "@rainbow-me/rainbowkit/styles.css";
import { usePathname as I } from "next/navigation";
import { createPublicClient as h, http as y, extractChain as E } from "viem";
import * as x from "viem/chains";
import { getClient as Q } from "@wagmi/core";
import {
  QueryClient as N,
  QueryClientProvider as k,
} from "@tanstack/react-query";
import "../styles.css";
function w({ qrModalVisible: t, setQrModalVisible: a, address: n }) {
  const [o, r] = l(!1);
  return e.createElement(
    "div",
    {
      className:
        "bg-blue-300 p-6 w-full flex justify-center right-full items-center rounded-lg mt-2 z-50 " +
        (t ? "" : "hidden"),
    },
    e.createElement(
      "div",
      { className: "flex flex-col items-center space-y-6 pt-6" },
      e.createElement(
        "div",
        { className: "bg-white rounded-xl" },
        e.createElement(u, { className: "p-4", value: n, size: 256 })
      ),
      e.createElement(
        "div",
        {
          className: "!rounded-xl flex gap-3 relative group hidden lg:block",
          onClick: () => {
            return (
              (e = n),
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
              "cursor-pointer flex items-center font-medium bg-white rounded-lg text-lg p-2",
          },
          n
        ),
        e.createElement(
          "span",
          {
            className:
              "absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-blue-300 whitespace-nowrap p-4 text-white text-base rounded shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20",
          },
          1 == o ? "Address Copied!" : "Click to copy address"
        )
      ),
      e.createElement(
        "button",
        { className: "text-white", onClick: () => a(!1) },
        e.createElement(
          "div",
          { className: "relative group" },
          e.createElement(A, {
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
const H = () => {
  const { disconnect: t } = o(),
    [n, r] = l(!1),
    [i, A] = l(!1);
  return e.createElement(
    a.Custom,
    null,
    ({ account: l, chain: a, openConnectModal: o, mounted: u }) => {
      const g = u && l && a;
      return e.createElement(
        e.Fragment,
        null,
        g
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
                      onClick: () => t(),
                    },
                    e.createElement(s, { className: "h-9 w-6 ml-2 sm:ml-0" }),
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
                              l.displayName
                            ),
                            e.createElement(d, {
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
                                  (e = l.address),
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
                              l.displayName
                            ),
                            e.createElement(c, {
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
                          onClick: () => A(!0),
                          className:
                            "flex items-center gap-3 px-3 py-2 !rounded-xl hover:bg-[#9fcbfd]",
                        },
                        e.createElement(m, {
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
                          onClick: () => t(),
                        },
                        e.createElement(s, {
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
                e.createElement(w, {
                  setQrModalVisible: A,
                  qrModalVisible: i,
                  address: l.address,
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
function L({ userData: l }) {
  var t, a, n, o, r, i;
  const A = [
      { key: "title", label: "Title" },
      ...((null !==
        (n =
          null ===
            (a =
              null === (t = null == l ? void 0 : l.token) || void 0 === t
                ? void 0
                : t.failing) || void 0 === a
            ? void 0
            : a.length) && void 0 !== n
        ? n
        : 0) > 0 ||
      (null !==
        (i =
          null ===
            (r =
              null === (o = null == l ? void 0 : l.nft) || void 0 === o
                ? void 0
                : o.failing) || void 0 === r
            ? void 0
            : r.length) && void 0 !== i
        ? i
        : 0) > 0
        ? [{ key: "minBalance", label: "Minimum Balance" }]
        : []),
      { key: "type", label: "Type" },
    ],
    s = (e) => {
      if (e.length > 20) {
        return e.slice(0, 10) + "..." + e.slice(e.length - 10, e.length);
      }
      return e;
    };
  return e.createElement(
    g,
    {
      className: "w-1/2 text-2xl bg-blue-300 rounded-lg hidden lg:block",
      "aria-label": "Blocked reasons table",
    },
    e.createElement(v, { className: "px-4 mx-4", columns: A }, (l) =>
      e.createElement(
        f,
        {
          className:
            "bg-gray-100 px-4 mx-4 border-blue-300 border-r-4 border-l-4 rounded-xl",
          key: l.key,
        },
        l.label
      )
    ),
    e.createElement(
      b,
      {
        items: (() => {
          var e, t, a;
          let n = [];
          return (
            [
              ...((null === (e = null == l ? void 0 : l.simple) || void 0 === e
                ? void 0
                : e.failing) || []),
              ...((null === (t = null == l ? void 0 : l.token) || void 0 === t
                ? void 0
                : t.failing) || []),
              ...((null === (a = null == l ? void 0 : l.nft) || void 0 === a
                ? void 0
                : a.failing) || []),
            ].forEach((e, l) => {
              var t, a, o;
              n.push({
                key: l,
                title: s(e.title),
                minBalance:
                  "simple" === e.type
                    ? "N/A"
                    : (
                          null ===
                            (a =
                              null === (t = e.contracts) || void 0 === t
                                ? void 0
                                : t[0]) || void 0 === a
                            ? void 0
                            : a.minimumBal
                        )
                      ? s(e.contracts[0].minimumBal)
                      : s(null !== (o = e.minimumBal) && void 0 !== o ? o : ""),
                type:
                  "nft" == e.type
                    ? e.type.toUpperCase()
                    : e.type.charAt(0).toUpperCase() + e.type.slice(1),
              });
            }),
            n
          );
        })(),
      },
      (l) =>
        e.createElement(p, { key: l.key }, (t) =>
          e.createElement(
            C,
            {
              className:
                "bg-gray-100 hover:bg-gray-200 px-4 mx-4 border-blue-300 border-r-4 border-l-4 border-b-4 border-t-4 rounded-xl",
            },
            B(l, t)
          )
        )
    )
  );
}
const G = ({ userData: l }) => {
  var t, a, n;
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
                  e.createElement("img", {
                    src: "data:image/png;base64,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",
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
          className: "bg-blue-300 w-[75%] -ml-1 rounded-tl-md hidden 2xl:block",
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
          className: "bg-blue-300 w-[75%] -ml-1 rounded-tl-md hidden 2xl:block",
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
                e.createElement("img", {
                  className: "scale=[1.25]",
                  src: "data:image/png;base64,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",
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
      (null === (t = null == l ? void 0 : l.simple) || void 0 === t
        ? void 0
        : t.failing) ||
      null !=
        (null === (a = null == l ? void 0 : l.token) || void 0 === a
          ? void 0
          : a.failing) ||
      null !=
        (null === (n = null == l ? void 0 : l.nft) || void 0 === n
          ? void 0
          : n.failing)) &&
      e.createElement(
        "div",
        { className: "mt-1 flex flex-row w-full justify-center" },
        e.createElement(L, { userData: l }),
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
      { className: "flex flex-row w-full justify-center mt-2 drop-shadow-xl" },
      e.createElement(
        "div",
        { className: "bg-blue-300 flex rounded-lg w-[50.05%]" },
        e.createElement(H, null)
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
function D(e, l, t, a) {
  return new (t || (t = Promise))(function (n, o) {
    function r(e) {
      try {
        A(a.next(e));
      } catch (e) {
        o(e);
      }
    }
    function i(e) {
      try {
        A(a.throw(e));
      } catch (e) {
        o(e);
      }
    }
    function A(e) {
      var l;
      e.done
        ? n(e.value)
        : ((l = e.value),
          l instanceof t
            ? l
            : new t(function (e) {
                e(l);
              })).then(r, i);
    }
    A((a = a.apply(e, l || [])).next());
  });
}
function O(e, l) {
  return D(this, void 0, void 0, function* () {
    return !!l.publicRoutes.includes(e);
  });
}
function R(e, l) {
  return D(this, void 0, void 0, function* () {
    let t = [],
      a = [];
    return (
      l.rules
        .filter((e) => "simple" === e.type)
        .forEach((l) => {
          var n;
          (null === (n = l.addresses) || void 0 === n ? void 0 : n.includes(e))
            ? t.push(l)
            : a.push(l);
        }),
      { simplePassing: t, simpleFailing: a }
    );
  });
}
function X(e, l) {
  return D(this, void 0, void 0, function* () {
    const t = new Set();
    e.forEach((e) => {
      e.contracts &&
        (null == e ||
          e.contracts.forEach((e) => {
            t.add(e.chainId);
          }));
    });
    const a = Array.from(t);
    let n = {};
    return (
      a.forEach((e) =>
        D(this, void 0, void 0, function* () {
          const t = yield Q(l, { chainId: e }),
            a = null == t ? void 0 : t.transport.url;
          a && (n[e] = a);
        })
      ),
      n
    );
  });
}
"function" == typeof SuppressedError && SuppressedError;
const S = [
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
function Z(e, l, t) {
  return D(this, void 0, void 0, function* () {
    var a, n, o, r;
    let i = [],
      A = [];
    const s = Object.values(x),
      d = s.map((e) => e.id);
    let c = l.rules.filter((e) => "token" === e.type);
    c = c
      .map((e) => {
        var l;
        const t =
          null === (l = e.contracts) || void 0 === l
            ? void 0
            : l.filter((l) => {
                var t, a;
                if (!d.includes(l.chainId)) return !1;
                const n = parseFloat(
                  null !==
                    (a =
                      null !== (t = null == l ? void 0 : l.minimumBal) &&
                      void 0 !== t
                        ? t
                        : null == e
                          ? void 0
                          : e.minimumBal) && void 0 !== a
                    ? a
                    : "0"
                );
                return (
                  void 0 !== (null == l ? void 0 : l.address) &&
                  42 === l.address.length &&
                  n >= 1
                );
              });
        return Object.assign(Object.assign({}, e), { contracts: t });
      })
      .filter((e) => e.contracts && e.contracts.length > 0);
    const m = yield X(c, t);
    for (const l of c) {
      const t = null !== (a = l.strict) && void 0 !== a && a;
      let d = !1;
      for (const a of l.contracts) {
        const c =
          null !==
            (o =
              null !== (n = a.minimumBal) && void 0 !== n ? n : l.minimumBal) &&
          void 0 !== o
            ? o
            : "0";
        let u, g;
        if (m[a.chainId]) u = h({ transport: y(m[a.chainId]) });
        else {
          const e = E({
            chains: s,
            id: null !== (r = a.chainId) && void 0 !== r ? r : 1,
          });
          u = h({ chain: e, transport: y() });
        }
        g =
          "0x0000000000000000000000000000000000000000" === a.address
            ? yield u.getBalance({ address: e })
            : yield u.readContract({
                address: a.address,
                abi: S,
                functionName: "balanceOf",
                args: [e],
              });
        const v = parseFloat(c),
          f = parseFloat(g);
        if (v > f && !0 === t) {
          A.push(l), (d = !0);
          break;
        }
        if (v <= f && !1 === t) {
          i.push(l), (d = !0);
          break;
        }
      }
      !1 === t && !1 === d ? A.push(l) : !0 === t && !1 === d && i.push(l),
        (d = !1);
    }
    return { tokenPassing: i, tokenFailing: A };
  });
}
function q(e, l, t) {
  return D(this, void 0, void 0, function* () {
    var a, n, o, r;
    let i = [],
      A = [];
    const s = Object.values(x),
      d = s.map((e) => e.id);
    let c = l.rules.filter((e) => "nft" === e.type);
    c = c
      .map((e) => {
        var l;
        const t =
          null === (l = e.contracts) || void 0 === l
            ? void 0
            : l.filter((l) => {
                var t, a;
                if (!d.includes(l.chainId)) return !1;
                const n = parseFloat(
                  null !==
                    (a =
                      null !== (t = null == l ? void 0 : l.minimumBal) &&
                      void 0 !== t
                        ? t
                        : null == e
                          ? void 0
                          : e.minimumBal) && void 0 !== a
                    ? a
                    : "0"
                );
                return (
                  void 0 !== (null == l ? void 0 : l.address) &&
                  42 === l.address.length &&
                  n >= 1
                );
              });
        return Object.assign(Object.assign({}, e), { contracts: t });
      })
      .filter((e) => e.contracts && e.contracts.length > 0);
    const m = yield X(c, t);
    for (const l of c) {
      const t = null !== (a = l.strict) && void 0 !== a && a;
      let d = !1;
      for (const a of l.contracts) {
        const c =
          null !==
            (o =
              null !== (n = a.minimumBal) && void 0 !== n ? n : l.minimumBal) &&
          void 0 !== o
            ? o
            : "0";
        let u;
        if (m[a.chainId]) u = h({ transport: y(m[a.chainId]) });
        else {
          const e = E({
            chains: s,
            id: null !== (r = a.chainId) && void 0 !== r ? r : 1,
          });
          u = h({ chain: e, transport: y() });
        }
        const g = yield u.readContract({
            address: a.address,
            abi: S,
            functionName: "balanceOf",
            args: [e],
          }),
          v = parseFloat(c),
          f = parseFloat(g);
        if (v > f && !0 === t) {
          A.push(l), (d = !0);
          break;
        }
        if (v <= f && !1 === t) {
          i.push(l), (d = !0);
          break;
        }
      }
      !1 === t && !1 === d ? A.push(l) : !0 === t && !1 === d && i.push(l),
        (d = !1);
    }
    return { nftPassing: i, nftFailing: A };
  });
}
const Y = (e, l, t, a, n) =>
  D(void 0, void 0, void 0, function* () {
    var o, r, i, A, s, d, c, m, u, g, v, f, b, p, C, B, I, h;
    if (void 0 === n || void 0 === a)
      return (
        console.log("Block3d Config is undefined."),
        { block3d: !0, userData: void 0 }
      );
    if (!0 === (yield O(t, a)))
      return (
        console.log("Current route is public."),
        { block3d: !1, userData: void 0 }
      );
    if (void 0 === e || void 0 === l)
      return (
        console.log("Address or Chain is undefined!"),
        { block3d: !0, userData: void 0 }
      );
    const { simplePassing: y, simpleFailing: E } = yield R(e, a),
      { tokenPassing: x, tokenFailing: Q } = yield Z(e, a, n),
      { nftPassing: N, nftFailing: k } = yield q(e, a, n),
      w = {
        address: e,
        simple: { passing: y, failing: E },
        token: { passing: x, failing: Q },
        nft: { passing: N, failing: k },
      },
      H =
        (null !==
          (i =
            null ===
              (r =
                null === (o = w.simple) || void 0 === o ? void 0 : o.failing) ||
            void 0 === r
              ? void 0
              : r.length) && void 0 !== i
          ? i
          : 0) +
        (null !==
          (d =
            null ===
              (s =
                null === (A = w.token) || void 0 === A ? void 0 : A.failing) ||
            void 0 === s
              ? void 0
              : s.length) && void 0 !== d
          ? d
          : 0) +
        (null !==
          (u =
            null ===
              (m = null === (c = w.nft) || void 0 === c ? void 0 : c.failing) ||
            void 0 === m
              ? void 0
              : m.length) && void 0 !== u
          ? u
          : 0),
      L =
        (null !==
          (f =
            null ===
              (v =
                null === (g = w.simple) || void 0 === g ? void 0 : g.passing) ||
            void 0 === v
              ? void 0
              : v.length) && void 0 !== f
          ? f
          : 0) +
        (null !==
          (C =
            null ===
              (p =
                null === (b = w.token) || void 0 === b ? void 0 : b.passing) ||
            void 0 === p
              ? void 0
              : p.length) && void 0 !== C
          ? C
          : 0) +
        (null !==
          (h =
            null ===
              (I = null === (B = w.nft) || void 0 === B ? void 0 : B.passing) ||
            void 0 === I
              ? void 0
              : I.length) && void 0 !== h
          ? h
          : 0);
    return !0 === a.strict && H > 0
      ? { block3d: !0, userData: w }
      : !1 === a.strict && L > 0
        ? { block3d: !1, userData: w }
        : { block3d: !a.strict, userData: w };
  });
function W(e, a) {
  const [n, o] = l(void 0),
    [i, A] = l(!0),
    { address: s, chain: d } = r(),
    c = I();
  return (
    t(() => {
      (() => {
        D(this, void 0, void 0, function* () {
          if (c) {
            console.log("Validating user...");
            const { block3d: l, userData: t } = yield Y(
              s,
              null == d ? void 0 : d.id,
              c,
              e,
              a
            );
            A(l), o(t);
          }
        });
      })();
    }, [d, s, c, e]),
    { isBlock3d: i, userData: n }
  );
}
function F({ children: l, block3dConfig: t, wagmiConfig: a }) {
  const { isBlock3d: n, userData: o } = W(t, a);
  return n
    ? e.createElement(G, { userData: o })
    : e.createElement("div", null, l);
}
const P = new N();
function J({ children: l, wagmiConfig: t, block3dConfig: a }) {
  return e.createElement(
    i,
    { config: t },
    e.createElement(
      k,
      { client: P },
      e.createElement(
        n,
        null,
        e.createElement(F, { block3dConfig: a, wagmiConfig: t }, l)
      )
    )
  );
}
export {
  H as Block3dConnectButton,
  J as Block3r,
  F as Block3rContent,
  w as QRCodeModal,
  Y as checkBlock3d,
  O as checkIsRoutePublic,
  q as checkNftRules,
  R as checkSimpleRules,
  Z as checkTokenRules,
  X as getRpcUrls,
  W as useBlock3r,
};
//# sourceMappingURL=index.js.map
