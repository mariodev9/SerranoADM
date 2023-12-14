import { Box, Text, Divider } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import HomeOrders from '../../components/orders/HomeOrders';
import HomeAccounting from '../../components/accounting/HomeAccounting';
import Analytics from '../../components/home/Analytics';

export default function HomePage() {
  const user = useUser();

  return (
    <>
      <Box layerStyle={'headerSection'}>
        <Text fontSize={'2rem'} fontWeight={600}>
          Inicio
        </Text>
        <Text fontWeight={500}>Administra gastos, pedidos y productos</Text>
      </Box>

      <Analytics />

      <Divider
        orientation="horizontal"
        borderWidth={'1px'}
        borderColor={'main.100'}
        my={'20px'}
      />
      <HomeOrders />
      <Divider
        orientation="horizontal"
        borderWidth={'1px'}
        borderColor={'main.100'}
        my={'20px'}
      />
      <HomeAccounting />
    </>
  );
}
