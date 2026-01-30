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
 * Preloads the primary (first) image for every campaign in the list.
 * Call this once when the game's campaign list is determined.
 */
export function preloadAllPrimaryImages(campaigns: Campaign[]): void {
  campaigns.forEach((campaign) => {
    const images = getCampaignImages(campaign)
    preloadImage(images[0])
  })
}

/**
 * Preloads all gallery images for the next N campaigns from the current index.
 * Call this as the player advances through rounds so gallery images
 * are ready before the user swipes through them.
 */
export function preloadUpcomingGalleryImages(
  campaigns: Campaign[],
  currentIndex: number,
  count = 3
): void {
  for (let i = 0; i <= count; i++) {
    const idx = currentIndex + i
    if (idx >= campaigns.length) break
    const images = getCampaignImages(campaigns[idx])
    images.forEach((src) => preloadImage(src))
  }
}
