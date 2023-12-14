import {
  Tr,
  Td,
  Flex,
  Text,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { DeleteIcon, DoneIcon, EditIcon, PendingIcon } from '../icons/index';
import IconCell from '../common/IconCell';

export default function OrderItemTable({
  startDate,
  endDate,
  quantity,
  client,
  status,
  _id,
  setOrders
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  async function DeleteOrder() {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: 'Borrado con exito',
          description: 'Pedido borrado',
          status: 'success',
          duration: 4000,
          isClosable: true,
          containerStyle: {
            backgroundColor: '#fff'
          }
        });
        setOrders((prevData) => prevData.filter((item) => item._id !== _id));
      } else {
        toast({
          title: 'Ups ocurrio un error',
          description: 'No se pudo borrar el pedido',
          status: 'error',
          duration: 3000,
          isClosable: true,
          containerStyle: {
            backgroundColor: '#fff'
          }
        });
        console.error('Error al realizar la solicitud POST');
        // Maneja el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      // Maneja el error de acuerdo a tus necesidades
    }
  }

  return (
    <>
      <Tr>
        <Td>{startDate}</Td>
        <Td>{endDate}</Td>
        <Td>{quantity}</Td>
        <Td>{client}</Td>

        <Td>
          {status === 'proceso' ? (
            <IconCell
              icon={<PendingIcon stroke={'#FFD526'} />}
              bgColor={'#FFF9DF'}
              textColor={'#FFD526'}
              text={'En proceso'}
            />
          ) : (
            <IconCell
              icon={<DoneIcon />}
              bgColor={'#EDF9E7'}
              textColor={'#82A36E'}
              text={'Entregado'}
            />
          )}
        </Td>

        <Td>
          <Flex align={'center'} gap={3}>
            <Button onClick={onOpen}>
              <DeleteIcon />
            </Button>
            <EditIcon />
          </Flex>
        </Td>
      </Tr>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Borrar pedido
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas seguro que queres borrar el pedido? Por qué no borras el lol
              mejor
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={() => DeleteOrder(_id)} ml={3}>
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
