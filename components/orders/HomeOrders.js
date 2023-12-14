import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import OrderItemTable from "../orders/OrderItemTable";
import DataTable from "../common/DataTable";
import CreateButton from "../common/CreateButton";
import { useAppContext } from "../../context/DataContext";

const headersTable = [
  "Fecha entrada",
  "Fecha finalizado",
  "Cantidad",
  "Cliente",
  "Estado",
  "",
];

export default function HomeOrders() {
  const { setOrders, orders, totalOrders } = useAppContext();

  return (
    <>
      <Flex justify={"space-between"} direction={{ base: "column", md: "row" }}>
        <Box mb={3}>
          <Text fontWeight={600} fontSize={"1.5rem"}>
            Pedidos
          </Text>
          <Text as="span" color={"gray.500"}>
            Pedidos en total:{" "}
          </Text>
          <Text as="span" fontWeight={600}>
            {totalOrders}
          </Text>
        </Box>
        <CreateButton linkHref={"/Create/Order"} text={"Nuevo pedido"} />
      </Flex>
      <DataTable headers={headersTable}>
        {orders?.map((order) => (
          <OrderItemTable key={order._id} setOrders={setOrders} {...order} />
        ))}
      </DataTable>
    </>
  );
}
