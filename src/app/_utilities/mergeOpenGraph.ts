import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  description: 'A demo built with Next.js. and PayloadCMS',
  images: [
    {
      url: 'https://legionsabers.com/images/og-image.jpg',
    },
  ],
  siteName: 'Pegasus Demo',
  title: 'Pegasus Demo',
  type: 'website',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
