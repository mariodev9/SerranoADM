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

export default function EditTransactionItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const toast = useToast();
  const { transactions, setTransactions } = useAppContext();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(`/api/transactions/${id}`)
        .then((response) => response.json())
        .then((data) => setEditedTransaction(data))
        .catch((error) => setError(error));
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTransaction)
      });

      if (response.ok) {
        toast({
          title: 'Item editado!',
          description: 'Pedido editado con exito',
          status: 'success',
          duration: 4000,
          isClosable: true
        });

        const updatedTransactions = transactions.map((item) =>
          item._id === id ? { ...item, ...editedTransaction } : item
        );

        setTransactions(updatedTransactions);
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
      {editedTransaction && (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Input
                type="text"
                name="date"
                value={editedTransaction.date}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input
                type="text"
                name="title"
                value={editedTransaction.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <Select
                name="type"
                defaultValue={editedTransaction.type}
                onChange={handleChange}
              >
                <option value="salida">Gasto</option>
                <option value="entrada">Entrada</option>
                <option value="sueldo">Sueldo</option>
                <option value="reserva">Reserva</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Precio</FormLabel>
              <Input
                type="number"
                name="price"
                value={editedTransaction.price}
                onChange={handleChange}
              />
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
