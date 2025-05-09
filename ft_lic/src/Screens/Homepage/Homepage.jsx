import { useEffect, useState } from 'react';
import Background from '../../Components/Background/Background';
import NavBar from '../../Components/NavBar/NavBar';
import Hero from '../../Components/Hero/Hero';
import ChatBox from '../../Components/ChatBox/ChatBox';
import './Homepage.css';

function HomePage() {
    const [heroCount, setHeroCount] = useState(0);
    const [playStatus, setPlayStatus] = useState(false);
    const [showElderHelp, setShowElderHelp] = useState(false);
    const [showDonate, setShowDonate] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    let heroData = [
        { 
            text1: "Cine nu are bunici", 
            text2: "să-și cumpere",
            copyright: "© 2024 Voluntari pentru Bătrâni"
        },
        { 
            text1: "Tanti Geta", 
            text2: "are multe să-ți povestească",
            copyright: "© 2024 Voluntari pentru Bătrâni"
        },
        { 
            text1: "Tinerii aleargă", 
            text2: "bătrânii știu drumul",
            copyright: "© 2024 Voluntari pentru Bătrâni"
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroCount((count) => (count === 2 ? 0 : count + 1));
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleElderHelpSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the phone number to your backend
        console.log('Phone number submitted:', phoneNumber);
        setShowElderHelp(false);
        setPhoneNumber('');
    };

    return (
        <div className="homepage">
            <Background playStatus={playStatus} heroCount={heroCount} />
            <NavBar/>
            <Hero
                setPlayStatus={setPlayStatus}
                heroData={heroData[heroCount]}
                heroCount={heroCount}
                setHeroCount={setHeroCount}
                playStatus={playStatus}
            />
            
            <div className="action-buttons">
                <button 
                    className="volunteer-btn"
                    onClick={() => window.location.href = '/auth'}
                >
                    Become a Volunteer
                </button>
                <button 
                    className="elder-help-btn"
                    onClick={() => setShowElderHelp(true)}
                >
                    I'm an Elder and Need Help
                </button>
                <button 
                    className="donate-btn"
                    onClick={() => setShowDonate(true)}
                >
                    Donate
                </button>
            </div>

            {showElderHelp && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>How can we help you?</h2>
                        <p>Call us at: <strong>+40 123 456 789</strong></p>
                        <p>Or leave your phone number and we'll call you:</p>
                        <form onSubmit={handleElderHelpSubmit}>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={() => setShowElderHelp(false)}>Close</button>
                    </div>
                </div>
            )}

            {showDonate && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Support Our Cause</h2>
                        <p>You can donate through:</p>
                        <ul>
                            <li>Revolut: <strong>@voluntaripentrubatrani</strong></li>
                            <li>Bank Account: <strong>RO49XXXX XXXX XXXX XXXX XXXX</strong></li>
                        </ul>
                        <button onClick={() => setShowDonate(false)}>Close</button>
                    </div>
                </div>
            )}

            <ChatBox />
            
            <div className="copyright">
                {heroData[heroCount].copyright}
            </div>
        </div>
    );
}

export default HomePage;
