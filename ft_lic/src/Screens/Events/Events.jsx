import React, { useState, useEffect } from 'react';
import './Events.css';
import NavBar from '../../Components/NavBar/NavBar';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/events');
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleJoinEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirect to login or show login modal
                return;
            }

            const response = await fetch(`http://localhost:3001/api/events/${eventId}/join`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Update the event in the list
                setEvents(events.map(event => {
                    if (event.id === eventId) {
                        return {
                            ...event,
                            joined: true,
                            volunteersCount: event.volunteersCount + 1
                        };
                    }
                    return event;
                }));
            }
        } catch (error) {
            console.error('Error joining event:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading events...</div>;
    }

    return (
        <div className="events-container">
            <NavBar />
            <h1>Upcoming Events</h1>
            <div className="events-grid">
                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <h2>{event.name}</h2>
                        <p className="event-description">{event.description}</p>
                        <div className="event-dates">
                            <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                            {event.endDate && (
                                <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
                            )}
                        </div>
                        <div className="event-volunteers">
                            <p><strong>Volunteers:</strong> {event.volunteersCount}</p>
                        </div>
                        <button
                            className={`join-button ${event.joined ? 'joined' : ''}`}
                            onClick={() => handleJoinEvent(event.id)}
                            disabled={event.joined}
                        >
                            {event.joined ? 'Joined' : 'Join Event'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events; 