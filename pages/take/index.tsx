/** @jsx jsx */
import { jsx } from "theme-ui"
import NextLink from "next/link"
import Layout from "../../components/Layout"

import { Heading, Link } from "theme-ui"
import { uiQuestions } from "../../lib/questions"

export default function TakePage(_: {}) {
    return (
        <Layout slackUsername={null}>
            <main>
                <noscript>
                    <Link href="/take_nojs">
                        This page requires JavaScript. Click here to go to a
                        no-JS version!
                    </Link>
                    <br />
                </noscript>
                <NextLink href="/" passHref>
                    <Link sx={{ marginTop: 3 }}>← Back to home</Link>
                </NextLink>
                <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>
                    Take the Hack Club Census
                </Heading>
                <ol>
                    {uiQuestions.map((q) => (
                        <li key={q.number}>
                            <NextLink href={`/take/${q.number}`} passHref>
                                <Link>{q.question}</Link>
                            </NextLink>
                        </li>
                    ))}
                </ol>
                <NextLink href="/submit" passHref>
                    <Link as="a">Submit →</Link>
                </NextLink>
            </main>
        </Layout>
    )
}
