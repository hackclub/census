/** @jsx jsx */
import { Button, jsx, NavLink } from 'theme-ui'

import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'

import { Container, Text } from 'theme-ui'
import Flag from './Flag'

type Props = {
  header?: ReactNode
  children?: ReactNode
  title?: string
}

function parseCookies(str: string): { [key: string]: string; } {
  let rx = /([^;=\s]*)=([^;]*)/g;
  let obj: any = {};
  for (let m; m = rx.exec(str);)
    obj[m[1].replace(/-/g, "_")] = decodeURIComponent(m[2]);
  return obj;
}


export default function Layout({ header, children, title = 'This is the default title' }: Props) {
  const [showCensus, setShowCensus] = useState(false)

  useEffect(() => {
    if (!["/", ""].includes(location.pathname)) setShowCensus(true)
  });

  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const cookies = parseCookies(document.cookie);
    if (cookies.slack_username) {
      setUsername(cookies.slack_username);
    }
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
      {username != null ?
        <>
          <Text as="p" variant="subheadline" sx={{ marginLeft: "auto", marginTop: "auto", marginBottom: "auto" }}>
            Signed in as {username}
          </Text>
          <NextLink href="/api/logout" passHref>
            <Button as="a" variant="outline" sx={{ marginLeft: 3 }}>Log out</Button>
          </NextLink>
        </> :
        <NextLink href="/api/authorize" passHref>
          <Button as="a" variant="outline" sx={{ marginLeft: "auto" }}>Sign In With Slack</Button>
        </NextLink>}
    </header>
    {children}
  </Container>
}