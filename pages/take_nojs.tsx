/** @jsx jsx */
import { jsx } from 'theme-ui'
import NextLink from 'next/link'
import Layout from '../components/Layout'

import { Heading, Link } from 'theme-ui'
import { GetStaticProps } from 'next'
import { Question } from '../interfaces'
import defaultQuestions from '../default_questions.json'

type Props = {
    questions: Question[]
}

export default function TakePage({ questions }: Props) {
    return <Layout>
        <main>
            <Link href="/" sx={{ marginTop: 3 }}>← Back to home</Link>
            <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>Take the Hack Club Census</Heading>
            <form></form>
        </main>
    </Layout>
}

export const getStaticProps: GetStaticProps = async function () {
    const questions: Question[] = defaultQuestions
    return { props: { questions } }
};