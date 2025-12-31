function getFirstName(fullName: string): string {
  if (!fullName) return fullName
  return fullName.split(' ')[0]
}

interface NameDisplayProps {
  name: string
  age?: number
}

export default function NameDisplay({ name, age }: NameDisplayProps) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-0.5">
      {getFirstName(name)}
      {age !== undefined && (
        <span className="font-normal text-gray-400"> {age}</span>
      )}
    </h2>
  )
}
