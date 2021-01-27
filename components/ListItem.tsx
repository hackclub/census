import React from 'react'
import NextLink from 'next/link'

import { User } from '../interfaces'

import { Link } from 'theme-ui'

type Props = {
  data: User
}

const ListItem = ({ data }: Props) => (
  <NextLink href="/users/[id]" as={`/users/${data.id}`} passHref>
    <Link>
      {data.id}: {data.name}
    </Link>
  </NextLink>
)

export default ListItem
