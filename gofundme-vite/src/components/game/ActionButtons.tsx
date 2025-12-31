import { X, Check, ArrowRight } from 'lucide-react'

interface ActionButtonsProps {
  onGuess: (funded: boolean) => void
  onNext?: () => void
  showNext: boolean
  disabled: boolean
}

export default function ActionButtons({ onGuess, onNext, showNext, disabled }: ActionButtonsProps) {
  if (showNext && onNext) {
    return (
      <div key="next-button" className="flex justify-center gap-4 mt-1">
        <button
          onClick={onNext}
          className="flex items-center justify-center gap-2 w-[250px] py-3 bg-blue-500 hover:bg-blue-600
                     text-white font-bold rounded-full transform hover:scale-105
                     shadow-lg shadow-blue-500/30 transition-transform"
          aria-label="Next Campaign"
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    )
  }

  return (
    <div key="guess-buttons" className="flex justify-center gap-4 mt-1">
      <button
        onClick={() => onGuess(false)}
        disabled={disabled}
        className="flex items-center justify-center gap-2 w-[120px] py-3 bg-red-500 hover:bg-red-600
                   text-white font-bold rounded-full transform hover:scale-105
                   disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-red-500/30 transition-transform"
        aria-label="Not Funded"
      >
        <X className="w-5 h-5" />
        No
      </button>
      <button
        onClick={() => onGuess(true)}
        disabled={disabled}
        className="flex items-center justify-center gap-2 w-[120px] py-3 bg-green-500 hover:bg-green-600
                   text-white font-bold rounded-full transform hover:scale-105
                   disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-green-500/30 transition-transform"
        aria-label="Funded"
      >
        <Check className="w-5 h-5" />
        Yes
      </button>
    </div>
  )
}
