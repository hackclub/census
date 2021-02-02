/** @jsx jsx */
import { jsx } from "theme-ui"
import NextLink from "next/link"
import { GetStaticPaths, GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { Flex, Heading, Text, Link, Textarea } from "theme-ui"
import Layout from "../../components/Layout"
import { UIQuestion, uiQuestions } from "../../lib/questions"

type Props = {
    question: UIQuestion
}

export default function TakePageID({ question }: Props) {
    const [answer, setAnswer] = useState("")
    const [lastQuestionNumber, setLastQuestionNumber] = useState<number | null>(
        null
    )

    useEffect(() => {
        const key = `questions/${lastQuestionNumber}/answer`
        if (answer.trim().length > 0) {
            localStorage.setItem(key, answer.trim())
        } else {
            localStorage.removeItem(key)
        }
    }, [answer, lastQuestionNumber])

    if (question.number !== lastQuestionNumber) {
        setAnswer(
            typeof window !== "undefined"
                ? localStorage.getItem(`questions/${question.number}/answer`) ??
                      ""
                : ""
        )
        setLastQuestionNumber(question.number)
    }

    const nojsUrl = `/take_nojs#answer${question.number}`

    return (
        <Layout
            slackUsername={null}
            title={`Hack Club Census | Question ${question.number}`}
        >
            {/* @ts-ignore */}
            <main sx={{ minHeight: "50vh" }}>
                <noscript>
                    <Link href={nojsUrl}>
                        This page requires JavaScript. Click here to go to a
                        no-JS version!
                    </Link>
                    <br />
                </noscript>
                <NextLink href="/take" passHref>
                    <Link sx={{ marginTop: 3 }}>← Back to question home</Link>
                </NextLink>
                <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>
                    {question.question}
                </Heading>
                <Textarea
                    spellCheck="false"
                    value={answer}
                    placeholder="Type your answer here"
                    sx={{ fontSize: 4 }}
                    onChange={(ev) => setAnswer(ev.target.value)}
                />
                <Text as="p">Current value: {answer}</Text>
            </main>
            <footer>
                <Flex sx={{ justifyContent: "space-between" }}>
                    {question.number - 1 > 0 ? (
                        <NextLink
                            href={`/take/${question.number - 1}`}
                            passHref
                        >
                            <Link>← Previous</Link>
                        </NextLink>
                    ) : (
                        <span></span>
                    )}

                    {question.number + 1 < uiQuestions.length ? (
                        <NextLink
                            href={`/take/${question.number + 1}`}
                            passHref
                        >
                            <Link>Next →</Link>
                        </NextLink>
                    ) : (
                        <span></span>
                    )}
                </Flex>
            </footer>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    const paths = uiQuestions.map((q) => ({
        params: { id: `${q.number}` },
    }))

    // We'll pre-render only these paths at build time.
    // {fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const id = params?.id
        const question = uiQuestions.find((q) => q.number === Number(id))
        return { props: { question } }
    } catch (err) {
        return { props: { errors: err.message } }
    }
}
