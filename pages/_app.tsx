import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { ChakraProvider } from '@chakra-ui/react';

export default function MyApp({
  Component,
  pageProps: { ...pageProps }
}: AppProps) {
  return (
    <ChakraProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
