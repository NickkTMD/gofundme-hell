import type { Campaign } from '../../../data/campaigns'
import gofundmeLogo from '../../../assets/GoFundMe_Logo.svg'

function formatGoal(goal: number): string {
  return goal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })
}

function capitalizeFirstLetter(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

interface GuessingContentProps {
  campaign: Campaign
  hasMultipleImages: boolean
  currentImageIndex: number
  onImageIndexChange: (index: number) => void
  images: string[]
}

export default function GuessingContent({
  campaign,
  hasMultipleImages,
  currentImageIndex,
  onImageIndexChange,
  images,
}: GuessingContentProps) {
  return (
    <>
      <p className="text-gray-300 text-base md:text-lg leading-relaxed line-clamp-2 mb-1 md:mb-2">
        {capitalizeFirstLetter(campaign.description)}
      </p>

      <p className="text-gray-400 text-base md:text-lg flex items-center gap-2">
        Goal: <span className="text-white font-semibold">{formatGoal(campaign.goal)}</span>
        <img src={gofundmeLogo} alt="GoFundMe" className="h-4 md:h-5" />
      </p>

      {/* Image Indicators - only show if multiple images */}
      {hasMultipleImages && (() => {
        const maxDots = 9
        const totalImages = images.length

        // If 9 or fewer images, show all dots
        if (totalImages <= maxDots) {
          return (
            <div className="flex justify-center gap-2 mt-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    onImageIndexChange(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )
        }

        // More than 9 images: show sliding window with current in middle
        const halfWindow = Math.floor(maxDots / 2)
        let startIndex = Math.max(0, currentImageIndex - halfWindow)
        let endIndex = Math.min(totalImages, startIndex + maxDots)

        // Adjust if we're near the end
        if (endIndex - startIndex < maxDots) {
          startIndex = Math.max(0, endIndex - maxDots)
        }

        const visibleIndices = Array.from(
          { length: endIndex - startIndex },
          (_, i) => startIndex + i
        )

        return (
          <div className="flex justify-center gap-2 mt-3">
            {visibleIndices.map((index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  onImageIndexChange(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )
      })()}
    </>
  )
}
