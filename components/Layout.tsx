/** @jsx jsx */
import { jsx, Text } from 'theme-ui'

import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'

import { Container } from 'theme-ui'
import Flag from './Flag'

type Props = {
  header?: ReactNode
  children?: ReactNode
  title?: string
}

export default function Layout({ header, children, title = 'This is the default title' }: Props) {
  const [showCensus, setShowCensus] = useState(false)

  useEffect(() => {
    if (!["/", ""].includes(location.pathname)) setShowCensus(true)
  });

  return <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {/* @ts-ignore */}
    <header sx={{ paddingTop: 3, display: "flex", alignItems: "center" }}>
      <Flag />
      {showCensus ?
        <Text as="span" sx={{ marginLeft: 3 }} variant="headline">Census</Text>
        : null}
      {header}
    </header>
    {children}
  </Container>
}