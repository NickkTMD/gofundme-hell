import type { Campaign } from '../../data/campaigns'
import type { ReactNode } from 'react'
import { getPlaceholderImage } from '../../data/campaigns'
import gofundmeLogo from '../../assets/GoFundMe_Logo.svg'

interface CampaignCardProps {
  campaign: Campaign
  animationClass: string
  number: number
  overlay?: ReactNode
}

function formatGoal(goal: number): string {
  return goal.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function CampaignCard({
  campaign,
  animationClass,
  number,
  overlay,
}: CampaignCardProps) {
  const imageUrl = campaign.imageUrl || getPlaceholderImage(campaign.id)

  return (
    <div
      className={`relative w-full h-full md:max-w-xl md:max-h-[800px] md:bg-gray-800 md:rounded-3xl overflow-hidden md:shadow-2xl flex flex-col md:border-4 md:border-white/20 ${animationClass}`}
    >
      {/* Image Section - full screen on mobile */}
      <div className="absolute inset-0 md:relative md:flex-1 md:min-h-0 bg-black">
        <img
          src={imageUrl}
          alt={campaign.name}
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
        />
        {/* Gradient fade to black on mobile, to gray on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 via-30% to-transparent md:from-gray-900 md:via-transparent" />

        {/* GoFundMe Logo */}
        <img
          src={gofundmeLogo}
          alt="GoFundMe"
          className="absolute top-4 right-4 w-28 md:w-32 drop-shadow-lg"
        />
      </div>

      {/* Content Section - overlaid on mobile, separate on desktop */}
      <div className="relative mt-auto p-4 md:p-6 md:bg-gradient-to-t md:from-gray-900 md:to-gray-900/95">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
          {campaign.name} <span className="font-normal text-gray-400">{number}</span>
        </h2>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed line-clamp-2 mb-1 md:mb-2">
          {campaign.description}
        </p>

        <p className="text-gray-400 text-sm md:text-base">
          Goal: <span className="text-white font-semibold">{formatGoal(campaign.goal)}</span>
        </p>
      </div>

      {/* Overlay slot - renders inside card bounds */}
      {overlay}
    </div>
  )
}
