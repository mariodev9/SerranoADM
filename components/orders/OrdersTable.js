import React from "react";
import DataTable from "../common/DataTable";
import { useAppContext } from "../../context/DataContext";
import OrderItemTable from "../orders/OrderItemTable";

const headersTable = [
  "Fecha entrada",
  "Fecha finalizado",
  "Cantidad",
  "Cliente",
  "Estado",
  "",
];

export default function OrdersTable() {
  const { setOrders, orders } = useAppContext();

  return (
    <DataTable headers={headersTable}>
      {orders?.map((order) => (
        <OrderItemTable key={order._id} setOrders={setOrders} {...order} />
      ))}
    </DataTable>
  );
}
