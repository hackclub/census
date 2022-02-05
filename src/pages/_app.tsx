import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hack Club Census</title>
        <link
          rel="shortcut icon"
          href="https://assets.hackclub.com/favicons/favicon-32x32.png"
          type="image/x-icon"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
export default MyApp;
