/** @jsx jsx */
import { Button, jsx } from 'theme-ui'
import NextLink from 'next/link'
import Layout from '../components/Layout'

import { Heading, Link, Text } from 'theme-ui'
import { GetStaticProps } from 'next'
import { Question } from '../interfaces'
import defaultQuestions from '../default_questions.json'
import { useState } from 'react'

type Props = {
    questions: Question[]
}

function getAnswer(num: number): string | null {
    if (typeof localStorage === "undefined") return null
    const value = localStorage.getItem(`questions/${num}/answer`)
    if (value && value.length == 0) return null
    return value
}

export default function TakePage({ questions }: Props) {
    let [message, setMessage] = useState("")

    async function onSubmit() {
        const res = await fetch("/api/submit", {
            body: JSON.stringify({
                answers: questions.map((_, i) => getAnswer(i + 1))
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res2 = await res.json()
        setMessage(`Success! Record ID = ${res2.recordId}`)
    }

    return <Layout>
        <main>
            <NextLink href="/" passHref>
                <Link sx={{ marginTop: 3 }}>← Back to home</Link>
            </NextLink>
            <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>Ready to submit?</Heading>
            <ol>
                {questions.map((question, i) => <li key={i}>
                    <NextLink href={`/take/${i + 1}`} passHref>
                        <Link>{question.question}</Link>
                    </NextLink>
                    <Text as="p">
                        {getAnswer(i + 1) ?? <strong>Not answered</strong>}
                    </Text>
                </li>)}
            </ol>
            <Text as="p">
                Ready to submit? Press the Submit button below and you're done!
            </Text>
            <Button variant="ctaLg" onClick={onSubmit}>Submit</Button>
            <Text as="p">{message}</Text>
        </main>
    </Layout>
}

export const getStaticProps: GetStaticProps = async function () {
    const questions: Question[] = defaultQuestions
    return { props: { questions } }
};