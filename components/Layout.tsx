/** @jsx jsx */
import { jsx, NavLink } from 'theme-ui'

import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'

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
    <header sx={{ display: "flex", alignItems: "center" }}>
      <Flag />
      {showCensus ?
        <NextLink href="/" passHref>
          <NavLink sx={{ marginLeft: 3, fontSize: 3 }}>Census</NavLink>
        </NextLink>
        : null}
      {header}
    </header>
    {children}
  </Container>
}