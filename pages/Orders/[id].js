import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';

export default function OrderItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((response) => response.json())
        .then((data) => setOrder(data))
        .catch((error) => setError(error));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Flex h={'100vh'} justify={'center'} align={'center'}>
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex h={'100vh'} justify={'center'} align={'center'}>
        <Text fontSize={'2rem'}>Hubo un error</Text>
      </Flex>
    );
  }

  return (
    <Box>
      <Box>Back</Box>
      <Box
        maxW="max-content"
        fontWeight={500}
        bg={'main.200'}
        borderRadius={5}
        my={3}
        px={4}
        py={2}
      >
        {id}
      </Box>

      {order && (
        <Box>
          <Text>Estado: {order.status}</Text>
          <Text>Precio por unidad: ${order.price}</Text>
          <Text>Cantidad: {order.quantity}</Text>
          <Text>Precio total: ${order.price * order.quantity}</Text>

          <Text>Fecha de inicio: {order.startDate}</Text>
          <Text>Fecha de entrega: {order.endDate}</Text>

          <Text> Cliente: {order.client}</Text>
          <Text>
            {' '}
            Materiales:{' '}
            <Flex>
              {order.materials.map((material) => (
                <Box
                  key={material}
                  py={2}
                  px={4}
                  borderRadius={10}
                  bg={'main.200'}
                >
                  {material}
                </Box>
              ))}
            </Flex>
          </Text>
        </Box>
      )}
    </Box>
  );
}
