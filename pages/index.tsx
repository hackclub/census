import NextLink from "next/link"
import Layout from "../components/Layout"

import { Button, Heading, Link, Text } from "theme-ui"
import { loginGetServerSideProps, LoginProps } from "../lib/state"
import { useEffect, useState } from "react"

export default function IndexPage({ slackUsername }: LoginProps) {
    const [takeUrl, setTakeUrl] = useState("/take_nojs")

    // This only runs when JS is enabled, so without JS, the link goes to
    // the no-JS take page.
    useEffect(() => {
        setTakeUrl("/take")
    })

    return (
        <Layout
            title="Home | Next.js + TypeScript Example"
            slackUsername={slackUsername}
        >
            <main>
                <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>
                    Hack Club Census
                </Heading>
                <Text as="p" variant="lead">
                    Welcome to the Hack Club census: a list of questions to
                    answer, for Hack Clubbers,{" "}
                    <Link href="https://github.com/hackclub/census">
                        by Hack Clubbers
                    </Link>
                    .
                </Text>
                <NextLink href={takeUrl} passHref>
                    <Button as="a" variant="ctaLg">
                        Take the Census!
                    </Button>
                </NextLink>
            </main>
        </Layout>
    )
}

export const getServerSideProps = loginGetServerSideProps
