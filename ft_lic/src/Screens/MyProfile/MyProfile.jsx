import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import { useGlobalContext } from '../../GlobalContext';

const MyProfile = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useGlobalContext();
    const [profile, setProfile] = useState(null);
    const [elders, setElders] = useState([]);
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
            return;
        }
        fetchProfile();
    }, [isAuthenticated]);

    const fetchProfile = async () => {
        try {
            const [profileRes, eldersRes, eventsRes] = await Promise.all([
                axios.get('/api/profile'),
                axios.get('/api/profile/elders'),
                axios.get('/api/profile/events')
            ]);
            setProfile(profileRes.data);
            setEditedProfile(profileRes.data);
            setElders(eldersRes.data);
            setEvents(eventsRes.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('/api/profile', editedProfile);
            setProfile(editedProfile);
            setIsEditing(false);
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Error updating profile');
        }
    };

    if (!profile) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-[60vh]">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">My Profile</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Personal Information</h2>
                            {isEditing ? (
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered"
                                            value={editedProfile.name}
                                            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="input input-bordered"
                                            value={editedProfile.email}
                                            onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className="input input-bordered"
                                            value={editedProfile.phone}
                                            onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Name:</span>
                                        <span>{profile.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Email:</span>
                                        <span>{profile.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Phone:</span>
                                        <span>{profile.phone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Role:</span>
                                        <span>{profile.isAdmin ? 'Admin' : 'Volunteer'}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Assigned Elders */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Assigned Elders</h2>
                            <div className="space-y-4">
                                {elders.map(elder => (
                                    <div key={elder.id} className="card bg-base-200">
                                        <div className="card-body">
                                            <h3 className="card-title text-lg">{elder.name}</h3>
                                            <p>Age: {elder.age}</p>
                                            <p>Location: {elder.location}</p>
                                            <p>Needs: {elder.needs}</p>
                                        </div>
                                    </div>
                                ))}
                                {elders.length === 0 && (
                                    <p className="text-center text-gray-500">No elders assigned yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="card bg-base-100 shadow-xl mt-8">
                    <div className="card-body">
                        <h2 className="card-title">Upcoming Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {events.map(event => (
                                <div key={event.id} className="card bg-base-200">
                                    <div className="card-body">
                                        <h3 className="card-title">{event.title}</h3>
                                        <p>{event.description}</p>
                                        <div className="flex flex-col gap-2">
                                            <div className="badge badge-primary">{event.date}</div>
                                            <div className="badge badge-secondary">{event.location}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {events.length === 0 && (
                                <p className="text-center text-gray-500 col-span-full">No upcoming events</p>
                            )}
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

export default MyProfile;



