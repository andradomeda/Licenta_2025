import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from '../../Components/Navbar/Navbar';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const General = () => {
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState('');
  const [elderData, setElderData] = useState({
    name: '',
    age: '',
    location: '',
    needs: '',
    lat: '',
    lng: ''
  });
  const [selectedElder, setSelectedElder] = useState(null);
  const [elders, setElders] = useState([]);
  const [message, setMessage] = useState('');

  const handleDonation = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/donations', { amount: parseFloat(donationAmount) });
      setMessage('Donation logged successfully!');
      setDonationAmount('');
    } catch (error) {
      setMessage('Error logging donation');
    }
  };

  const handleElderSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/elders', elderData);
      setMessage('Elder added successfully!');
      setElderData({
        name: '',
        age: '',
        location: '',
        needs: '',
        lat: '',
        lng: ''
      });
    } catch (error) {
      setMessage('Error adding elder');
    }
  };

  const handleElderUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/elders/${selectedElder.id}`, elderData);
      setMessage('Elder updated successfully!');
      setSelectedElder(null);
    } catch (error) {
      setMessage('Error updating elder');
    }
  };

  const handleLocationSelect = (location) => {
    // This would be implemented with a proper geocoding service
    // For now, we'll use dummy coordinates
    setElderData({
      ...elderData,
      location,
      lat: '45.9432',
      lng: '24.9668'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Volunteer Activities</h1>
        
        {/* Donation Form */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Log Donation</h2>
            <form onSubmit={handleDonation} className="form-control">
              <input
                type="number"
                placeholder="Donation Amount"
                className="input input-bordered w-full"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary mt-4">Log Donation</button>
            </form>
          </div>
        </div>

        {/* Elder Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add New Elder */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Add New Elder</h2>
              <form onSubmit={handleElderSubmit} className="form-control">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered mb-4"
                  value={elderData.name}
                  onChange={(e) => setElderData({...elderData, name: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  className="input input-bordered mb-4"
                  value={elderData.age}
                  onChange={(e) => setElderData({...elderData, age: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="input input-bordered mb-4"
                  value={elderData.location}
                  onChange={(e) => setElderData({...elderData, location: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Needs"
                  className="textarea textarea-bordered mb-4"
                  value={elderData.needs}
                  onChange={(e) => setElderData({...elderData, needs: e.target.value})}
                  required
                />
                <button type="submit" className="btn btn-primary">Add Elder</button>
              </form>
            </div>
          </div>

          {/* Update Elder */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Update Elder Details</h2>
              <select
                className="select select-bordered w-full mb-4"
                onChange={(e) => setSelectedElder(elders.find(elder => elder.id === e.target.value))}
              >
                <option value="">Select an elder</option>
                {elders.map(elder => (
                  <option key={elder.id} value={elder.id}>{elder.name}</option>
                ))}
              </select>
              {selectedElder && (
                <form onSubmit={handleElderUpdate} className="form-control">
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered mb-4"
                    value={elderData.name}
                    onChange={(e) => setElderData({...elderData, name: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    className="input input-bordered mb-4"
                    value={elderData.age}
                    onChange={(e) => setElderData({...elderData, age: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="input input-bordered mb-4"
                    value={elderData.location}
                    onChange={(e) => setElderData({...elderData, location: e.target.value})}
                  />
                  <textarea
                    placeholder="Needs"
                    className="textarea textarea-bordered mb-4"
                    value={elderData.needs}
                    onChange={(e) => setElderData({...elderData, needs: e.target.value})}
                  />
                  <button type="submit" className="btn btn-primary">Update Elder</button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Display */}
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title">Elder Distribution Map</h2>
            <div className="h-[400px] w-full">
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

        {message && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-info">
              <span>{message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default General; 