import * as React from 'react';
import { AppProps } from 'next/app'

import '@hackclub/theme/fonts/reg-bold.css'
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'

export default function App({ Component, pageProps }: AppProps) {
    return <>
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    </>
}