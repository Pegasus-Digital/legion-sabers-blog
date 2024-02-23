{
  /* eslint-disable @next/next/no-img-element */
}

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Header } from '../../../payload/payload-types'

import { fetchHeader } from '../../_api/fetchGlobals'
import { Gutter } from '../Gutter'
import { HeaderNav } from './Nav'
import classes from './index.module.scss'

export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the header without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <React.Fragment>
      <header className={classes.header}>
        <Gutter className={classes.wrap}>
          <Link href="/">
            <Image
              alt="Pegasus Logo"
              className={classes.logo}
              height={150}
              src="/images/legion_logo.svg"
              width={150}
            />
          </Link>
          <HeaderNav header={header} />
        </Gutter>
      </header>
    </React.Fragment>
  )
}
