import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { 
  ChakraProvider,
  Box, Container, Flex, Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  VStack
} from '@chakra-ui/react'
import { auth } from "../firebase/config"
import { useEffect, useState } from 'react'
import {Login, sessionChange} from "../firebase/services/auth"
import { useRouter } from 'next/router'
import useUser from "../hooks/useUser"


type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}



export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

   const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined,
    NOT_PROFILE: false,
    LOGGED: true,
  };

  const router = useRouter()


  const [isLogin, setIsLogin] = useState(USER_STATES.NOT_KNOWN)
  const [error, setError] = useState(false)

  const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    let data = {
      email: "luciano.mariotti99@gmail.com",
      password: "ponelemasilla"
    }
    Login(data, setError)
  }

  useEffect(() => {
    sessionChange(setIsLogin);
  }, []);

  useEffect(() => {
    if (isLogin) {
      router.replace("/Home");
    }
  }, [isLogin]);
  

  return (
      <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pos={"absolute"} left={0} top={0} w={"100vw"} h={"100vh"} bg={"#fff"}>
      <div className="container">
        <main >
          <Container maxW={"2xl"} border={"2px solid red"}>
            <Flex gap={3} direction={"column"} h={"100vh"} justify={"center"} align={"center"}>
                <Text fontSize={"3rem"}>Bienvenido </Text>
                <Text fontSize={"3rem"}>{isLogin ? "Esta logeado" : "No esta log"} </Text>

                <form onSubmit={handleLogin}>
                <VStack minW={"350px"} maxW={"600px"} spacing={5}>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Contraseña</FormLabel>
                    <Input type='password' />
                  </FormControl>
                  <Button type='submit' w={"full"} bg={"#111"} color={"#fff"} _hover={{ bg:"#222" }}>Iniciar sesion</Button>
                  </VStack>

                </form>

                <Text>{error && "Hubo un error"}</Text>
            </Flex>
          </Container> 
        </main>
      </div>
      </Box>
    </>

  )
}