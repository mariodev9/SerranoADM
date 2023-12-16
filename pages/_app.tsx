import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
// import "@/styles/globals.css"

export default function MyApp({
  
  Component,
  pageProps: { ...pageProps }
}: AppProps) {

  const theme = extendTheme({

    colors: {
      main: {
        100: '#d8d8d8',
        200: '#eff1f2'
      }
    },
    layerStyles: {
      headerSection: {
        py: '10px',
        mb: '20px'
      },
      tableBox: {
        border: '1px solid',
        borderColor: 'main.100',
        borderRadius: '20px'
      }
    }
  });

  return (
    <>

    <ChakraProvider  theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
    </>
  );
}
