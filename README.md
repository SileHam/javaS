# EventMaster

A full-stack event management and registration platform built with Django REST Framework + React.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.11, Django 4.2, Django REST Framework |
| Auth | SimpleJWT + custom role-based permissions |
| Database | MySQL |
| Frontend | React 18, Vite, Tailwind CSS |
| PDF | ReportLab (attendance lists + QR badges) |
| Excel | openpyxl |
| AI | scikit-learn (linear regression) |
| Email | Django SMTP (Gmail) |

## Project Structure

```
eventmaster/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   ├── eventmaster/        ← Django config
│   └── apps/
│       ├── accounts/       ← auth + users
│       ├── events/         ← event CRUD
│       ├── registrations/  ← registrations
│       ├── exports/        ← PDF + Excel
│       ├── notifications/  ← email service
│       └── ai/             ← attendance prediction
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        └── pages/
```

## Setup — Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a MySQL database named `eventmaster`, then configure `backend/.env`:

```env
SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=eventmaster
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=3306
EMAIL_HOST_USER=youremail@gmail.com
EMAIL_HOST_PASSWORD=yourapppassword
```

Run migrations:

```bash
python manage.py makemigrations accounts events registrations exports notifications ai
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Setup — Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`. API proxied to `http://localhost:8000`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Create account |
| POST | `/api/auth/login/` | Login → JWT |
| GET | `/api/auth/me/` | Current user |
| GET | `/api/events/` | List public events |
| POST | `/api/events/` | Create event |
| GET | `/api/events/my_events/` | Organizer's events |
| PATCH | `/api/events/{id}/cancel/` | Cancel event |
| POST | `/api/registrations/` | Register to event |
| GET | `/api/registrations/my_registrations/` | My registrations |
| GET | `/api/registrations/event/{id}/` | Event participants |
| PATCH | `/api/registrations/{id}/update_status/` | Confirm/reject |
| GET | `/api/exports/event/{id}/pdf/` | Attendance PDF |
| GET | `/api/exports/event/{id}/excel/` | Attendance Excel |
| GET | `/api/exports/badge/{reg_id}/` | Participant badge |
| GET | `/api/ai/predict/{id}/` | Attendance prediction |
| GET | `/api/ai/profile/{id}/` | Participant profile |
| GET | `/api/admin/stats/` | Global stats |
| GET | `/api/admin/users/` | All users |
| PATCH | `/api/admin/users/{id}/change_role/` | Change user role |

## Roles

| Role | Capabilities |
|---|---|
| `participant` | Browse events, register, download badge, cancel registration |
| `organizer` | All participant + create/edit/cancel events, manage participants, export, AI |
| `admin` | All organizer + manage all users and roles |
