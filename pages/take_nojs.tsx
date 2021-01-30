/** @jsx jsx */
import { Button, Input, jsx, Label } from "theme-ui"
import Layout from "../components/Layout"

import { Heading, Link } from "theme-ui"
import { GetServerSideProps } from "next"
import { Question } from "../interfaces"
import defaultQuestions from "../default_questions.json"
import { LoginProps } from "../lib/state"
import Cookies from "cookies"

type Props = {
    questions: Question[]
}

export default function TakePage({
    questions,
    slackUsername,
}: Props & LoginProps) {
    return (
        <Layout slackUsername={slackUsername}>
            <main>
                <Link href="/" sx={{ marginTop: 3 }}>
                    ← Back to home
                </Link>
                <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>
                    Take the Hack Club Census
                </Heading>
                <form action="/api/submit" method="POST">
                    <input type="hidden" name="nojs" value="yes" />
                    {questions.map((q, i) => (
                        <>
                            <Label
                                id={`answer${i + 1}`}
                                sx={{ ":target": { fontWeight: "bold" } }}
                            >
                                {q.question}
                                <br />
                                <Input
                                    type="text"
                                    name={`answer_${i + 1}`}
                                    placeholder={`Type your answer to question ${
                                        i + 1
                                    } here`}
                                />
                            </Label>
                            <br />
                            <br />
                        </>
                    ))}
                    <Button type="submit" value="Submit" variant="ctaLg">
                        Submit
                    </Button>
                    <br />
                    <br />
                </form>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = new Cookies(context.req, context.res)
    return {
        props: {
            slackUsername: cookies.get("slack-username") ?? null,
            questions: defaultQuestions,
        },
    }
}
