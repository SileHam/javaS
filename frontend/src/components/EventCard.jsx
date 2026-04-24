import { Link } from 'react-router-dom'

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-gray-100 text-gray-600',
}

export default function EventCard({ event }) {
  const spotsLeft = event.available_spots
  const isFull = spotsLeft === 0

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
      {event.banner_image ? (
        <img src={event.banner_image} alt={event.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition duration-300" />
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <span className="text-white text-4xl font-bold opacity-30">{event.title[0]}</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">{event.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${STATUS_COLORS[event.status]}`}>
            {event.status}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{event.description}</p>

        <div className="text-xs text-gray-500 space-y-1 mb-4">
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{event.is_online ? '🌐' : '📍'}</span>
            <span>{event.is_online ? 'Online' : event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${isFull ? 'text-red-500' : 'text-green-600'}`}>
            {isFull ? 'Full' : `${spotsLeft} spots left`}
          </span>
          <Link to={`/events/${event.id}`}
            className="bg-primary-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
