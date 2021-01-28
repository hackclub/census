import NextLink from 'next/link'
import Layout from '../components/Layout'

import { Button, Heading, Link, Text } from 'theme-ui'

export default function IndexPage() {
  return <Layout title="Home | Next.js + TypeScript Example">
    <main>
      <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>Hack Club Census</Heading>
      <Text as="p" variant="lead">
        Welcome to the Hack Club census: a list of questions to answer, for Hack Clubbers,{' '}
        <Link href="https://github.com/hackclub/census">by Hack Clubbers</Link>.
      </Text>
      <NextLink href="/take">
        <Button as="a" variant="ctaLg">Take the Census!</Button>
      </NextLink>
    </main>
  </Layout>
}