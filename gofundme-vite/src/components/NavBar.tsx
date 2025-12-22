import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className="hidden md:block absolute top-0 left-0 right-0 z-20 p-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20
                   text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">Home</span>
      </Link>
    </nav>
  )
}
