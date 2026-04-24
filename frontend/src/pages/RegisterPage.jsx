import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'participant' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const user = await register(form)
      if (user.role === 'organizer') navigate('/organizer')
      else navigate('/events')
    } catch (err) {
      const data = err.response?.data
      setError(data?.email?.[0] || data?.password?.[0] || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={form[key]} placeholder={placeholder}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary-700">EventMaster</h1>
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {field('Full Name', 'name', 'text', 'John Doe')}
          {field('Email', 'email', 'email', 'you@example.com')}
          {field('Phone (optional)', 'phone', 'tel', '+1 234 567 890')}
          {field('Password', 'password', 'password', '••••••••')}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-60 mt-2">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
