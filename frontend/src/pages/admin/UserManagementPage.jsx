import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../api/axios'

const ROLE_STYLES = {
  admin: 'bg-red-100 text-red-600',
  organizer: 'bg-blue-100 text-blue-700',
  participant: 'bg-gray-100 text-gray-600',
}

export default function UserManagementPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    api.get('/admin/users/').then(({ data }) => setUsers(data)).finally(() => setLoading(false))
  }, [])

  const changeRole = async (userId, role) => {
    setUpdatingId(userId)
    try {
      const { data } = await api.patch(`/admin/users/${userId}/change_role/`, { role })
      setUsers(us => us.map(u => u.id === userId ? data : u))
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <Link to="/admin" className="text-primary-600 text-sm hover:underline">← Dashboard</Link>
        </div>

        <div className="mb-5">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['ID', 'Name', 'Email', 'Phone', 'Role', 'Joined', 'Change Role'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4 text-gray-400">#{u.id}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{u.name}</td>
                    <td className="px-5 py-4 text-gray-500">{u.email}</td>
                    <td className="px-5 py-4 text-gray-400">{u.phone || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${ROLE_STYLES[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(u.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <select value={u.role}
                        onChange={e => changeRole(u.id, e.target.value)}
                        disabled={updatingId === u.id}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50">
                        <option value="participant">Participant</option>
                        <option value="organizer">Organizer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">No users found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
