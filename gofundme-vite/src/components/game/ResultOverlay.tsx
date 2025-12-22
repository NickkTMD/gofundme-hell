import { CheckCircle, XCircle, ArrowRight } from 'lucide-react'

interface ResultOverlayProps {
  visible: boolean
  isCorrect: boolean
  actualResult: boolean
  onNext: () => void
}

export default function ResultOverlay({
  visible,
  isCorrect,
  actualResult,
  onNext,
}: ResultOverlayProps) {
  if (!visible) return null

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm rounded-2xl z-10">
      <div className="text-center px-6">
        {isCorrect ? (
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
        ) : (
          <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
        )}

        <h3 className={`text-3xl font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
          {isCorrect ? 'Correct!' : 'Wrong!'}
        </h3>

        <p className="text-gray-300 text-lg mb-6">
          This campaign <span className="font-semibold">{actualResult ? 'was' : 'was not'}</span> funded
        </p>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600
                     text-white font-semibold rounded-lg transition-colors"
        >
          Next Campaign
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
