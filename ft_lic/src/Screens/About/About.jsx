import React, { useState, useEffect } from 'react';
import './About.css';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import NavBar from '../../Components/NavBar/NavBar';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const About = () => {
    const [statistics, setStatistics] = useState({
        totalElders: 0,
        totalVolunteers: 0,
        totalDonations: 0,
        totalAmountRaised: 0,
        startDate: '',
        eventsCount: 0
    });

    const [elderLocations, setElderLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch statistics
                const statsResponse = await fetch('http://localhost:3001/api/statistics');
                if (statsResponse.ok) {
                    const statsData = await statsResponse.json();
                    setStatistics(statsData);
                }

                // Fetch elder locations
                const locationsResponse = await fetch('http://localhost:3001/api/elders/locations');
                if (locationsResponse.ok) {
                    const locationsData = await locationsResponse.json();
                    setElderLocations(locationsData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        
        <div className="about-container">
            <NavBar />
            <div className="about-header">
                <h1>About Us</h1>
                <p className="about-description">
                    We are a dedicated team working to improve the lives of elders in Romania.
                    Our platform connects volunteers with elders who need assistance,
                    companionship, and support in their daily lives.
                </p>
            </div>

            <div className="statistics-section">
                <h2>Our Impact</h2>
                <div className="statistics-grid">
                    <div className="stat-card">
                        <h3>Total Elders Helped</h3>
                        <p className="stat-number">{statistics.totalElders}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Active Volunteers</h3>
                        <p className="stat-number">{statistics.totalVolunteers}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Donations</h3>
                        <p className="stat-number">{statistics.totalDonations}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Amount Raised</h3>
                        <p className="stat-number">{statistics.totalAmountRaised} RON</p>
                    </div>
                    <div className="stat-card">
                        <h3>Events Organized</h3>
                        <p className="stat-number">{statistics.eventsCount}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Since</h3>
                        <p className="stat-number">{new Date(statistics.startDate).getFullYear()}</p>
                    </div>
                </div>
            </div>

            <div className="map-section">
                <h2>Elder Distribution in Romania</h2>
                <div className="map-container">
                    <MapContainer
                        center={[45.9432, 24.9668]}
                        zoom={7}
                        style={{ height: '500px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {elderLocations.map((location, index) => (
                            <Marker key={index} position={[location.lat, location.lng]}>
                                <Popup>
                                    <div>
                                        <h3>{location.city}</h3>
                                        <p>Elders: {location.count}</p>
                                    </div>
                                </Popup>
                                <Tooltip>
                                    {location.city}: {location.count} elders
                                </Tooltip>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            <div className="mission-section">
                <h2>Our Mission</h2>
                <p>
                    Our mission is to create a supportive community where elders can receive
                    the help and companionship they need, while volunteers can make a meaningful
                    difference in their lives. We believe in the power of human connection
                    and the importance of caring for our elders.
                </p>
            </div>

            <div className="values-section">
                <h2>Our Values</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <h3>Compassion</h3>
                        <p>We approach every interaction with empathy and understanding.</p>
                    </div>
                    <div className="value-card">
                        <h3>Respect</h3>
                        <p>We honor the dignity and life experience of every elder.</p>
                    </div>
                    <div className="value-card">
                        <h3>Community</h3>
                        <p>We believe in the power of bringing people together.</p>
                    </div>
                    <div className="value-card">
                        <h3>Commitment</h3>
                        <p>We are dedicated to making a lasting positive impact.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 