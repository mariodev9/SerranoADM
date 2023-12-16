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
  const { totalOrders, ordersFinishes, ordersInProcess } = useAppContext();

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
            {totalOrders}
          </Text>
        </Box>

        <Flex gap={10} mb={{ base: 5 }}>
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
