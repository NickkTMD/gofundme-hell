import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { useMemo } from "react";

// Import all america images
import img1 from "../assets/america/1.jpg";
import img2 from "../assets/america/2.jpg";
import img3 from "../assets/america/3.jpg";
import img4 from "../assets/america/4.jpg";
import img5 from "../assets/america/5.jpg";
import img6 from "../assets/america/6.jpg";
import img7 from "../assets/america/7.jpg";
import img8 from "../assets/america/8.jpg";
import img9 from "../assets/america/9.jpg";
import img10 from "../assets/america/10.jpg";
import img11 from "../assets/america/11.jpg";
import img12 from "../assets/america/12.jpg";
import img13 from "../assets/america/13.jpg";
import img14 from "../assets/america/14.jpg";
import img15 from "../assets/america/15.jpg";
import img16 from "../assets/america/16.jpg";
import img17 from "../assets/america/17.jpg";
import img18 from "../assets/america/18.jpg";
import img19 from "../assets/america/19.jpg";
import img20 from "../assets/america/20.webp";
import img21 from "../assets/america/21.avif";
import img22 from "../assets/america/22.avif";
import img23 from "../assets/america/23.webp";
import img24 from "../assets/america/24.webp";
import img25 from "../assets/america/25.avif";
import img26 from "../assets/america/26.jpg";

const allImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
];

function getRandomImages(count: number) {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Home() {
  // Pick 12 random images on each render
  const images = useMemo(() => getRandomImages(12), []);

  return (
    <div className="h-dvh relative overflow-hidden">
      {/* Collage background */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3 gap-1">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden">
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Radial blur/darken effect in center only */}
      <div
        className="absolute inset-0 backdrop-blur-lg hidden md:block"
        style={{
          maskImage:
            "radial-gradient(circle, black 0%, black 25%, transparent 50%)",
          WebkitMaskImage:
            "radial-gradient(circle, black 0%, black 25%, transparent 50%)",
        }}
      ></div>
      <div
        className="absolute inset-0 backdrop-blur-lg md:hidden"
        style={{
          maskImage:
            "radial-gradient(circle, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle, black 0%, black 60%, transparent 100%)",
        }}
      ></div>
      {/* Dark overlay - center only */}
      <div className="absolute inset-0 hidden md:block bg-[radial-gradient(circle,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.85)_30%,transparent_55%)]"></div>
      <div className="absolute inset-0 md:hidden bg-[radial-gradient(circle,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.9)_60%,transparent_100%)]"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start md:justify-center px-6 pt-1 md:pt-0 overflow-auto">
        <div className="text-center max-w-2xl">
          <div className="mb-0 flex justify-center">
            <img
              src="/logo.png"
              alt="Heal Or No Heal"
              className="w-full max-w-xs md:max-w-md h-auto drop-shadow-lg"
            />
          </div>

          <div className="text-lg text-white mb-3 drop-shadow-lg text-left">
            <p className="mb-4">
              In other developed countries, when a child gets sick, the country
              does something insane - they give them{" "}
              <strong>free medical care</strong>.
            </p>
            <p className="mb-4">
              Thankfully, in America we do things better. We put the{" "}
              <strong>grieving, broke families</strong> hundreds of thousands of
              dollars into <strong>medical debt</strong>, then let them compete
              for money on <strong>GoFundMe</strong>!
            </p>
            <p className="mb-0">
              <strong>
                Can you correctly guess which children's care was funded?
              </strong>
            </p>
          </div>

          <Link
            to="/game"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700
                       text-white text-xl font-bold rounded-xl transition-all transform
                       hover:scale-105 shadow-lg border-4 border-white my-2"
          >
            <Play className="w-6 h-6" fill="currentColor" />
            PLAY NOW
          </Link>

          {/* <p className="mt-3 text-white text-sm drop-shadow-lg text-balance">
            <span className="font-semibold">Hint!</span> Cuter and whiter children tend to
            reach their medical funding goals more often.
          </p> */}

          {/* <div className="mt-0.5 text-2xl">⭐⭐⭐⭐⭐</div> */}
        </div>
      </div>
    </div>
  );
}
