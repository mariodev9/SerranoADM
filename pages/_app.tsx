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
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""  />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
    </Head>
    <ChakraProvider  theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
    </>
  );
}
