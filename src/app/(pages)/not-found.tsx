import React from 'react'

import { Button } from '../_components/Button'
import { Gutter } from '../_components/Gutter'
import { VerticalPadding } from '../_components/VerticalPadding'

export default function NotFound() {
  return (
    <Gutter>
      <VerticalPadding bottom="large" top="none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p>This page could not be found.</p>
        <Button appearance="primary" href="/" label="Go Home" />
      </VerticalPadding>
    </Gutter>
  )
}
