import type { Metadata } from 'next'

import Link from 'next/link'
import React, { Fragment } from 'react'

import { Gutter } from '../../../_components/Gutter'
import { Message } from '../../../_components/Message'
import { VerticalPadding } from '../../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

export default function MessageComponentPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Message Component</span>
        </p>
        <h1>Message Component</h1>
      </Gutter>
      <Gutter>
        <VerticalPadding bottom="large" top="none">
          <Message message="This is a message" />
          <br />
          <Message error="This is an error" />
          <br />
          <Message success="This is a success" />
          <br />
          <Message warning="This is a warning" />
        </VerticalPadding>
      </Gutter>
    </Fragment>
  )
}

export const metadata: Metadata = {
  description: 'Styleguide for message component.',
  openGraph: mergeOpenGraph({
    title: 'Message Component',
    url: '/styleguide/message',
  }),
  title: 'Message Component',
}
