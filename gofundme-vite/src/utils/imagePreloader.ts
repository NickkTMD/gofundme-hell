import type { Campaign } from '../data/campaigns'
import { getPlaceholderImage } from '../data/campaigns'

const preloaded = new Set<string>()

function preloadImage(src: string): Promise<void> {
  if (preloaded.has(src)) return Promise.resolve()
  preloaded.add(src)
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve() // don't block on failures
    img.src = src
  })
}

function getCampaignImages(campaign: Campaign): string[] {
  if (campaign.images && campaign.images.length > 0) return campaign.images
  return [campaign.imageUrl || getPlaceholderImage(campaign.id)]
}

/**
 * Preloads the first few images for every campaign in the list.
 * Call once when the game's campaign list is determined so every card
 * loads instantly and one gallery swipe is already cached.
 */
export function preloadInitialImages(campaigns: Campaign[], perCampaign = 2): void {
  campaigns.forEach((campaign) => {
    const images = getCampaignImages(campaign)
    images.slice(0, perCampaign).forEach((src) => preloadImage(src))
  })
}

/**
 * Preloads images as the player advances through rounds:
 *  - Current campaign: up to `galleryDepth` gallery images (default 8)
 *  - Next `lookahead` campaigns: first `peekCount` images each
 *
 * This gives the active kid a deep gallery cache without blasting
 * bandwidth on kids the player hasn't reached yet.
 */
export function preloadUpcomingImages(
  campaigns: Campaign[],
  currentIndex: number,
  { galleryDepth = 8, lookahead = 3, peekCount = 2 } = {}
): void {
  for (let i = 0; i <= lookahead; i++) {
    const idx = currentIndex + i
    if (idx >= campaigns.length) break
    const images = getCampaignImages(campaigns[idx])
    const limit = i === 0 ? galleryDepth : peekCount
    images.slice(0, limit).forEach((src) => preloadImage(src))
  }
}
