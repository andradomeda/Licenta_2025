import { useEffect, useState } from 'react';
import Background from '../../Components/Background/Background';
import NavBar from '../../Components/NavBar/NavBar';
import Hero from '../../Components/Hero/Hero'
function HomePage() {

    let heroData = [
        { text1: "Cine nu are bunici", text2: "să-și  cumpere" },
        { text1: "Cine nu are bunici", text2: "să-și  cumpere" },
        { text1: "Cine nu are bunici", text2: "să-și  cumpere" }
        // { text1: "Tanti Geta", text2: "are multe să-ți povestească" },
        // { text1: "Tinerii aleargă", text2: "bătrânii știu drumul" }
    ]

    const [heroCount, setHeroCount] = useState(2);
    const [playStatus, setPlayStatus] = useState(false);

    // useEffect(()=>{
    //     const interval = setInterval(() => {
    //              setHeroCount((count) => (count === 2 ? 0 : count + 1));
    //           }, 5000); // 5000ms = 5s; pune 8000 pentru 8s, etc.
    //           return () => clearInterval(interval);
    // },[])

    return (
        <div>
            <Background playStatus={playStatus} heroCount={heroCount} />
            <NavBar/>
            <Hero
            setPlayStatus={setPlayStatus}
            heroData={heroData[heroCount]

            }
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            playStatus={playStatus}
            />
        </div>
    );
}

export default HomePage;
