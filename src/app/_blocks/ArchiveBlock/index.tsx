import React from 'react'

import type { ArchiveBlockProps } from './types'

import { CollectionArchive } from '../../_components/CollectionArchive'
import { Gutter } from '../../_components/Gutter'
import RichText from '../../_components/RichText'
import classes from './index.module.scss'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = (props) => {
  const {
    id,
    categories,
    introContent,
    limit,
    populateBy,
    populatedDocs,
    populatedDocsTotal,
    relationTo,
  } = props

  return (
    <div className={classes.archiveBlock} id={`block-${id}`}>
      {introContent && (
        <Gutter className={classes.introContent}>
          <RichText content={introContent} />
        </Gutter>
      )}
      <CollectionArchive
        categories={categories}
        limit={limit}
        populateBy={populateBy}
        populatedDocs={populatedDocs}
        populatedDocsTotal={populatedDocsTotal}
        relationTo={relationTo}
        sort="-publishedDate"
      />
    </div>
  )
}
