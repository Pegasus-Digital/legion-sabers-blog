import Link from 'next/link'
import React from 'react'

import type { Footer } from '../../../payload/payload-types'

import { fetchFooter } from '../../_api/fetchGlobals'
import { ThemeSelector } from '../../_providers/Theme/ThemeSelector'
import { Gutter } from '../Gutter'
import { CMSLink } from '../Link'
import classes from './index.module.scss'

export async function Footer() {
  let footer: Footer | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the footer without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  const navItems = footer?.navItems || []

  return (
    <footer className={classes.footer}>
      <Gutter className={classes.wrap}>
        <Link href="/">
          <picture>
            <img alt="Pegasus Logo" className={classes.logo} src="./public/favicon.svg" />
          </picture>
        </Link>
        <nav className={classes.nav}>
          <ThemeSelector />
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} />
          })}
          <Link href="/admin">Admin</Link>

          <Link href="https://pegasusds.com.br" rel="noopener noreferrer" target="_blank">
            Pegasus Digital Solutions
          </Link>
        </nav>
      </Gutter>
    </footer>
  )
}