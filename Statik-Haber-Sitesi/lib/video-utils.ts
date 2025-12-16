export function convertToEmbedUrl(url: string): string {
  if (!url || typeof url !== 'string') return url

  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`

  const vimeoRegex = /vimeo\.com\/(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  if (url.includes('/embed/') || url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
    return url
  }

  return url
}

