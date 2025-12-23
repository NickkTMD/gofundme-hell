import type { ReactNode } from 'react'

export const TOTAL_ROUNDS = 10

export const medicalDebtComparison = {
  us: {
    label: 'US Medical Debt',
    amount: 220_000_000_000,
    flag: '🇺🇸',
  },
  other: {
    label: '18 Countries Combined',
    amount: 0,
    countries: [
      { name: 'United Kingdom', flag: '🇬🇧' },
      { name: 'Canada', flag: '🇨🇦' },
      { name: 'France', flag: '🇫🇷' },
      { name: 'Germany', flag: '🇩🇪' },
      { name: 'Australia', flag: '🇦🇺' },
      { name: 'Norway', flag: '🇳🇴' },
      { name: 'Sweden', flag: '🇸🇪' },
      { name: 'Denmark', flag: '🇩🇰' },
      { name: 'Finland', flag: '🇫🇮' },
      { name: 'Spain', flag: '🇪🇸' },
      { name: 'Italy', flag: '🇮🇹' },
      { name: 'Portugal', flag: '🇵🇹' },
      { name: 'Netherlands', flag: '🇳🇱' },
      { name: 'Belgium', flag: '🇧🇪' },
      { name: 'Austria', flag: '🇦🇹' },
      { name: 'Switzerland', flag: '🇨🇭' },
      { name: 'Japan', flag: '🇯🇵' },
      { name: 'South Korea', flag: '🇰🇷' },
    ],
  },
}

export const lang = {
  home: {
    headerEmoji: '🦅🇺🇸🦅',
    title: 'Was It',
    titleHighlight: 'Funded',
    subtitle: 'The American Dream in Action',
    description: (
      <>
        <p className="mb-4">
          In most developed countries, when a child gets sick, the country does something insane, like give the child free medical care.
        </p>
        <p>
          In America, we do things better — we let the grieving, broke families compete for money on GoFundMe to try to avoid going hundreds of thousands of dollars into debt treating their child's cancer!
        </p>
      </>
    ) as ReactNode,
    playButton: 'PLAY NOW',
    footer: 'Hint: Cuter children tend to reach their medical funding goals more often.',
    footerEmoji: '🎆',
    stars: '⭐⭐⭐⭐⭐',
  },

  game: {
    guessPrompt: 'Did it get funded?',
    scoreLabel: 'Score',
    totalRaisedLabel: 'Total Raised',
    correctLabel: 'Correct',
    wrongLabel: 'Wrong',
    raisedLabel: 'Raised',

    result: {
      correct: 'Correct!',
      wrong: 'Wrong!',
      funded: (name: string) => (
        <><span className="font-bold">{name}</span> reached its funding goal!</>
      ),
      notFunded: (name: string) => (
        <><span className="font-bold">{name}</span> did not reach its funding goal. The founder is in debt.</>
      ),
    },

    gameOver: {
      title: 'Game Over!',
      subtitle: (rounds: number) => `You completed ${rounds} rounds`,
      playAgain: 'Play Again',
      shareScore: 'Share Score',
      shareText: (correct: number, total: number) =>
        `I scored ${correct}/${total} on GoFundMe Hell! Can you do better? 🎯`,
      copiedAlert: 'Copied to clipboard!',
    },
  },
} as const
