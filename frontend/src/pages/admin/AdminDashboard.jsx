import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Navbar from '../../components/Navbar'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../api/axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats/'),
      api.get('/admin/users/'),
    ]).then(([sRes, uRes]) => {
      setStats(sRes.data)
      setUsers(uRes.data.slice(0, 5))
    }).finally(() => setLoading(false))
  }, [])

  const chartData = stats ? [
    { name: 'Users', value: stats.total_users },
    { name: 'Events', value: stats.total_events },
    { name: 'Registrations', value: stats.total_registrations },
    { name: 'Active Events', value: stats.active_events },
    { name: 'Organizers', value: stats.organizers },
    { name: 'Participants', value: stats.participants },
  ] : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link to="/admin/users"
            className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition text-sm">
            Manage Users
          </Link>
        </div>

        {loading ? <LoadingSpinner /> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
              {[
                { label: 'Total Users', value: stats?.total_users, color: 'text-primary-600' },
                { label: 'Total Events', value: stats?.total_events, color: 'text-purple-600' },
                { label: 'Registrations', value: stats?.total_registrations, color: 'text-green-600' },
                { label: 'Active Events', value: stats?.active_events, color: 'text-blue-500' },
                { label: 'Organizers', value: stats?.organizers, color: 'text-orange-500' },
                { label: 'Participants', value: stats?.participants, color: 'text-teal-500' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                  <p className={`text-3xl font-extrabold ${s.color}`}>{s.value ?? 0}</p>
                  <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-700 mb-5">Platform Overview</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-700">Recent Users</h2>
                  <Link to="/admin/users" className="text-primary-600 text-sm hover:underline">View all →</Link>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Name', 'Email', 'Role'].map(h => (
                        <th key={h} className="pb-2 text-left text-xs text-gray-400 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map(u => (
                      <tr key={u.id}>
                        <td className="py-2.5 font-medium text-gray-800">{u.name}</td>
                        <td className="py-2.5 text-gray-500 text-xs">{u.email}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                            u.role === 'admin' ? 'bg-red-100 text-red-600' :
                            u.role === 'organizer' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                          }`}>{u.role}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
