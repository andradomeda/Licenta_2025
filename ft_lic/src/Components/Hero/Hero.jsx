import './Hero.css'
import React from 'react'
import arrow_btn from '../../assets/arrow_btn.png'

const Hero = ({ heroData, setHeroCount, heroCount, setPlayStatus, PlayStatus }) => {
  return (
    <div className="hero">
      <div className="text_main">
        <div className="hero-text">
          <p>{heroData.text1}</p>
          <p>{heroData.text2}</p>
        </div>

        <div className="hero-explore">
          <p>Afla mai multe</p>
          {/* <img src={arrow_btn} alt="" /> */}
        </div>
      </div>
      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}></li>
        </ul>
      </div>
    </div>

  )
}

export default Hero
