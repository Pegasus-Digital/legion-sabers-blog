import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  description: 'Legion Sabers Blog',
  images: [
    {
      url: 'https://legionsabers.com/images/og-image.jpg',
    },
  ],
  siteName: 'Legion Sabers Blog',
  title: 'Legion Sabers Blog',
  type: 'website',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
