import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/NavBar/NavBar';
import { useGlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const { isAuthenticated, volunteer, token } = useGlobalContext();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventData, setNewEventData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'pending',
  });

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
      console.error("❌ Eroare la evenimentele acceptate:", error);
    }
  };

  const fetchPendingEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events');
      const pending = response.data.filter(event => event.status === 'pending');
      setPendingEvents(pending);
    } catch (error) {
      console.error("❌ Eroare la pending:", error);
    }
  };

  const handleAttend = async (eventId) => {
    if (!volunteer || !token) {
      setMessage("Trebuie să fii autentificat.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/events/${eventId}/participate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`Te-ai înscris la evenimentul #${eventId}`);
    } catch (error) {
      if (error.response?.status === 400) {
        setMessage("Ești deja înscris.");
      } else if (error.response?.status === 403) {
        setMessage("Acces interzis. Verifică autentificarea.");
      } else {
        setMessage("Eroare la înscriere.");
      }
    }
  };

  const handleApproveEvent = async (eventId) => {
    if (!token || !volunteer || volunteer.type !== "admin") {
      setMessage("Nu ai permisiunea să aprobi evenimente.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3000/events/${eventId}`,
        { status: 'accepted' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Eveniment aprobat.");
      fetchEvents();
      fetchPendingEvents();
    } catch (error) {
      setMessage("Eroare la aprobare.");
    }
  };

  const handleUpdateEvent = async (eventId, updatedData) => {
    try {
      await axios.patch(`http://localhost:3000/events/${eventId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPendingEvents();
    } catch (error) {
      setMessage("Eroare la actualizare.");
    }
  };

  const handleAddEvent = async (eventData, token) => {
    try {
      console.log("📤 [handleAddEvent] Trimit date pentru eveniment:", {
        ...eventData,
        volunteerId: volunteer?.id
      });

      console.log("🔑 [handleAddEvent] Token trimis:", token);

      const response = await axios.post('http://localhost:3000/events', {
        ...eventData,
        volunteerId: volunteer?.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("✅ [handleAddEvent] Eveniment adăugat cu succes:", response.data);
      return response.data;

    } catch (error) {
      console.error("❌ [handleAddEvent] Eroare la trimiterea evenimentului:", error.response?.data || error.message);
      console.error("🔐 [handleAddEvent] Token la momentul erorii:", token);
      throw error;
    }
  };

  const handleAddEventSubmit = async (e) => {
    e.preventDefault();
    const { name, description, startDate, endDate } = newEventData;

    console.log("📝 [handleAddEventSubmit] Date introduse în formular:", newEventData);
    console.log("🔐 [handleAddEventSubmit] Token curent:", token);
    console.log("👤 [handleAddEventSubmit] Volunteer curent:", volunteer);

    if (!name || !description || !startDate || !endDate) {
      console.warn("⚠️ [handleAddEventSubmit] Formular incomplet.");
      setMessage("Completează toate câmpurile.");
      return;
    }

    try {
      await handleAddEvent(newEventData, token);
      setMessage("Eveniment adăugat cu succes.");
      setShowAddModal(false);
      setNewEventData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'pending',
      });
      fetchEvents();
    } catch (err) {
      console.error("❌ [handleAddEventSubmit] Eroare în handleAddEventSubmit:", err.response?.data || err.message);
      console.error("🔐 [handleAddEventSubmit] Token în momentul erorii:", token);
      setMessage("Eroare la adăugare eveniment.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Events</h1>
          {isAuthenticated && (
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              Add Event
            </button>
          )}
          {volunteer?.type === "admin" && (
            <button className="btn btn-secondary ml-4" onClick={() => setShowPendingModal(true)}>
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
                  <div className="badge badge-primary">{event.startDate}</div>
                  <div className="badge badge-secondary">{event.location}</div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary" onClick={() => handleAttend(event.id)}>
                    I'm Attending
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Add New Event</h3>
              <form onSubmit={handleAddEventSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  value={newEventData.name}
                  onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  className="textarea textarea-bordered w-full"
                  value={newEventData.description}
                  onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
                />
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={newEventData.startDate}
                  onChange={(e) => setNewEventData({ ...newEventData, startDate: e.target.value })}
                />
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={newEventData.endDate}
                  onChange={(e) => setNewEventData({ ...newEventData, endDate: e.target.value })}
                />
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                          value={event.startDate}
                          onChange={(e) => handleUpdateEvent(event.id, { startDate: e.target.value })}
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
                        <button className="btn btn-success" onClick={() => handleApproveEvent(event.id)}>
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-action">
                <button className="btn" onClick={() => setShowPendingModal(false)}>
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
