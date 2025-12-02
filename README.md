# CIES IIT Jodhpur

Official website for the **Civil & Infrastructure Engineering Society** at IIT Jodhpur.

![Next.js]
![Django]
![TypeScript]
![Tailwind CSS]

## 🌐 Live Demo

- **Frontend**: [cies-iitj.vercel.app](https://cies-iitj.vercel.app) 
- **Backend API**: [cies-backend.onrender.com](https://cies-backend.onrender.com) 

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL (or use SQLite for development)

### Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your API URL

# Start development server
npm run dev
```

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start server
python manage.py runserver
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Django 5.1, Django REST Framework |
| **Database** | PostgreSQL |
| **Auth** | JWT (SimpleJWT) |
| **Hosting** | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure

```
CIES-IITJ/
├── app/                    # Next.js pages
│   ├── page.tsx           # Homepage
│   ├── activities/        # Activities page
│   ├── events/            # Events page
│   ├── team/              # Team page
│   ├── roadmap/           # Roadmap page
│   └── contact/           # Contact page
├── components/            # React components
├── lib/                   # API service & utilities
├── public/                # Static assets
├── backend/               # Django backend
│   ├── apps/
│   │   ├── core/          # Core models (User, Contact, etc.)
│   │   ├── events/        # Events & Activities
│   │   └── team/          # Team members
│   └── config/            # Django settings
└── README.md
```

---

## 🎨 Features

- ✅ Responsive design (mobile-first)
- ✅ Dark/Light mode with persistence
- ✅ Dynamic content from API
- ✅ Admin panel for content management
- ✅ SEO optimized
- ✅ Accessibility compliant
- ✅ Smooth animations

---

## 🔌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/events/activities/` | List all activities |
| `GET /api/v1/events/events/` | List all events |
| `GET /api/v1/team/members/` | List team members |
| `GET /api/v1/core/contact/info/` | Get contact information |
| `POST /api/v1/core/contact/submit/` | Submit contact form |
| `GET /api/v1/core/announcements/` | List announcements |

Full API documentation available at `/api/docs/` (Swagger UI).

---
## 👥 Team

Developed by the **CIES Technical Committee**, IIT Jodhpur.

---

## 📄 License

© 2025 Civil & Infrastructure Engineering Society, IIT Jodhpur. All Rights Reserved.
