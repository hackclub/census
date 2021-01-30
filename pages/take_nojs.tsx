/** @jsx jsx */
import { Button, Input, jsx, Label } from "theme-ui"
import Layout from "../components/Layout"

import { Heading, Link } from "theme-ui"
import { uiQuestions } from "../lib/questions"
import { loginGetServerSideProps, LoginProps } from "../lib/state"

export default function TakePage({ slackUsername }: LoginProps) {
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
                    {uiQuestions.map((q) => (
                        <>
                            <Label
                                id={`answer${q.number}`}
                                sx={{ ":target": { fontWeight: "bold" } }}
                            >
                                {q.question}
                                <br />
                                <Input
                                    type="text"
                                    name={`answer_${q.number}`}
                                    placeholder={`Type your answer to question ${q.number} here`}
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

export const getServerSideProps = loginGetServerSideProps
