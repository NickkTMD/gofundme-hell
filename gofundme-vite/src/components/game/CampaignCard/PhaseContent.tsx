import GuessingContent from './GuessingContent'
import ResultContent from './ResultContent'
import type { Campaign } from '../../../data/campaigns'

interface PhaseContentProps {
  campaign: Campaign
  phase: 'guessing' | 'result'
  hasMultipleImages: boolean
  currentImageIndex: number
  onImageIndexChange: (index: number) => void
  images: string[]
}

export default function PhaseContent({
  campaign,
  phase,
  hasMultipleImages,
  currentImageIndex,
  onImageIndexChange,
  images,
}: PhaseContentProps) {
  if (phase === 'guessing') {
    return (
      <GuessingContent
        campaign={campaign}
        hasMultipleImages={hasMultipleImages}
        currentImageIndex={currentImageIndex}
        onImageIndexChange={onImageIndexChange}
        images={images}
      />
    )
  }

  return <ResultContent campaign={campaign} />
}
