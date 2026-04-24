import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function EventDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [registering, setRegistering] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    api.get(`/events/${id}/`).then(({ data }) => setEvent(data)).finally(() => setLoading(false))
  }, [id])

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    setRegistering(true)
    setMessage(null)
    try {
      await api.post('/registrations/', { event_id: id, notes })
      setMessage({ type: 'success', text: 'Registered successfully! Check your email for confirmation.' })
      const { data } = await api.get(`/events/${id}/`)
      setEvent(data)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Registration failed.' })
    } finally {
      setRegistering(false)
    }
  }

  if (loading) return <><Navbar /><LoadingSpinner /></>
  if (!event) return <><Navbar /><div className="text-center py-20 text-gray-400">Event not found.</div></>

  const isFull = event.available_spots === 0
  const isCancelled = event.status === 'cancelled'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        {event.banner_image ? (
          <img src={event.banner_image} alt={event.title} className="w-full h-64 object-cover rounded-2xl mb-8 shadow" />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-8 flex items-center justify-center">
            <span className="text-white text-6xl font-bold opacity-30">{event.title[0]}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.status === 'active' ? 'bg-green-100 text-green-700' :
              event.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
            }`}>{event.status}</span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Date & Time</p>
              <p className="font-semibold text-gray-800">
                {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-gray-600">{new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Location</p>
              <p className="font-semibold text-gray-800">{event.is_online ? 'Online Event' : event.location}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Capacity</p>
              <p className="font-semibold text-gray-800">{event.capacity} seats</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Available</p>
              <p className={`font-semibold ${isFull ? 'text-red-600' : 'text-green-600'}`}>
                {isFull ? 'Fully booked' : `${event.available_spots} spots left`}
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            Organized by <span className="font-medium text-gray-700">{event.organizer?.name}</span>
          </div>

          {message && (
            <div className={`px-4 py-3 rounded-lg mb-5 text-sm ${
              message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-600'
            }`}>{message.text}</div>
          )}

          {!isCancelled && !isFull && user?.role === 'participant' && (
            <form onSubmit={handleRegister}>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Any notes or special requirements? (optional)"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
              <button type="submit" disabled={registering}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition disabled:opacity-60">
                {registering ? 'Registering...' : 'Register for this Event'}
              </button>
            </form>
          )}

          {!user && (
            <p className="text-gray-500 text-sm">
              <a href="/login" className="text-primary-600 font-semibold hover:underline">Sign in</a> to register for this event.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
