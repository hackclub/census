import Layout from "../components/Layout"
import { Heading, Text } from "theme-ui"
import { GetServerSideProps } from "next"
import { LoginProps } from "../lib/state"
import Cookies from "cookies"

type Props = {
    recordId: string
}

export default function SubmitPageNoJS({
    recordId,
    slackUsername,
}: Props & LoginProps) {
    return (
        <Layout slackUsername={slackUsername}>
            <Heading as="h1" variant="title">
                Success!
            </Heading>
            <Text as="p">Success submitting! Record ID: {recordId}</Text>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = new Cookies(context.req, context.res)
    return {
        props: {
            recordId: context.query.recordId as string,
            slackUsername: cookies.get("slack-username") ?? null,
        },
    }
}
