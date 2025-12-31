import { CheckCircle, XCircle } from 'lucide-react'

interface StatusIndicatorProps {
  phase: 'guessing' | 'result'
  isCorrect?: boolean
}

export default function StatusIndicator({ phase, isCorrect }: StatusIndicatorProps) {
  if (phase === 'guessing') {
    return null
  }

  return (
    <div className="flex items-center gap-2 mb-2">
      {isCorrect ? (
        <CheckCircle className="w-6 h-6 text-green-400" />
      ) : (
        <XCircle className="w-6 h-6 text-red-400" />
      )}
      <span
        className={`text-xl ${isCorrect ? "text-green-400" : "text-red-400"}`}
        role="status"
      >
        {isCorrect ? "Correct!" : "Wrong!"}
      </span>
    </div>
  )
}
