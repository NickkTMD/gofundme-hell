import StatusIndicator from './StatusIndicator'
import NameDisplay from './NameDisplay'
import PhaseContent from './PhaseContent'
import type { Campaign } from '../../../data/campaigns'

interface ContentSectionProps {
  campaign: Campaign
  phase: 'guessing' | 'result'
  isCorrect?: boolean
  hasMultipleImages: boolean
  currentImageIndex: number
  onImageIndexChange: (index: number) => void
  images: string[]
}

export default function ContentSection({
  campaign,
  phase,
  isCorrect,
  hasMultipleImages,
  currentImageIndex,
  onImageIndexChange,
  images,
}: ContentSectionProps) {
  return (
    <div className="relative mt-auto p-4 md:p-6 md:bg-gradient-to-t md:from-gray-900 md:to-gray-900/95">
      <StatusIndicator phase={phase} isCorrect={isCorrect} />

      <NameDisplay name={campaign.name} age={campaign.age} />

      <PhaseContent
        campaign={campaign}
        phase={phase}
        hasMultipleImages={hasMultipleImages}
        currentImageIndex={currentImageIndex}
        onImageIndexChange={onImageIndexChange}
        images={images}
      />
    </div>
  )
}
