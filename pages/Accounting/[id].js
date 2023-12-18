import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function TransactionItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(`/api/transactions/${id}`)
        .then((response) => response.json())
        .then((data) => setTransaction(data))
        .catch((error) => setError(error));
    }
    setLoading(false);
  }, []);

  if (error) {
    return <Flex>Hubo un error</Flex>;
  }

  if (loading) {
    return (
      <Flex>
        <Spinner />
      </Flex>
    );
  }

  return (
    <div>
      Editando {id}
      {transaction && (
        <VStack>
          <Text>Fecha: {transaction.date}</Text>
          <Text>Tipo: {transaction.type}</Text>
          <Text>Titulo: {transaction.title}</Text>
          <Text>Precio: {transaction.price}</Text>
        </VStack>
      )}
    </div>
  );
}
