"use client";
import React from "react";
import "../../styles.css";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { UserData } from "../types/block3d";

interface RowData {
  key: number;
  title: string;
  minBalance: string;
  type: string;
}

/* This is a nextui table containing a list of rules the user is failing/not meeting criteria for */
export function Block3dTable({ userData }: { userData: UserData | undefined }) {
  /* Boolean representing whether or not the user is currently failing any token or nft rules (used to conditionally render `minimumBal`) */
  const hasTokenOrNftRules =
    (userData?.token?.failing?.length ?? 0) > 0 ||
    (userData?.nft?.failing?.length ?? 0) > 0;

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
    let rows: RowData[] = [];

    const allFailingRules = [
      ...(userData?.simple?.failing || []),
      ...(userData?.token?.failing || []),
      ...(userData?.nft?.failing || []),
    ];

    allFailingRules.forEach((rule, index) => {
      rows.push({
        key: index,
        title: formatTableData(rule.title),
        minBalance:
          rule.type === "simple"
            ? "N/A"
            : rule.contracts?.[0]?.minimumBal
              ? formatTableData(rule.contracts[0].minimumBal)
              : formatTableData(rule.minimumBal ?? ""),
        type:
          rule.type == "nft"
            ? rule.type.toUpperCase()
            : rule.type.charAt(0).toUpperCase() + rule.type.slice(1),
      });
    });
    return rows;
  };

  /* Manually truncates data if it is over 20 characters in length */
  const formatTableData = (data: string) => {
    if (data.length > 20) {
      const front = data.slice(0, 10);
      const back = data.slice(data.length - 10, data.length);
      return front + "..." + back;
    } else {
      return data;
    }
  };

  return (
    <Table
      className="w-1/2 text-2xl bg-blue-300 rounded-lg hidden lg:block"
      aria-label="Blocked reasons table"
    >
      <TableHeader className="px-4 mx-4" columns={columns}>
        {(column) => (
          <TableColumn
            className="bg-gray-100 px-4 mx-4 border-blue-300 border-r-4 border-l-4 rounded-xl"
            key={column.key}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={getRows()}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell className="bg-gray-100 hover:bg-gray-200 px-4 mx-4 border-blue-300 border-r-4 border-l-4 border-b-4 border-t-4 rounded-xl">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
