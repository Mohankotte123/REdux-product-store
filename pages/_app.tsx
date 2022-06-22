import '../styles/globals.css'
import '../styles/app.css'
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import store from '../store/store';
import { createWrapper } from 'next-redux-wrapper';

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    
    <Component {...pageProps} />
    </ChakraProvider>
}

const makestore = () => store;
const wrapper = createWrapper(makestore);
export default wrapper.withRedux(MyApp);


