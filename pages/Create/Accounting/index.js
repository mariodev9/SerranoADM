import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import {
  Flex,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Button,
  Textarea,
  VStack,
  HStack,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAppContext } from '../../../context/DataContext';

export default function CreateAccountPage() {
  const { setTransactions } = useAppContext();

  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('salida');
  const [price, setPrice] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [client, setClient] = useState('');

  const toast = useToast();
  const router = useRouter();
  // Manejador para enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      title,
      date,
      price,
      type,
      additionalInfo,
      client
    };

    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a tu servidor o realizar validaciones.
    try {
      // Realiza la solicitud POST a la URL deseada
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Verifica si la solicitud fue exitosa (código de respuesta 2xx)
      if (response.ok) {
        const newItem = await response.json();

        toast({
          title: 'Nuevo movimiento',
          description: 'Movimiento creado con exito',
          status: 'success',
          duration: 4000,
          isClosable: true
        });

        setTransactions((prevData) => [...prevData, newItem]);

        router.push('/Accounting');
      } else {
        console.error('Error al realizar la solicitud POST');
        toast({
          title: 'Error',
          description: 'No se pudo crear la transaccion',
          status: 'error',
          duration: 4000,
          isClosable: true
        });
        // Maneja el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      // Maneja el error de acuerdo a tus necesidades
    }
  };

  return (
    <>
      <Text align={'center'} as={'h1'} fontSize={'2rem'}>
        Nuevo movimiento
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Fecha de Entrada */}
          <FormControl>
            <FormLabel>Fecha</FormLabel>
            <Input
              type="string"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>

          {/* Titulo */}
          <FormControl>
            <FormLabel>Titulo</FormLabel>
            <Input
              type="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          {/* Precio a cobrar */}
          <FormControl>
            <FormLabel>Precio</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          {/* Cliente */}
          <FormControl>
            <FormLabel>Cliente</FormLabel>
            <Input
              type="client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </FormControl>

          {/* Estado */}
          <FormControl>
            <FormLabel>Tipo</FormLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="salida">Gasto</option>
              <option value="entrada">Entrada</option>
              <option value="sueldo">Sueldo</option>
              <option value="reserva">Reserva</option>
            </Select>
          </FormControl>

          {/* Descripcion */}
          <FormControl>
            <FormLabel>Información Adicional</FormLabel>
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Ingresa información adicional..."
            />
          </FormControl>

          {/* Campo de Materiales */}

          {/* Botón de Enviar */}
          <Box>
            <Button type="submit" colorScheme="teal">
              Enviar
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
}
