import React, { useState, useEffect } from 'react';
import { Button, Box, Flex, Text, Divider } from '@chakra-ui/react';
import useUser from '../../hooks/useUser';
import Layout from '../../components/Layout';
import DataTable from '../../components/common/DataTable';
import AccountingItemTable from '../../components/accounting/AccountingItemTable';
import CreateButton from '../../components/common/CreateButton';
import AccountingTable from '../../components/accounting/AccountingTable';

const headersTable = ['Titulo', 'Precio', 'Fecha', 'Tipo', ''];

export default function AccountingPage() {
  const user = useUser();

  const [accountings, setAccountings] = useState(null);

  useEffect(() => {
    fetch(`${process.env.BASE_URI}api/accounting`)
      .then((response) => response.json())
      .then((data) => setAccountings(data));
  }, []);

  // const ordersFinishes = orders?.filter(
  //   (item) => item.status === "terminado"
  // ).length;

  // const ordersInProcess = orders?.filter(
  //   (item) => item.status === "proceso"
  // ).length;

  return (
    <>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'start', md: 'center' }}
        justify={'space-between'}
      >
        <Box layerStyle={'headerSection'}>
          <Text fontSize={'2rem'} fontWeight={600}>
            Contabilidad
          </Text>
          <Text as="span" color={'gray.500'}>
            Ganancias totales:{' '}
          </Text>
          <Text as="span" fontWeight={600}>
            123
          </Text>
        </Box>

        <Flex gap={10}>
          <Box>
            <Text fontSize={'2rem'} fontWeight={600}>
              123
            </Text>
            <Text color={'gray.500'}>Ahorros Serranos</Text>
          </Box>
          <Box>
            <Text fontSize={'2rem'} fontWeight={600}>
              123
            </Text>
            <Text color={'gray.500'}>Ganancia ultima semana</Text>
          </Box>
        </Flex>
      </Flex>
      <CreateButton linkHref={'/Create/Accounting'} text={'Nuevo movimiento'} />

      <Divider
        orientation="horizontal"
        borderWidth={'1px'}
        borderColor={'main.100'}
        my={'20px'}
      />

      <AccountingTable />
    </>
  );
}
