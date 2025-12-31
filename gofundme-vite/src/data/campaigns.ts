import campaignsData from '../../campaigns_metadata.json'

export interface Campaign {
  id: number
  name: string
  age?: number
  idea: string
  description: string
  goal: number
  fundedSuccessfully: boolean
  imageUrl?: string
  raised?: number
  gender?: string
  slug?: string
  url?: string
}

export function getPlaceholderImage(id: number): string {
  return `https://picsum.photos/seed/${id}/800/600`
}

const CLOUDFRONT_BASE_URL = 'https://d2g8igdw686xgo.cloudfront.net/'

function transformCampaignData(): Campaign[] {
  const entries = Object.entries(campaignsData)

  return entries.map(([slug, data], index) => ({
    id: index + 1,
    name: data.name,
    age: data.age >= 0 ? data.age : undefined,
    idea: data.disease,
    description: data.disease,
    goal: data.goal,
    fundedSuccessfully: data.raised >= data.goal,
    imageUrl: data.images[0]
      ? `${CLOUDFRONT_BASE_URL}${data.images[0]}`
      : undefined,
    raised: data.raised,
    gender: data.gender,
    slug: slug,
    url: data.url
  }))
}

export const campaigns: Campaign[] = transformCampaignData()

export function getShuffledCampaigns(): Campaign[] {
  return [...campaigns].sort(() => Math.random() - 0.5)
}
