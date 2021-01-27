import NextLink from 'next/link'
import { GetStaticPaths, GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { Flex, Heading, Text, Link, Textarea } from "theme-ui"
import Layout from "../../components/Layout"
import defaultQuestions from '../../default_questions.json'
import { UIQuestion } from "../../interfaces"

type Props = {
    question: UIQuestion;
}

export default function TakePageID({ question }: Props) {
    const [answer, setAnswer] = useState('')
    const [lastQuestionNumber, setLastQuestionNumber] = useState<number | null>(null)

    useEffect(() => {
        localStorage.setItem(`questions/${lastQuestionNumber}/answer`, answer);
    }, [answer, lastQuestionNumber]);

    if (question.number !== lastQuestionNumber) {
        setAnswer(typeof window !== "undefined" ? localStorage.getItem(`questions/${question.number}/answer`) ?? "" : "");
        setLastQuestionNumber(question.number);
    }

    return <Layout title={`Hack Club Census | Question ${question.number}`}>
        <main>
            <NextLink href="/take" passHref>
                <Link sx={{ marginTop: 3 }}>← Back to question home</Link>
            </NextLink>
            <Heading as="h1" variant="title" sx={{ paddingTop: 4 }}>{question.question}</Heading>
            <Textarea spellCheck="false" value={answer} placeholder="Type your answer here" sx={{ fontSize: 4 }} onChange={(ev) => setAnswer(ev.target.value)} />
            <Text as="p">Current value: {answer}</Text>
        </main>
        <footer>
            <Flex sx={{ justifyContent: "space-between" }}>
                {question.number - 1 > 0 ?
                    <NextLink href={`/take/${question.number - 1}`} passHref>
                        <Link>← Previous</Link>
                    </NextLink> : <></>}

                {question.number + 1 < defaultQuestions.length ?
                    <NextLink href={`/take/${question.number + 1}`} passHref>
                        <Link>Next →</Link>
                    </NextLink> : <></>}
            </Flex>
        </footer>
    </Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    const paths = defaultQuestions.map((_, i) => ({
        params: { id: `${i + 1}` },
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
        const question = defaultQuestions.find((_, i) => i + 1 === Number(id))
        // By returning {props: item }, the StaticPropsDetail component
        // will receive `item` as a prop at build time
        const ui_question = {
            ...question,
            number: Number(id),
        };
        return { props: { question: ui_question } }
    } catch (err) {
        return { props: { errors: err.message } }
    }
}
