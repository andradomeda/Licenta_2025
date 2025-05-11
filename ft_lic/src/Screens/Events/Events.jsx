import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import { useGlobalContext } from '../../GlobalContext';

const Events = () => {
  const navigate = useNavigate();
  const { isAuthenticated, volunteer  } = useGlobalContext();
  const [events, setEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvents();
    if (volunteer?.type === "admin") {
      fetchPendingEvents();
    }
  }, [volunteer]);

 const fetchEvents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/events/accepted');
    setEvents(response.data);
  } catch (error) {
    console.error('Eroare la obținerea evenimentelor aprobate:', error);
  }
};

const fetchPendingEvents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/events');
    // Filtrăm local evenimentele neacceptate
    const pending = response.data.filter(event => event.status === 'pending');
    setPendingEvents(pending);
  } catch (error) {
    console.error('Eroare la obținerea evenimentelor neacceptate:', error);
  }
};
 const handleApproveEvent = async (eventId) => {
  try {
    await axios.patch(`http://localhost:3000/events/${eventId}`, {
      status: 'accepted'
    });

    setMessage('Eveniment aprobat cu succes!');
    fetchEvents();
    fetchPendingEvents();
    setShowPendingModal(false);
  } catch (error) {
    console.error(error);
    setMessage('Eroare la aprobarea evenimentului');
  }
};

const handleAttend = (id) => {
  setMessage(`You are marked as attending event #${id}`);
};

 const handleUpdateEvent = async (eventId, updatedData) => {
  try {
    const token = volunteer?.token; // presupunând că token-ul e stocat în GlobalContext

    await axios.patch(`http://localhost:3000/events/${eventId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setMessage('Eveniment actualizat cu succes!');
    fetchPendingEvents();
  } catch (error) {
    console.error(error);
    setMessage('Eroare la actualizarea evenimentului');
  }
};


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Events</h1>
          {isAuthenticated && (
            <button
              className="btn btn-primary"
              onClick={() => navigate('/events')}
            >
              Add Event
            </button>
          )}
          {volunteer?.type === "admin" && (
            <button
              className="btn btn-secondary ml-4"
              onClick={() => setShowPendingModal(true)}
            >
              Pending Events ({pendingEvents.length})
            </button>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={event.image || 'https://placehold.co/600x400'} alt={event.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p>{event.description}</p>
                <div className="flex flex-col gap-2">
                  <div className="badge badge-primary">{event.date}</div>
                  <div className="badge badge-secondary">{event.location}</div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAttend(event.id)}
                  >
                    I'm Attending
                  </button>
                </div>
                {!isAuthenticated && message && (
                  <div className="text-sm text-error mt-2">
                    {message}
                    <button
                      className="link link-primary ml-2"
                      onClick={() => navigate('/auth')}
                    >
                      Register here
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pending Events Modal */}
        {showPendingModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Pending Events</h3>
              <div className="space-y-4">
                {pendingEvents.map(event => (
                  <div key={event.id} className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title">{event.title}</h4>
                      <p>{event.description}</p>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Date"
                          className="input input-bordered"
                          value={event.date}
                          onChange={(e) => handleUpdateEvent(event.id, { date: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          className="input input-bordered"
                          value={event.location}
                          onChange={(e) => handleUpdateEvent(event.id, { location: e.target.value })}
                        />
                      </div>
                      <div className="card-actions justify-end mt-4">
                        <button
                          className="btn btn-success"
                          onClick={() => handleApproveEvent(event.id)}
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setShowPendingModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

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

export default Events; 