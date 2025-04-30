import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Deadly Scrum',
    short_name: 'Deadly Scrum',
    description: 'Não mate o Sr Incrível',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/deadly-scrum.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/deadly-scrum.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}