import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyProfile.css';
import NavBar from '../../Components/NavBar/NavBar';

const MyProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [pendingElders, setPendingElders] = useState([]);
    const [eventRequests, setEventRequests] = useState([]);
    const [elders, setElders] = useState([]);
    const [showNewElderForm, setShowNewElderForm] = useState(false);
    const [showDonationForm, setShowDonationForm] = useState(false);
    const [newElderData, setNewElderData] = useState({
        name: '',
        phone: '',
        city: '',
        county: '',
        needs: ''
    });
    const [donationData, setDonationData] = useState({
        amount: '',
        date: '',
        description: ''
    });

    useEffect(() => {
        // Fetch user data from backend
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/auth');
                    return;
                }

                const response = await fetch('http://localhost:3001/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    navigate('/auth');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                setIsEditing(false);
                // Show success message
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleNewElderSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/elders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newElderData)
            });

            if (response.ok) {
                setShowNewElderForm(false);
                setNewElderData({
                    name: '',
                    phone: '',
                    city: '',
                    county: '',
                    needs: ''
                });
                // Refresh elders list
            }
        } catch (error) {
            console.error('Error adding new elder:', error);
        }
    };

    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(donationData)
            });

            if (response.ok) {
                setShowDonationForm(false);
                setDonationData({
                    amount: '',
                    date: '',
                    description: ''
                });
                // Show success message
            }
        } catch (error) {
            console.error('Error adding donation:', error);
        }
    };

    const handlePairWithElder = async (elderId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/api/elders/${elderId}/pair`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Refresh elders list
            }
        } catch (error) {
            console.error('Error pairing with elder:', error);
        }
    };

    const handleEventRequest = async (requestId, action) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/api/events/requests/${requestId}/${action}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Refresh event requests list
            }
        } catch (error) {
            console.error('Error handling event request:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <NavBar />
            <div className="profile-header">
                <h1>My Profile</h1>
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h2>Personal Information</h2>
                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input
                                    type="tel"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input
                                    type="text"
                                    value={userData.city}
                                    onChange={(e) => setUserData({...userData, city: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>County:</label>
                                <input
                                    type="text"
                                    value={userData.county}
                                    onChange={(e) => setUserData({...userData, county: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <select
                                    value={userData.status}
                                    onChange={(e) => setUserData({...userData, status: e.target.value})}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <button type="submit">Save Changes</button>
                        </form>
                    ) : (
                        <div className="profile-info">
                            <p><strong>Name:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Phone:</strong> {userData.phone}</p>
                            <p><strong>City:</strong> {userData.city}</p>
                            <p><strong>County:</strong> {userData.county}</p>
                            <p><strong>Status:</strong> {userData.status}</p>
                        </div>
                    )}
                </div>

                {userData.isAdmin && (
                    <div className="profile-section">
                        <h2>Admin Functions</h2>
                        <button onClick={() => setShowNewElderForm(true)}>Add New Elder</button>
                        <button onClick={() => setShowDonationForm(true)}>Log New Donation</button>
                        
                        {showNewElderForm && (
                            <div className="popup-overlay">
                                <div className="popup-content">
                                    <h3>Add New Elder</h3>
                                    <form onSubmit={handleNewElderSubmit}>
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input
                                                type="text"
                                                value={newElderData.name}
                                                onChange={(e) => setNewElderData({...newElderData, name: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone:</label>
                                            <input
                                                type="tel"
                                                value={newElderData.phone}
                                                onChange={(e) => setNewElderData({...newElderData, phone: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>City:</label>
                                            <input
                                                type="text"
                                                value={newElderData.city}
                                                onChange={(e) => setNewElderData({...newElderData, city: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>County:</label>
                                            <input
                                                type="text"
                                                value={newElderData.county}
                                                onChange={(e) => setNewElderData({...newElderData, county: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Needs:</label>
                                            <textarea
                                                value={newElderData.needs}
                                                onChange={(e) => setNewElderData({...newElderData, needs: e.target.value})}
                                            />
                                        </div>
                                        <button type="submit">Add Elder</button>
                                        <button type="button" onClick={() => setShowNewElderForm(false)}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {showDonationForm && (
                            <div className="popup-overlay">
                                <div className="popup-content">
                                    <h3>Log New Donation</h3>
                                    <form onSubmit={handleDonationSubmit}>
                                        <div className="form-group">
                                            <label>Amount:</label>
                                            <input
                                                type="number"
                                                value={donationData.amount}
                                                onChange={(e) => setDonationData({...donationData, amount: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Date:</label>
                                            <input
                                                type="date"
                                                value={donationData.date}
                                                onChange={(e) => setDonationData({...donationData, date: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Description:</label>
                                            <textarea
                                                value={donationData.description}
                                                onChange={(e) => setDonationData({...donationData, description: e.target.value})}
                                            />
                                        </div>
                                        <button type="submit">Log Donation</button>
                                        <button type="button" onClick={() => setShowDonationForm(false)}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div className="pending-elders">
                            <h3>Pending Elder Requests</h3>
                            {pendingElders.map(elder => (
                                <div key={elder.id} className="elder-card">
                                    <p><strong>Name:</strong> {elder.name}</p>
                                    <p><strong>Phone:</strong> {elder.phone}</p>
                                    <p><strong>City:</strong> {elder.city}</p>
                                    <p><strong>County:</strong> {elder.county}</p>
                                    <button onClick={() => handlePairWithElder(elder.id)}>Pair with Elder</button>
                                </div>
                            ))}
                        </div>

                        <div className="event-requests">
                            <h3>Event Requests</h3>
                            {eventRequests.map(request => (
                                <div key={request.id} className="request-card">
                                    <p><strong>Event Name:</strong> {request.name}</p>
                                    <p><strong>Description:</strong> {request.description}</p>
                                    <p><strong>Start Date:</strong> {request.startDate}</p>
                                    <p><strong>End Date:</strong> {request.endDate}</p>
                                    <button onClick={() => handleEventRequest(request.id, 'accept')}>Accept</button>
                                    <button onClick={() => handleEventRequest(request.id, 'reject')}>Reject</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="profile-section">
                    <h2>Available Elders</h2>
                    <div className="elders-grid">
                        {elders.map(elder => (
                            <div key={elder.id} className="elder-card">
                                <p><strong>Name:</strong> {elder.name}</p>
                                <p><strong>City:</strong> {elder.city}</p>
                                <p><strong>County:</strong> {elder.county}</p>
                                <p><strong>Current Pairs:</strong> {elder.pairs}</p>
                                <button onClick={() => handlePairWithElder(elder.id)}>Pair with Elder</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
