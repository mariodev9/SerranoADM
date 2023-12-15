import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import { useAppContext } from '../../context/DataContext';

export default function Analytics() {
  const { transactionsResume, transactionsSavings, totalOrders } =
    useAppContext();

  return (
    <Grid
      gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
      gap={3}
    >
      <GridItem
        h={'100px'}
        bg={'#000'}
        color={'#fff'}
        borderRadius={'20px'}
        py={3}
        px={6}
      >
        <Text fontSize={{ base: '1.1rem', md: '1.5rem' }}>
          ${transactionsResume}
        </Text>
        <Text fontSize={{ base: '0.8rem', md: '1rem' }} color={'main.100'}>
          Ganancias totales
        </Text>
      </GridItem>
      <GridItem
        h={'100px'}
        bg={'#000'}
        color={'#fff'}
        borderRadius={'20px'}
        py={3}
        px={6}
      >
        <Text fontSize={{ base: '1.1rem', md: '1.5rem' }}>
          {transactionsSavings}
        </Text>
        <Text fontSize={{ base: '0.8rem', md: '1rem' }} color={'main.100'}>
          Reservas
        </Text>
      </GridItem>{' '}
      <GridItem
        h={'100px'}
        bg={'#000'}
        color={'#fff'}
        borderRadius={'20px'}
        py={3}
        px={6}
      >
        <Text fontSize={{ base: '1.1rem', md: '1.5rem' }}>{totalOrders}</Text>
        <Text fontSize={{ base: '0.8rem', md: '1rem' }} color={'main.100'}>
          Pedidos entregados
        </Text>
      </GridItem>{' '}
      <GridItem
        h={'100px'}
        bg={'#000'}
        color={'#fff'}
        borderRadius={'20px'}
        py={3}
        px={6}
      >
        <Text fontSize={{ base: '1.1rem', md: '1.5rem' }}>100k</Text>
        <Text fontSize={{ base: '0.8rem', md: '1rem' }} color={'main.100'}>
          Ganancias ultima semana
        </Text>
      </GridItem>
    </Grid>
  );
}
