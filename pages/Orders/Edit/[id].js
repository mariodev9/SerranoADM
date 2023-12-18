import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Flex,
  Spinner,
  Textarea,
  HStack,
  Select,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/DataContext';

export default function EditOrderItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const toast = useToast();
  const { orders, setOrders } = useAppContext();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editedOrder, setEditedOrder] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((response) => response.json())
        .then((data) => setEditedOrder(data))
        .catch((error) => setError(error));
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedOrder)
      });

      if (response.ok) {
        toast({
          title: 'Item editado!',
          description: 'Pedido editado con exito',
          status: 'success',
          duration: 4000,
          isClosable: true
        });

        const updatedOrders = orders.map((item) =>
          item._id === id ? { ...item, ...editedOrder } : item
        );

        setOrders(updatedOrders);
      } else {
        toast({
          title: 'Ups hubo un error!',
          description: 'El pedido no pudo ser editado',
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        title: 'Ups hubo un error!',
        description: 'El pedido no pudo ser editado',
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    }
  };

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
      {editedOrder && (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Fecha entrada</FormLabel>
              <Input
                type="text"
                name="startDate"
                value={editedOrder.startDate}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Fecha salida</FormLabel>
              <Input
                type="text"
                name="endDate"
                value={editedOrder.endDate}
                onChange={handleChange}
              />
            </FormControl>

            {/* FIX */}
            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select
                name="status"
                defaultValue={editedOrder.status}
                onChange={handleChange}
              >
                <option value="proceso">En Proceso</option>
                <option value="terminado">Completado</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Cliente</FormLabel>
              <Input
                type="text"
                name="client"
                value={editedOrder.client}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Precio</FormLabel>
              <Input
                type="number"
                name="price"
                value={editedOrder.price}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Cantidad</FormLabel>
              <Input
                type="number"
                name="quantity"
                value={editedOrder.quantity}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Materiales</FormLabel>
              <HStack spacing={2} mb={3}>
                {editedOrder.materials.map((material, index) => (
                  <Box
                    key={material}
                    bg="#000"
                    color={'#fff'}
                    p={2}
                    borderRadius="md"
                  >
                    {material}
                  </Box>
                ))}
              </HStack>
              {/* <Flex gap={3} align={'center'}>
                <Input
                  type="text"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  placeholder="Ingresa un material..."
                />
                <Button
                  type="button"
                  onClick={handleAddMaterial}
                  colorScheme="teal"
                >
                  Agregar
                </Button>
              </Flex> */}
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Guardar cambios
            </Button>
          </VStack>
        </form>
      )}
    </div>
  );
}
