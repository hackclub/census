/** @jsx jsx */
import { Button, jsx } from "theme-ui"
import NextLink from "next/link"
import Layout from "../components/Layout"

import { Heading, Link, Text } from "theme-ui"
import { uiQuestions } from "../lib/questions"
import { useEffect, useState } from "react"

function getAnswer(num: number): string | null {
    if (typeof localStorage === "undefined") return null
    const value = localStorage.getItem(`questions/${num}/answer`)
    if (value && value.trim().length <= 0) return null
    return value
}

export default function TakePage(_: {}) {
    const [questionAnswers, setAnswers] = useState<(string | null)[]>(
        uiQuestions.map((_) => null)
    )

    let [message, setMessage] = useState("")

    async function onSubmit() {
        const res = await fetch("/api/submit", {
            body: JSON.stringify({
                answers: uiQuestions.map((q) => getAnswer(q.number)),
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const res2 = await res.json()
        setMessage(`Success! Record ID = ${res2.recordId}`)
    }

    useEffect(() => {
        const newAnswers = uiQuestions.map((q) => getAnswer(q.number))
        setAnswers(newAnswers)
    }, [])

    return (
        <Layout slackUsername={null}>
            <main>
                <NextLink href="/" passHref>
                    <Link sx={{ marginTop: 3 }}>← Back to home</Link>
                </NextLink>
                <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>
                    Ready to submit?
                </Heading>
                <ol>
                    {uiQuestions.map((q, i) => (
                        <li key={q.number}>
                            <NextLink href={`/take/${q.number}`} passHref>
                                <Link>{q.question}</Link>
                            </NextLink>
                            <Text as="p">
                                {questionAnswers[i] ?? (
                                    <strong>Not answered</strong>
                                )}
                            </Text>
                        </li>
                    ))}
                </ol>
                <Text as="p">
                    Ready to submit? Press the Submit button below and you're
                    done!
                </Text>
                <Button variant="ctaLg" onClick={onSubmit}>
                    Submit
                </Button>
                <Text as="p">{message}</Text>
            </main>
        </Layout>
    )
}
