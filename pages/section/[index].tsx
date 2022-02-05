import React from "react";
import sections from "../../sections";
import { GetServerSideProps } from "next";

interface Props {
  index: string;
}

export default function Section({ index }: Props) {
  const CurrentSection = sections[index];

  return <CurrentSection />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const index = context.params["index"] as string;

  if (sections[index] === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      index,
    },
  };
};
