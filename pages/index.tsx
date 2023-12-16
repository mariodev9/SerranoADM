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
import { LogoIcon } from '@/components/icons'


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
     NOT_KNOWN: undefined,
     NOT_LOGGED: false,
    LOGGED: true,
  };

  const router = useRouter()


  const [isLogin, setIsLogin] = useState(USER_STATES.NOT_KNOWN)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    let data = {
      email,
      password
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
          <Container maxW={"2xl"}>
            <Flex gap={3} direction={"column"} h={"100vh"} justify={"center"} align={"center"}>
                <LogoIcon/>
                <Text fontSize={"1.5rem"} fontWeight={700}>Serrano Admin</Text>
                {/* <Text fontSize={"3rem"}>{isLogin === USER_STATES.NOT_LOGGED && "nO LOG"  } </Text> */}

                <form onSubmit={handleLogin}>
                <VStack minW={"350px"} maxW={"600px"} spacing={5}>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      type='email' 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Contraseña</FormLabel>
                    <Input 
                      type='password' 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <Button type='submit' w={"full"} bg={"#111"} color={"#fff"} _hover={{ bg:"#222" }}>Iniciar sesion</Button>
                  </VStack>
                </form>
                <Text color={"red.400"} fontWeight={500}>{error && "Datos incorrectos"}</Text>
            </Flex>
          </Container> 
        </main>
      </div>
      </Box>
    </>

  )
}