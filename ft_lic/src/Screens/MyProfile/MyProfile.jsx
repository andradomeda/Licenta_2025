import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/NavBar/NavBar';
import { useGlobalContext } from '../../GlobalContext';

const MyProfile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, volunteer, token } = useGlobalContext();
    const [profile, setProfile] = useState(null);
    const [editedProfile, setEditedProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [elders, setElders] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
            return;
        }
        fetchProfile();
    }, [isAuthenticated]);

    const fetchProfile = async () => {
        try {
            console.log("📥 Token folosit pentru fetchProfile:", token);

            const [profileRes, connectionsRes] = await Promise.all([
                axios.get('http://localhost:3000/volunteers/me', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:3000/connections', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            const myProfile = profileRes.data;
            console.log("👤 Profil primit:", myProfile);
            console.log("🔗 Toate conexiunile:", connectionsRes.data);

            const myElders = connectionsRes.data.filter(conn => {
                return Number(conn.volunteer_id) === Number(myProfile.id);
            });

            console.log("✅ Conexiuni filtrate (doar ale mele):", myElders);

            setProfile(myProfile);
            setEditedProfile(myProfile);
            setElders(myElders);
        } catch (error) {
            console.error('❌ Eroare la fetchProfile:', error.response?.data || error.message);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log("✏️ Date trimise pentru update:", editedProfile);

        try {
            const response = await axios.patch(
                `http://localhost:3000/volunteers/${profile.id}`,
                editedProfile,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("✅ Răspuns după update:", response.data);
            setProfile(response.data);
            setMessage("Profil actualizat cu succes.");
            setIsEditing(false);
        } catch (error) {
            console.error("❌ Eroare la actualizarea profilului:", error.response?.data || error.message);
            setMessage("Eroare la actualizarea profilului.");
        }
    };

    if (!profile) {
        return (
            <div className="min-h-screen bg-base-200">
                <Navbar />
                <div className="flex justify-center items-center h-[80vh]">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-primary">My Profile</h1>
                        <p className="text-base-content/70">Manage your volunteer information</p>
                    </div>
                    <button
                        className={`btn ${isEditing ? 'btn-error' : 'btn-primary'}`}
                        onClick={() => {
                            setIsEditing(!isEditing);
                            if (!isEditing) {
                                setEditedProfile(profile);
                            }
                        }}
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Information Card */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Personal Information</h2>
                            {isEditing ? (
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className="input input-bordered"
                                            value={editedProfile.phone || ''}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">City</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered"
                                            value={editedProfile.city || ''}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">County</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered"
                                            value={editedProfile.county || ''}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, county: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Status</span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={editedProfile.status || ''}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, status: e.target.value })}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Sending NGO</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered"
                                            value={editedProfile.sending_ngo || ''}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, sending_ngo: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-4">Save Changes</button>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="stats shadow"><div className="stat"><div className="stat-title">Name</div><div className="stat-value text-lg">{profile.name || 'Not set'}</div></div></div>
                                    <div className="stats shadow"><div className="stat"><div className="stat-title">Role</div><div className="stat-value text-lg">{profile.type || 'Not set'}</div></div></div>
                                    <div className="stats shadow"><div className="stat"><div className="stat-title">Date Joined</div><div className="stat-value text-lg">{profile.date_joined || 'Not set'}</div></div></div>
                                    <div className="stats shadow"><div className="stat"><div className="stat-title">Phone</div><div className="stat-value text-lg">{profile.phone || 'Not set'}</div></div></div>
                                    <div className="stats shadow"><div className="stat"><div className="stat-title">City</div><div className="stat-value text-lg">{profile.city || 'Not set'}</div></div></div>
                                    <div className="stats shadow"><div className="stat"><div className="stat-title">County</div><div className="stat-value text-lg">{profile.county || 'Not set'}</div></div></div>
                                    <div className="stats shadow"><div className="stat"><div className="stat-title">Status</div><div className="stat-value text-lg">{profile.status || 'Not set'}</div></div></div>
                                    <div className="stats shadow"><div className="stat"><div className="stat-title">Sending NGO</div><div className="stat-value text-lg">{profile.sending_ngo || 'Not set'}</div></div></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Assigned Elders Card */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Assigned Elders</h2>
                            <div className="space-y-4">
                                {elders.length > 0 ? (
                                    elders.map(elder => (
                                        <div key={elder.id} className="card bg-base-200">
                                            <div className="card-body">
                                                <h3 className="card-title">{elder.name}</h3>
                                                <div className="stats stats-vertical shadow">
                                                    <div className="stat"><div className="stat-title">Age</div><div className="stat-value text-lg">{elder.age}</div></div>
                                                    <div className="stat"><div className="stat-title">Location</div><div className="stat-value text-lg">{elder.location}</div></div>
                                                    <div className="stat"><div className="stat-title">Needs</div><div className="stat-value text-lg">{elder.needs}</div></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="alert alert-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>No elders assigned yet</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toast Message */}
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
