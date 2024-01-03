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

export default function CreateOrderPage() {
  const { setOrders } = useAppContext();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('proceso');
  const [price, setPrice] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState('');

  const toast = useToast();
  const router = useRouter();
  // Manejador para enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      startDate,
      endDate,
      price,
      quantity,
      materials,
      client,
      status
      // additionalInfo
    };

    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a tu servidor o realizar validaciones.
    try {
      // Realiza la solicitud POST a la URL deseada
      const response = await fetch('/api/orders', {
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
          title: 'Nuevo pedido',
          description: 'Pedido creado con exito',
          status: 'success',
          duration: 4000,
          isClosable: true
        });
        setOrders((prevData) => [...prevData, newItem]);

        router.push('/Orders');
      } else {
        console.error('Error al realizar la solicitud POST');
        // Maneja el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      // Maneja el error de acuerdo a tus necesidades
    }
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, newMaterial]);
    setNewMaterial('');
  };

  return (
    <>
      <Text align={'center'} as={'h1'} fontSize={'2rem'}>
        Nuevo pedido
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Fecha de Entrada */}
          <FormControl>
            <FormLabel>Fecha de Entrada</FormLabel>
            <Input
              type="string"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormControl>

          {/* Fecha de Finalización */}
          <FormControl>
            <FormLabel>Fecha de Finalización</FormLabel>
            <Input
              type="string"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Opcional"
            />
          </FormControl>

          {/* Cantidad */}
          <FormControl>
            <FormLabel>Cantidad</FormLabel>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormControl>

          {/* Precio a cobrar */}
          <FormControl>
            <FormLabel>Precio por unidad</FormLabel>
            <Input
              type="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          {/* Cliente */}
          <FormControl>
            <FormLabel>Cliente</FormLabel>
            <Input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </FormControl>

          {/* Estado */}
          <FormControl>
            <FormLabel>Estado</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="proceso">En Proceso</option>
              <option value="terminado">Completado</option>
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
          <FormControl>
            <FormLabel>Materiales</FormLabel>
            <HStack spacing={2} mb={3}>
              {materials.map((material, index) => (
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
            <Flex gap={3} align={'center'}>
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
            </Flex>
          </FormControl>

          {/* Botón de Enviar */}
          <Box mt={10}>
            <Button type="submit" colorScheme="teal">
              Enviar
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
}
