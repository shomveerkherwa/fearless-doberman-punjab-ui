import Hero from '../components/sections/Hero'
import FeaturedDog from '../components/sections/FeaturedDog'
import { dollar, dona } from '../data/dogs'

import dollarPhoto from '../assets/dogs/dollar/dollar_solo.png'
import donaPhoto   from '../assets/dogs/dona/dona1.jpeg'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedDog
        dog={dollar}
        photo={dollarPhoto}
        bgGradient="radial-gradient(ellipse at 55% 45%, #565250 0%, #302e2c 50%, #111111 100%)"
      />
      <FeaturedDog dog={dona}   photo={donaPhoto}   flip />
      {/* More sections added here one by one */}
    </main>
  )
}
