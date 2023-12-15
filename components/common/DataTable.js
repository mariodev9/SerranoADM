import { Th, TableContainer, Thead, Tr, Table, Tbody } from '@chakra-ui/react';
import React from 'react';

export default function DataTable({ children, headers }) {
  const ThCustomize = ({ children }) => (
    <Th
      textTransform={'capitalize'}
      fontFamily={'inter'}
      fontSize={'0.9rem'}
      fontWeight={500}
      color={'#000'}
    >
      {children}
    </Th>
  );

  return (
    <TableContainer
      mt={5}
      border={'1px solid'}
      borderColor={' main.100'}
      borderRadius={'10px'}
    >
      <Table size="md">
        <Thead bg={'main.200'}>
          <Tr>
            {headers.map((header) => (
              <ThCustomize key={header}>{header}</ThCustomize>
            ))}
          </Tr>
        </Thead>
        <Tbody fontWeight={500}>{children}</Tbody>
      </Table>
    </TableContainer>
  );
}
