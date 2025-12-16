import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export interface NewsItem {
  id: string
  title: string
  content: string
  fullContent: string
  image?: string
  imageUrl?: string
  images?: string[]
  imageUrls?: string[]
  videos?: string[]
  link?: string
  isPinned?: boolean
  isFeatured?: boolean
  createdAt: string
  updatedAt: string
}

const dataDir = path.join(process.cwd(), 'data')
const newsFile = path.join(dataDir, 'news.json')

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function initNewsFile() {
  ensureDataDir()
  if (!fs.existsSync(newsFile)) {
    fs.writeFileSync(newsFile, JSON.stringify([], null, 2))
  }
}

export async function getNews(): Promise<NewsItem[]> {
  initNewsFile()
  try {
    const fileContents = fs.readFileSync(newsFile, 'utf8')
    const news: NewsItem[] = JSON.parse(fileContents)
    return news.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  } catch (error) {
    console.error('Error reading news:', error)
    return []
  }
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const news = await getNews()
  return news.find(item => item.id === id) || null
}

export async function createNews(newsData: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<NewsItem> {
  initNewsFile()
  const news = await getNews()
  
  const newNews: NewsItem = {
    ...newsData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  news.unshift(newNews)
  
  let retries = 3
  while (retries > 0) {
    try {
      fs.writeFileSync(newsFile, JSON.stringify(news, null, 2), { flag: 'w' })
      break
    } catch (error) {
      retries--
      if (retries === 0) throw error
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  return newNews
}

export async function updateNews(id: string, newsData: Partial<Omit<NewsItem, 'id' | 'createdAt'>>): Promise<NewsItem | null> {
  initNewsFile()
  const news = await getNews()
  const index = news.findIndex(item => item.id === id)

  if (index === -1) {
    return null
  }

  news[index] = {
    ...news[index],
    ...newsData,
    updatedAt: new Date().toISOString()
  }

  let retries = 3
  while (retries > 0) {
    try {
      fs.writeFileSync(newsFile, JSON.stringify(news, null, 2), { flag: 'w' })
      break
    } catch (error) {
      retries--
      if (retries === 0) throw error
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  return news[index]
}

export async function deleteNews(id: string): Promise<boolean> {
  initNewsFile()
  const news = await getNews()
  const filteredNews = news.filter(item => item.id !== id)

  if (filteredNews.length === news.length) {
    return false
  }

  let retries = 3
  while (retries > 0) {
    try {
      fs.writeFileSync(newsFile, JSON.stringify(filteredNews, null, 2), { flag: 'w' })
      break
    } catch (error) {
      retries--
      if (retries === 0) throw error
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  return true
}
