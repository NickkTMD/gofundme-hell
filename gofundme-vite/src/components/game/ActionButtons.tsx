import { X, Check } from 'lucide-react'

interface ActionButtonsProps {
  onGuess: (funded: boolean) => void
  disabled: boolean
}

export default function ActionButtons({ onGuess, disabled }: ActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-1">
      <button
        onClick={() => onGuess(false)}
        disabled={disabled}
        className="flex items-center justify-center gap-2 w-[120px] py-3 bg-red-500 hover:bg-red-600
                   text-white font-bold rounded-full transition-all transform hover:scale-105
                   disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-red-500/30"
        aria-label="Not Funded"
      >
        <X className="w-5 h-5" />
        No
      </button>
      <button
        onClick={() => onGuess(true)}
        disabled={disabled}
        className="flex items-center justify-center gap-2 w-[120px] py-3 bg-green-500 hover:bg-green-600
                   text-white font-bold rounded-full transition-all transform hover:scale-105
                   disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-green-500/30"
        aria-label="Funded"
      >
        <Check className="w-5 h-5" />
        Yes
      </button>
    </div>
  )
}
