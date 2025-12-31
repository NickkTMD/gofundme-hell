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
  images?: string[]
  raised?: number
  numDonations?: number
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

  return entries.map(([slug, data], index) => {
    // Parse number of donations from string like "59 donations"
    const numDonations = parseInt(data.numDonationsStr?.match(/\d+/)?.[0] || '0')

    // Transform all images to CloudFront URLs
    const images = data.images.map(img => `${CLOUDFRONT_BASE_URL}${img}`)

    return {
      id: index + 1,
      name: data.name,
      age: data.age >= 0 ? data.age : undefined,
      idea: data.disease,
      description: data.disease,
      goal: data.goal,
      fundedSuccessfully: data.raised >= data.goal,
      imageUrl: images[0],
      images,
      raised: data.raised,
      numDonations,
      gender: data.gender,
      slug: slug,
      url: data.url
    }
  })
}

export const campaigns: Campaign[] = transformCampaignData()

export function getShuffledCampaigns(): Campaign[] {
  return [...campaigns].sort(() => Math.random() - 0.5)
}

export function getBalancedCampaigns(): Campaign[] {
  const funded = campaigns.filter(c => c.fundedSuccessfully)
  const unfunded = campaigns.filter(c => !c.fundedSuccessfully)

  // Shuffle both arrays
  const shuffledFunded = [...funded].sort(() => Math.random() - 0.5)
  const shuffledUnfunded = [...unfunded].sort(() => Math.random() - 0.5)

  // Pick 2 funded and 6 unfunded
  const selected = [
    ...shuffledFunded.slice(0, 2),
    ...shuffledUnfunded.slice(0, 6)
  ]

  // Shuffle the combined array so they're not all funded first
  return selected.sort(() => Math.random() - 0.5)
}
