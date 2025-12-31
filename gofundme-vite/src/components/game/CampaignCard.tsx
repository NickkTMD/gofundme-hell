import type { Campaign } from '../../data/campaigns'
import { useState } from 'react'
import { getPlaceholderImage } from '../../data/campaigns'
import gofundmeLogo from '../../assets/GoFundMe_Logo.svg'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ContentSection from './CampaignCard/ContentSection'

interface CampaignCardProps {
  campaign: Campaign
  animationClass: string
  phase: 'guessing' | 'result'
  isCorrect?: boolean
}

export default function CampaignCard({
  campaign,
  animationClass,
  phase,
  isCorrect,
}: CampaignCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = campaign.images && campaign.images.length > 0
    ? campaign.images
    : [campaign.imageUrl || getPlaceholderImage(campaign.id)]

  const hasMultipleImages = images.length > 1

  const goToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      className={`relative w-full h-full md:max-w-xl md:max-h-[800px] md:bg-gray-800 md:rounded-3xl overflow-hidden md:shadow-2xl flex flex-col md:border-4 md:border-white/20 ${animationClass}`}
    >
      {/* Image Section - full screen on mobile */}
      <div className="absolute inset-0 md:relative md:flex-1 md:min-h-0 bg-black">
        <img
          src={images[currentImageIndex]}
          alt={`${campaign.name} - Image ${currentImageIndex + 1}`}
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
        />
        {/* Gradient fade to black on mobile, to gray on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 via-30% to-transparent md:from-gray-900 md:via-transparent" />

        {/* Tap zones for navigation - only if multiple images */}
        {hasMultipleImages && (
          <>
            {/* Left tap zone */}
            <div
              onClick={goToPrevImage}
              className="absolute left-0 top-0 bottom-0 w-1/2 z-10 cursor-pointer"
              aria-label="Previous image"
            />
            {/* Right tap zone */}
            <div
              onClick={goToNextImage}
              className="absolute right-0 top-0 bottom-0 w-1/2 z-10 cursor-pointer"
              aria-label="Next image"
            />
          </>
        )}

        {/* Navigation Arrows - only show on desktop if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevImage}
              className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNextImage}
              className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* GoFundMe Logo */}
        <img
          src={gofundmeLogo}
          alt="GoFundMe"
          className="absolute top-4 right-4 w-28 md:w-32 drop-shadow-lg z-20"
        />
      </div>

      {/* Content Section - always rendered, morphs between phases */}
      <ContentSection
        campaign={campaign}
        phase={phase}
        isCorrect={isCorrect}
        hasMultipleImages={hasMultipleImages}
        currentImageIndex={currentImageIndex}
        onImageIndexChange={setCurrentImageIndex}
        images={images}
      />
    </div>
  )
}
