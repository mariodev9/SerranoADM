import React from 'react';
import {
  ChakraProvider,
  Flex,
  Box,
  Button,
  Text,
  extendTheme,
  useMediaQuery,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { logOut } from '../firebase/services/auth';
import {
  AccountingIcon,
  OrdersIcon,
  LogoutIcon,
  LogoIcon,
  HomeIcon,
  MenuIcon
} from '../components/icons/index';
import { useRouter } from 'next/router';
// import { Inter } from "next/font/google";
import { AppProvider } from '../context/DataContext';

// const inter = Inter({ subsets: ["latin"] });

const menuList = [
  {
    title: 'Inicio',
    icon: <HomeIcon />,
    href: '/Home'
  },
  {
    title: 'Pedidos',
    icon: <OrdersIcon />,
    href: '/Orders'
  },
  {
    title: 'Contabilidad',
    icon: <AccountingIcon />,
    href: '/Accounting'
  }
  //   {
  //     title: "Cerrar sesion",
  //     icon: <LogoutIcon />,
  //   },
];

export default function Layout({ children }) {
  const router = useRouter();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)', {
    ssr: true,
    fallback: true
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleLogOut = () => {
    logOut();
  };

  const handleRedirect = (href) => {
    router.push(href);
  };

  return (
    <AppProvider>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        bgGradient={'linear(to-r, #fff, main.100)'}
        fontFamily="inter"
      >
        {/* DesktopNav */}
        {isLargerThan768 ? (
          <Flex
            w={{ base: '100%', md: '20%' }}
            // border={"1px solid red"}
            h={'100vh'}
          >
            <Flex
              // border={"1px solid red"}
              position={'fixed'}
              direction={'column'}
              justify={'space-between'}
              h={'100vh'}
              p={'20px 10px'}
              w={{ base: '100%', md: '20%' }}
            >
              <Flex direction={'column'} gap={5}>
                <Box pl={'10px'}>
                  <LogoIcon />
                </Box>
                <Flex direction={'column'}>
                  {menuList.map((item) => (
                    <Flex
                      key={item.title}
                      onClick={() => handleRedirect(item.href)}
                      cursor={'pointer'}
                      p={'8px 12px'}
                      borderRadius={'10px'}
                      gap={3}
                      align={'center'}
                      _hover={{ bg: 'main.100' }}
                    >
                      {item.icon}
                      <Text fontWeight={600} fontSize={''}>
                        {item.title}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>

              <Flex cursor={'pointer'} onClick={handleLogOut} gap={3}>
                <LogoutIcon />
                <Text>Cerrar sesion</Text>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <Flex
            p={'5px 10px'}
            h={'50px'}
            justify={'space-between'}
            align={'center'}
          >
            <LogoIcon />
            <Button ref={btnRef} onClick={onOpen}>
              <MenuIcon />
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <LogoIcon />
                </DrawerHeader>

                <DrawerBody>
                  <Flex direction={'column'}>
                    {menuList.map((item) => (
                      <Flex
                        key={item.title}
                        onClick={() => handleRedirect(item.href)}
                        cursor={'pointer'}
                        p={'8px 12px'}
                        borderRadius={'10px'}
                        gap={3}
                        align={'center'}
                        _hover={{ bg: 'main.100' }}
                      >
                        {item.icon}
                        <Text fontWeight={600} fontSize={''}>
                          {item.title}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                </DrawerBody>

                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>
        )}

        {/* Body Page */}
        <Box
          w={{ base: 'auto', md: '80%' }}
          h={{ base: 'auto', md: '100%' }}
          p={'10px 20px'}
          borderRadius={'20px'}
          border={'2px solid main.100'}
          bg={'#fff'}
          m={'10px'}
        >
          {children}
        </Box>
      </Flex>
    </AppProvider>
  );
}
