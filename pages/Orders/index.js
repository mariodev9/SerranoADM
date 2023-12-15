import React, { useEffect, useState } from 'react';
import { Button, Box, Flex, Text, Divider, useToast } from '@chakra-ui/react';
import useUser from '../../hooks/useUser';
import Layout from '../../components/Layout';
import DataTable from '../../components/common/DataTable';
import OrderItemTable from '../../components/orders/OrderItemTable';
import CreateButton from '../../components/common/CreateButton';
import OrdersTable from '../../components/orders/OrdersTable';
import { useAppContext } from '../../context/DataContext';

const headersTable = [
  'Fecha entrada',
  'Fecha finalizado',
  'Cantidad',
  'Cliente',
  'Estado',
  ''
];

export default function OrdersPage() {
  const user = useUser();
  const toast = useToast();

  const [orders, setOrders] = useState(null);

  // const { totalOrders } = useAppContext();

  useEffect(() => {
    fetch(`/api/orders`)
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  const ordersFinishes = orders?.filter(
    (item) => item.status === 'terminado'
  ).length;

  const ordersInProcess = orders?.filter(
    (item) => item.status === 'proceso'
  ).length;

  return (
    <>
      {/* Header orders page */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'start', md: 'center' }}
        justify={'space-between'}
      >
        <Box layerStyle={'headerSection'}>
          <Text fontSize={'2rem'} fontWeight={600}>
            Pedidos
          </Text>
          <Text as="span" color={'gray.500'}>
            Pedidos totales:{' '}
          </Text>
          <Text as="span" fontWeight={600}>
            {orders?.length}
          </Text>
        </Box>

        <Flex gap={10}>
          <Box>
            <Text fontSize={'2rem'} fontWeight={600}>
              {ordersFinishes}
            </Text>
            <Text color={'gray.500'}>Hechos</Text>
          </Box>
          <Box>
            <Text fontSize={'2rem'} fontWeight={600}>
              {ordersInProcess}
            </Text>
            <Text color={'gray.500'}>En proceso</Text>
          </Box>
        </Flex>
      </Flex>
      <CreateButton linkHref={'/Create/Order'} text={'Nuevo pedido'} />

      <Divider
        orientation="horizontal"
        borderWidth={'1px'}
        borderColor={'main.100'}
        my={'20px'}
      />

      {/* All orders */}
      <OrdersTable />
    </>
  );
}
