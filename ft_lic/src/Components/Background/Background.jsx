import './Background.css'
import React from 'react'
import img4_oriz from '../../assets/img4_oriz.jpg'
import img1_vert from '../../assets/img1_vert.jpg'
import img2_vert from '../../assets/img2_vert.jpg'

const Background = ({ playStatus, heroCount }) => {
    if (playStatus == false) {
        if (heroCount === 0) {
            return <img src={img4_oriz} className='background fade-in' alt="" />
        }
        else if (heroCount === 1) {
            return <img src={img1_vert} className='background fade-in' alt="" />
        }
        else if (heroCount === 2) {
            return <img src={img2_vert} className='background fade-in' alt="" />
        }
        else{
            return null;
        }
    }else{
        return null;
    }
}

export default Background;