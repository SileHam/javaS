import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../api/axios'

export default function EventListPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchEvents = (p = 1) => {
    setLoading(true)
    const params = new URLSearchParams({ page: p })
    if (search) params.set('search', search)
    if (location) params.set('location', location)
    if (dateFrom) params.set('date_from', dateFrom)

    api.get(`/events/?${params}`)
      .then(({ data }) => {
        setEvents(data.results || [])
        setTotalPages(Math.ceil((data.count || 0) / 10))
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchEvents(1) }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchEvents(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h1>

        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 flex flex-wrap gap-4">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="flex-1 min-w-[160px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <input value={location} onChange={e => setLocation(e.target.value)}
            placeholder="Location..."
            className="flex-1 min-w-[140px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <button type="submit"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition text-sm">
            Search
          </button>
        </form>

        {loading ? <LoadingSpinner /> : (
          <>
            {events.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-lg">No events found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => { setPage(p); fetchEvents(p) }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${p === page ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
