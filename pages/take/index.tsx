/** @jsx jsx */
import { jsx } from "theme-ui"
import NextLink from "next/link"
import Layout from "../../components/Layout"

import { Heading, Link } from "theme-ui"
import { GetStaticProps } from "next"
import { Question } from "../../interfaces"
import defaultQuestions from "../../default_questions.json"

type Props = {
    questions: Question[]
}

export default function TakePage({ questions }: Props) {
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
                    {questions.map((question, i) => (
                        <li key={i}>
                            <NextLink href={`/take/${i + 1}`} passHref>
                                <Link>{question.question}</Link>
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

export const getStaticProps: GetStaticProps = async function () {
    const questions: Question[] = defaultQuestions
    return { props: { questions } }
}
