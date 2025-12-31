import type { Campaign } from '../../../data/campaigns'

interface ResultContentProps {
  campaign: Campaign
}

export default function ResultContent({ campaign }: ResultContentProps) {
  const { fundedSuccessfully, numDonations, goal, raised } = campaign

  return (
    <div className="text-left">
      <p
        className={`text-xl md:text-2xl ${
          fundedSuccessfully ? "text-green-400" : "text-red-400"
        }`}
      >
        {fundedSuccessfully ? "was funded" : "was not funded"}
      </p>

      {fundedSuccessfully ? (
        numDonations ? (
          <p className="text-gray-300 text-lg md:text-xl">
            with {numDonations} donation{numDonations !== 1 ? 's' : ''} to reach{' '}
            ${goal.toLocaleString()} goal
          </p>
        ) : null
      ) : (
        raised !== undefined && goal ? (
          <p className="text-gray-300 text-lg md:text-xl">
            ${(goal - raised).toLocaleString()} short of ${goal.toLocaleString()} goal
          </p>
        ) : null
      )}
    </div>
  )
}
