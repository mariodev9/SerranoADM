import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Table,
  Thead,
  Tr,
  Td,
  TableContainer,
  Th,
  Tbody,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "../icons";
import DataTable from "../common/DataTable";
import AccountingItemTable from "../accounting/AccountingItemTable";
import CreateButton from "../common/CreateButton";
import { useAppContext } from "../../context/DataContext";

export default function HomeOrders() {
  const headersTable = ["Titulo", "Precio", "Fecha", "Tipo", ""];
  const { setTransactions, transactions } = useAppContext();

  return (
    <>
      <Flex justify={"space-between"} direction={{ base: "column", md: "row" }}>
        <Box mb={3}>
          <Text fontWeight={600} fontSize={"1.5rem"}>
            Contabilidad
          </Text>
          <Text as="span" color={"gray.500"}>
            Resumen en total:{" "}
          </Text>
          <Text as="span" fontWeight={600}>
            0
          </Text>
        </Box>
        <CreateButton
          linkHref={"/Create/Accounting"}
          text={"Nuevo movimiento"}
        />
      </Flex>

      <DataTable headers={headersTable}>
        {transactions?.map((account) => (
          <AccountingItemTable
            key={account._id}
            setAccountings={setTransactions}
            {...account}
          />
        ))}
      </DataTable>
    </>
  );
}
