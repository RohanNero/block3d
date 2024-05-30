import React from "react";
import Image from "next/image";
import { Block3dConnectButton } from "./Block3dConnectButton";
import { UserData } from "../types/block3d";
import { Block3dTable } from "./Block3dTable";

const block3dLogo = require("../../public/logo.png");
const githubLogo = require("../../public/github-mark-white.png");

/**
 * @dev This component is displayed to the user when they aren't able to view the page
 */
const Block3d = ({ userData }: { userData: UserData | undefined }) => {
  /* Main display containing a table of all failing rules and a connect button */
  return (
    <div className="text-center font-main flex flex-col h-screen gap-2 items-center">
      <div className="w-[51.5%] flex flex-row justify-between mt-[7%]">
        {/* Top left cube containing documentation logo */}
        <div className="flex flex-col ">
          {/* Lid/top of cube */}
          <div className="flex flex-row h-4 mb-1 overflow-y-hidden">
            <div className="bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left hidden xl:block " />
            <div className="bg-blue-300 w-[65%] -ml-2 hidden xl:block" />
            <div className="bg-blue-300 rounded-br-lg rounded-tr-full w-[20%] transform -skew-y-12 origin-top-left hidden xl:block" />
          </div>
          <div>
            <div className="flex flex-row -ml-[.1rem]">
              {/* Main section of cube and right side */}
              <div className="p-4 px-8 bg-blue-300 border rounded-lg flex items-center hidden xl:block">
                <div className="rounded-full bg-gray-100">
                  <a target="_blank" href="https://block3d.gitbook.io/block3d">
                    <Image
                      src={block3dLogo}
                      width={100}
                      height={100}
                      alt="Block3d Logo"
                    />
                  </a>
                </div>
              </div>
              {/* Right side of cube */}
              <div className="flex flex-col w-1/4">
                <div className="bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block" />
                <div className="bg-blue-300 ml-1 -mt-2 h-4/5 hidden xl:block" />
                <div className="bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block" />
              </div>
            </div>
          </div>
        </div>
        {/* Top left lid/cap */}
        <div className="flex flex-row h-3 mb-1 overflow-y-hidden place-self-end -mx-6 w-[10%] ">
          <div className="bg-blue-300 rounded-tl w-[30%] translate-y-1 -skew-y-12 origin-top-left hidden 2xl:block" />
          <div className="bg-blue-300 w-[75%] -ml-1 rounded-tl-md hidden 2xl:block" />
          <div className="bg-blue-300 rounded-tr-xl w-[30%] -skew-y-12 origin-top-left hidden 2xl:block" />
        </div>
        {/* Top middle cube containing Block3d text */}
        <div className="flex flex-col">
          {/* Lid/top of cube */}
          <div className="flex flex-row h-4 mb-1 overflow-y-hidden">
            <div className="bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left " />
            <div className="bg-blue-300 w-[95%] -ml-6" />
            <div className="bg-blue-300 rounded-br-lg rounded-tr-full w-[14%] -skew-y-12 origin-top-left " />
          </div>
          <div>
            <div className="flex flex-row">
              <div className="p-4 px-8 py-[1.75rem] text-5xl text-white flex items-center bg-blue-300 border rounded-lg cursor-pointer">
                Block3d
              </div>
              <div className="flex flex-col w-8">
                <div className="bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left" />
                <div className="bg-blue-300 ml-1 -mt-2 h-4/5" />
                <div className="bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left" />
              </div>
            </div>
          </div>
        </div>
        {/* Top right lid/cap */}
        <div className="flex flex-row h-3 mb-1 overflow-y-hidden place-self-end -mx-6 w-[10%]">
          <div className="bg-blue-300 rounded-tl w-[30%] translate-y-1 -skew-y-12 origin-top-left hidden 2xl:block" />
          <div className="bg-blue-300 w-[75%] -ml-1 rounded-tl-md hidden 2xl:block" />
          <div className="bg-blue-300 rounded-tr-xl w-[30%] -skew-y-12 origin-top-left hidden 2xl:block" />
        </div>
        {/* Top right cube containing GitHub logo */}
        <div className="flex flex-col ">
          {/* Lid/top of cube */}
          <div className="flex flex-row h-4 mb-1 overflow-y-hidden">
            <div className="bg-blue-300 rounded-tl w-[30%] transform translate-y-2 -skew-y-12 origin-top-left hidden xl:block" />
            <div className="bg-blue-300 w-[65%] -ml-2 hidden xl:block" />
            <div className="bg-blue-300 rounded-br-lg rounded-tr-full w-[20%] transform -skew-y-12 origin-top-left hidden xl:block" />
          </div>
          {/* Main part and right side of cube */}
          <div>
            <div className="flex flex-row">
              <div className="p-4 px-8 bg-blue-300 border rounded-lg hidden xl:block">
                <a target="_blank" href="https://github.com/RohanNero/Block3d">
                  <Image
                    className="scale=[1.25]"
                    src={githubLogo}
                    width={100}
                    height={100}
                    alt="GitHub Logo"
                  />
                </a>
              </div>
              {/* Right side of cube */}
              <div className="flex flex-col w-1/4">
                <div className="bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block" />
                <div className="bg-blue-300 ml-1 -mt-2 h-4/5 hidden xl:block" />
                <div className="bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden xl:block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big middle cube containing table */}
      {(userData?.simple?.failing != undefined ||
        userData?.token?.failing != undefined ||
        userData?.nft?.failing != undefined) && (
        <div className="mt-1 flex flex-row w-full justify-center">
          <Block3dTable userData={userData} />
          {/* Right side of table cube */}
          <div className="flex flex-col w-8">
            <div className="bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden lg:block" />
            <div className="bg-blue-300 ml-1 -mt-4 h-[85%] hidden lg:block" />
            <div className="bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left hidden lg:block" />
          </div>
        </div>
      )}

      {/* Bottom block under table with connect button */}
      <div className="flex flex-row w-full justify-center mt-2 drop-shadow-xl">
        <div className="bg-blue-300 flex rounded-lg w-[50.05%]">
          <Block3dConnectButton />
        </div>
        {/* Right side of connect button cube */}
        <div className="flex flex-col w-[2rem]">
          <div className="bg-blue-300 rounded-t ml-1 h-1/6 transform -skew-y-12 origin-top-left" />
          <div className="bg-blue-300 rounded-tl ml-1 -mt-[.35rem] h-[85%]" />
          <div className="bg-blue-300 rounded-b ml-1 h-1/6 transform -skew-y-12 origin-top-left" />
        </div>
      </div>
    </div>
  );
};

export default Block3d;
