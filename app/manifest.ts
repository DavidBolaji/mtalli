import type { MetadataRoute } from 'next'


export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mtalli',
    short_name: 'Mtalli',
    description: 'We\'re here to make planning your next adventure as delightful as the journey itself.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    // theme_color: '#7DBA00',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}