import React from "react";
import DataTable from "../common/DataTable";
import { useAppContext } from "../../context/DataContext";
import AccountingItemTable from "./AccountingItemTable";

const headersTable = ["Titulo", "Precio", "Fecha", "Tipo", ""];

export default function AccountingTable() {
  const { setTransactions, transactions } = useAppContext();

  return (
    <DataTable headers={headersTable}>
      {transactions?.map((account) => (
        <AccountingItemTable
          key={account._id}
          setAccountings={setTransactions}
          {...account}
        />
      ))}
    </DataTable>
  );
}
