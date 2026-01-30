import type { Campaign } from '../data/campaigns'
import { getPlaceholderImage } from '../data/campaigns'

const preloaded = new Set<string>()

function preloadImage(src: string): void {
  if (preloaded.has(src)) return
  preloaded.add(src)
  const img = new Image()
  img.src = src
}

export function getCampaignImages(campaign: Campaign): string[] {
  if (campaign.images && campaign.images.length > 0) return campaign.images
  return [campaign.imageUrl || getPlaceholderImage(campaign.id)]
}

/** Game init: preload the first image for every campaign (8 requests). */
export function preloadFirstImages(campaigns: Campaign[]): void {
  campaigns.forEach((c) => preloadImage(getCampaignImages(c)[0]))
}

/** Round start: preload the first N gallery images for one campaign. */
export function preloadGallery(campaign: Campaign, depth = 4): void {
  getCampaignImages(campaign).slice(0, depth).forEach(preloadImage)
}

/** Gallery swipe: preload the next N images ahead of the current position. */
export function preloadAhead(campaign: Campaign, currentImage: number, ahead = 3): void {
  const images = getCampaignImages(campaign)
  for (let i = 1; i <= ahead; i++) {
    const idx = currentImage + i
    if (idx < images.length) preloadImage(images[idx])
  }
}
