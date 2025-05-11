import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from '../../Components/NavBar/NavBar';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const About = () => {
  const [stats, setStats] = useState({
    totalEldersHelped: 0,
    activeVolunteers: 0,
    totalDonations: 0,
    amountRaised: 0,
    eventsOrganized: 0
  });
  
  const [elders, setElders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const eldersRes = await axios.get('/elders');
        console.log("Elders fetched:", eldersRes.data);
        setElders(eldersRes.data);

        const volunteersRes = await axios.get('/volunteers/active');
        console.log("Volunteers fetched:", volunteersRes.data);

        const donationsRes = await axios.get('/donations/statistics');
        console.log("Donations stats fetched:", donationsRes.data);

        const eventsRes = await axios.get('/events/accepted');
        console.log("Accepted events fetched:", eventsRes.data);

        const activeVolunteers = volunteersRes.data.filter(v => v.status === 'active');
        console.log("Active volunteers:", activeVolunteers);

        const newStats = {
          totalEldersHelped: eldersRes.data.length,
          activeVolunteers: activeVolunteers.length,
          totalDonations: donationsRes.data.totalDonations,
          amountRaised: donationsRes.data.totalAmount,
          eventsOrganized: eventsRes.data.length
        };

        console.table(newStats);
        setStats(newStats);
      } catch (error) {
        console.error("Eroare la fetch statistics:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="stat bg-base-100 shadow-xl rounded-lg">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="stat-title">Total Elders Helped</div>
            <div className="stat-value text-primary">{stats.totalEldersHelped}</div>
          </div>

          <div className="stat bg-base-100 shadow-xl rounded-lg">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="stat-title">Active Volunteers</div>
            <div className="stat-value text-secondary">{stats.activeVolunteers}</div>
          </div>

          <div className="stat bg-base-100 shadow-xl rounded-lg">
            <div className="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-title">Total Donations</div>
            <div className="stat-value text-accent">{stats.totalDonations}</div>
          </div>

          <div className="stat bg-base-100 shadow-xl rounded-lg">
            <div className="stat-figure text-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-title">Amount Raised</div>
            <div className="stat-value text-info">${stats.amountRaised}</div>
          </div>

          <div className="stat bg-base-100 shadow-xl rounded-lg">
            <div className="stat-figure text-success">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="stat-title">Events Organized</div>
            <div className="stat-value text-success">{stats.eventsOrganized}</div>
          </div>

          <div className="stat bg-base-100 shadow-xl rounded-lg">
            <div className="stat-figure text-warning">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-title">Since</div>
            <div className="stat-value text-warning">April 10, 2025</div>
          </div>
        </div>

        {/* Map Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Elder Distribution in Romania</h2>
            <div className="h-[500px] w-full">
              <MapContainer
                center={[45.9432, 24.9668]}
                zoom={7}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {elders.map(elder => (
                  <Marker
                    key={elder.id}
                    position={[elder.lat, elder.lng]}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{elder.name}</h3>
                        <p>Age: {elder.age}</p>
                        <p>Needs: {elder.needs}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
