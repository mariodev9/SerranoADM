import {
  Tr,
  Td,
  Flex,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import {
  DeleteIcon,
  DoneIcon,
  EarningIcon,
  EditIcon,
  PendingIcon,
  SavingIcon,
  SpentIcon
} from '../icons/index';
import IconCell from '../common/IconCell';
import { useRef } from 'react';

export default function AccountingItemTable({
  _id,
  title,
  price,
  type,
  date,
  client,
  setAccountings
}) {
  const ACCOUNTING_TYPES = {
    SPENT: {
      textColor: '#ff1616',
      bgColor: '#ff000069',
      text: 'Gasto',
      icon: <SpentIcon stroke={'#ff1616'} />
    },
    EARNING: {
      textColor: '#0B9708',
      bgColor: 'rgba(11, 151, 8, 0.35)',
      text: 'Ganancia',
      icon: <EarningIcon stroke={'#0B9708'} />
    },
    SALARY: {
      textColor: '#FFD526',
      bgColor: '#FFF9DF',
      text: 'Salario',
      icon: <DoneIcon stroke={'#FFD526'} />
    },
    SAVING: {
      textColor: '#007aff',
      bgColor: '#007aff52',
      text: 'Reserva',
      icon: <SavingIcon stroke={'#007aff'} />
    }
  };

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  async function DeleteAccount() {
    try {
      const response = await fetch(`/api/transactions/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: 'Borrado con exito',
          description: 'Movimiento borrado',
          status: 'success',
          duration: 4000,
          isClosable: true,
          containerStyle: {
            backgroundColor: '#fff'
          }
        });
        setAccountings((prevData) =>
          prevData.filter((item) => item._id !== _id)
        );
      } else {
        toast({
          title: 'Ups ocurrio un error',
          description: 'No se pudo borrar el movimiento',
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
        <Td>{title}</Td>
        <Td>${price}</Td>
        <Td>{date}</Td>
        <Td>
          {type === 'salida' && <IconCell {...ACCOUNTING_TYPES.SPENT} />}
          {type === 'entrada' && <IconCell {...ACCOUNTING_TYPES.EARNING} />}
          {type === 'sueldo' && <IconCell {...ACCOUNTING_TYPES.SALARY} />}
          {type === 'reserva' && <IconCell {...ACCOUNTING_TYPES.SAVING} />}
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
              <Button
                colorScheme="red"
                onClick={() => DeleteAccount(_id)}
                ml={3}
              >
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
