import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer, CartesianGrid } from 'recharts'
import Navbar from '../../components/Navbar'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../api/axios'

function GaugeDisplay({ value }) {
  const pct = Math.min(Math.max(value, 0), 100)
  const color = pct >= 75 ? '#16a34a' : pct >= 40 ? '#2563eb' : '#dc2626'
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 60" className="w-full">
          <path d="M 10 55 A 40 40 0 0 1 90 55" stroke="#e5e7eb" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M 10 55 A 40 40 0 0 1 90 55" stroke={color} strokeWidth="10" fill="none" strokeLinecap="round"
            strokeDasharray={`${pct * 1.257} 125.7`} />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="text-3xl font-extrabold" style={{ color }}>{pct.toFixed(1)}%</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-2">Predicted attendance rate</p>
    </div>
  )
}

export default function AIPredictionPage() {
  const { id } = useParams()
  const [prediction, setPrediction] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get(`/ai/predict/${id}/`),
      api.get(`/ai/profile/${id}/`),
    ]).then(([predRes, profRes]) => {
      setPrediction(predRes.data)
      setProfile(profRes.data)
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return <><Navbar /><LoadingSpinner /></>

  const byDayData = profile ? Object.entries(profile.registrations_by_day).map(([date, count]) => ({
    date: date.slice(5), count
  })).reverse() : []

  const hourData = profile ? [
    { name: 'Peak Hour', hour: `${profile.peak_registration_hour}:00`, value: 1 }
  ] : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">AI Attendance Prediction</h1>
          <Link to="/organizer" className="text-primary-600 text-sm hover:underline">← Back</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-700 mb-4">Attendance Forecast</h2>
            {prediction && <GaugeDisplay value={prediction.predicted_percentage} />}
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              {[
                { label: 'Current Fill Rate', value: `${prediction?.current_fill_rate ?? 0}%` },
                { label: 'Confidence', value: `${((prediction?.confidence_score ?? 0) * 100).toFixed(0)}%` },
                { label: 'Confirmed', value: profile?.confirmed_vs_pending?.confirmed ?? 0 },
                { label: 'Pending', value: profile?.confirmed_vs_pending?.pending ?? 0 },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-primary-600">{s.value}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-700 mb-4">Registrations (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={byDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Profile Insights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary-600">{profile?.total_registrations ?? 0}</p>
              <p className="text-gray-400 text-xs mt-1">Total Registrations</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary-600">{profile?.peak_registration_hour ?? '—'}:00</p>
              <p className="text-gray-400 text-xs mt-1">Peak Hour</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary-600">{profile?.average_days_before_event ?? 0}</p>
              <p className="text-gray-400 text-xs mt-1">Avg Days Before Event</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{profile?.confirmed_vs_pending?.confirmed ?? 0}</p>
              <p className="text-gray-400 text-xs mt-1">Confirmed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
