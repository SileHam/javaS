import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EventListPage from './pages/EventListPage'
import EventDetailPage from './pages/EventDetailPage'

import MyRegistrationsPage from './pages/participant/MyRegistrationsPage'

import OrganizerDashboard from './pages/organizer/OrganizerDashboard'
import CreateEventPage from './pages/organizer/CreateEventPage'
import EditEventPage from './pages/organizer/EditEventPage'
import ParticipantListPage from './pages/organizer/ParticipantListPage'
import AIPredictionPage from './pages/organizer/AIPredictionPage'

import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagementPage from './pages/admin/UserManagementPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />

          <Route path="/my-registrations" element={
            <ProtectedRoute roles={['participant']}>
              <MyRegistrationsPage />
            </ProtectedRoute>
          } />

          <Route path="/organizer" element={
            <ProtectedRoute roles={['organizer', 'admin']}>
              <OrganizerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/organizer/events/create" element={
            <ProtectedRoute roles={['organizer', 'admin']}>
              <CreateEventPage />
            </ProtectedRoute>
          } />
          <Route path="/organizer/events/:id/edit" element={
            <ProtectedRoute roles={['organizer', 'admin']}>
              <EditEventPage />
            </ProtectedRoute>
          } />
          <Route path="/organizer/events/:id/participants" element={
            <ProtectedRoute roles={['organizer', 'admin']}>
              <ParticipantListPage />
            </ProtectedRoute>
          } />
          <Route path="/organizer/events/:id/predict" element={
            <ProtectedRoute roles={['organizer', 'admin']}>
              <AIPredictionPage />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute roles={['admin']}>
              <UserManagementPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
