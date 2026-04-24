import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import api from '../api/axios'

export default function HomePage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get('/events/?page=1').then(({ data }) => {
      setEvents(data.results?.slice(0, 6) || [])
    }).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Manage & Discover<br />Events Effortlessly
          </h1>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            EventMaster is your all-in-one platform for creating, managing, and
            attending professional events — with smart registration, badges, and AI insights.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/events"
              className="bg-white text-primary-700 font-bold px-8 py-3 rounded-full hover:bg-primary-50 transition shadow">
              Browse Events
            </Link>
            <Link to="/register"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-primary-700 transition">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why EventMaster?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎟️', title: 'Easy Registration', desc: 'Register for events in seconds with status tracking and instant confirmation emails.' },
              { icon: '📊', title: 'AI Predictions', desc: 'Get smart attendance forecasts powered by machine learning to plan better.' },
              { icon: '🎫', title: 'Digital Badges', desc: 'Download personalized QR-coded badges for confirmed participants.' },
            ].map((f) => (
              <div key={f.title} className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {events.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Featured Events</h2>
              <Link to="/events" className="text-primary-600 font-medium hover:underline">View all →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-primary-900 text-primary-200 text-center py-6 text-sm">
        © {new Date().getFullYear()} EventMaster. All rights reserved.
      </footer>
    </div>
  )
}
