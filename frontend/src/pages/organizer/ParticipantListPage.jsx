import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../api/axios'

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
}

export default function ParticipantListPage() {
  const { id } = useParams()
  const [registrations, setRegistrations] = useState([])
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchData = () => {
    Promise.all([
      api.get(`/events/${id}/`),
      api.get(`/registrations/event/${id}/`),
    ]).then(([evRes, regRes]) => {
      setEvent(evRes.data)
      setRegistrations(regRes.data)
    }).finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [id])

  const updateStatus = async (regId, status) => {
    await api.patch(`/registrations/${regId}/update_status/`, { status })
    fetchData()
  }

  const filtered = registrations.filter(r =>
    r.participant?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.participant?.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-800">Participants</h1>
          <Link to="/organizer" className="text-primary-600 text-sm hover:underline">← Back</Link>
        </div>
        {event && <p className="text-gray-500 mb-8 text-sm">{event.title}</p>}

        <div className="flex gap-3 mb-6 flex-wrap">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <a href={`/api/exports/event/${id}/pdf/`} target="_blank" rel="noreferrer"
            className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition">
            Export PDF
          </a>
          <a href={`/api/exports/event/${id}/excel/`} target="_blank" rel="noreferrer"
            className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition">
            Export Excel
          </a>
          <Link to={`/organizer/events/${id}/predict`}
            className="bg-purple-50 text-purple-700 border border-purple-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition">
            AI Prediction
          </Link>
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['#', 'Name', 'Email', 'Phone', 'Status', 'Notes', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((reg, i) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4 text-gray-400">{i + 1}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{reg.participant?.name}</td>
                    <td className="px-5 py-4 text-gray-500">{reg.participant?.email}</td>
                    <td className="px-5 py-4 text-gray-500">{reg.participant?.phone || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[reg.status]}`}>{reg.status}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 max-w-[140px] truncate">{reg.notes || '—'}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {reg.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(reg.id, 'confirmed')}
                              className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-green-100 transition">
                              Confirm
                            </button>
                            <button onClick={() => updateStatus(reg.id, 'cancelled')}
                              className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-100 transition">
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">No participants found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
