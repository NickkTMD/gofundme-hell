import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { useMemo } from 'react'

// Import all america images
import img1 from '../assets/america/1.jpg'
import img2 from '../assets/america/2.jpg'
import img3 from '../assets/america/3.jpg'
import img4 from '../assets/america/4.jpg'
import img5 from '../assets/america/5.jpg'
import img6 from '../assets/america/6.jpg'
import img7 from '../assets/america/7.jpg'
import img8 from '../assets/america/8.jpg'
import img9 from '../assets/america/9.jpg'
import img10 from '../assets/america/10.jpg'
import img11 from '../assets/america/11.jpg'
import img12 from '../assets/america/12.jpg'
import img13 from '../assets/america/13.jpg'
import img14 from '../assets/america/14.jpg'
import img15 from '../assets/america/15.jpg'
import img16 from '../assets/america/16.jpg'
import img17 from '../assets/america/17.jpg'
import img18 from '../assets/america/18.jpg'
import img19 from '../assets/america/19.jpg'
import img20 from '../assets/america/20.webp'
import img21 from '../assets/america/21.avif'
import img22 from '../assets/america/22.avif'
import img23 from '../assets/america/23.webp'
import img24 from '../assets/america/24.webp'
import img25 from '../assets/america/25.avif'
import img26 from '../assets/america/26.jpg'

const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26]

function getRandomImages(count: number) {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function Home() {
  // Pick 12 random images on each render
  const images = useMemo(() => getRandomImages(12), [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Collage background */}
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-1">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden">
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Radial blur/darken effect in center only */}
      <div
        className="absolute inset-0 backdrop-blur-lg"
        style={{
          maskImage: 'radial-gradient(circle, black 0%, black 25%, transparent 50%)',
          WebkitMaskImage: 'radial-gradient(circle, black 0%, black 25%, transparent 50%)'
        }}
      ></div>
      {/* Dark overlay - center only */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.7)_25%,transparent_50%)]"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          {/* Eagle and flag header */}
          <div className="text-6xl mb-4">🦅🇺🇸🦅</div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Was It <span className="text-yellow-400">Funded</span>?
          </h1>

          <p className="text-xl text-red-200 mb-2 font-semibold italic drop-shadow-lg">
            The American Dream in Action
          </p>

          <p className="text-lg text-blue-100 mb-8 drop-shadow-lg">
            Test your entrepreneurial instincts! Can you guess which GoFundMe campaigns
            achieved the American Dream and reached their funding goals?
          </p>

          <Link
            to="/game"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700
                       text-white text-xl font-bold rounded-xl transition-all transform
                       hover:scale-105 shadow-lg border-4 border-white"
          >
            <Play className="w-6 h-6" />
            PLAY NOW
          </Link>

          <p className="mt-8 text-blue-200 text-sm flex items-center justify-center gap-2 drop-shadow-lg">
            <span>🎆</span>
            Celebrating American entrepreneurship, one campaign at a time
            <span>🎆</span>
          </p>

          <div className="mt-4 text-4xl">
            ⭐⭐⭐⭐⭐
          </div>
        </div>
      </div>
    </div>
  )
}
