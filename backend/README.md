# CIES IITJ Backend

Backend API for the Civil & Infrastructure Engineering Society (CIES), IIT Jodhpur website.

## Tech Stack

- **Framework**: Django 5.1 + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT + Session-based
- **Documentation**: OpenAPI (Swagger/ReDoc)
- **Task Queue**: Celery + Redis

## Quick Start

### Prerequisites

- Python 3.12+
- PostgreSQL
- Redis (optional, for caching and Celery)

### Installation

1. **Clone and navigate to backend:**
   ```bash
   cd CIES-IITJ/backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate  # Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   # or using uv
   uv pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server:**
   ```bash
   python manage.py runserver
   ```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

## API Endpoints

### Authentication (`/api/v1/core/auth/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register/` | Register new user |
| POST | `/auth/login/` | Login with Basic Auth |
| DELETE | `/auth/login/` | Logout |
| GET | `/auth/login/` | Get current user |
| POST | `/auth/token/` | Get JWT token |
| POST | `/auth/token/refresh/` | Refresh JWT token |

### Events & Activities (`/api/v1/events/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events/` | List all events (with filters) |
| GET | `/events/<uuid>/` | Get event details |
| POST | `/events/` | Create event (admin) |
| PUT | `/events/<uuid>/` | Update event (admin) |
| DELETE | `/events/<uuid>/` | Delete event (admin) |
| GET | `/activities/` | List activities only |
| GET | `/activities/recent/` | Get recent/featured activities |
| GET | `/roadmap/` | Get roadmap/timeline events |

**Query Parameters:**
- `type`: Filter by event type (event, activity, roadmap)
- `category`: Filter by category (workshop, seminar, etc.)
- `status`: Filter by status (completed, upcoming, ongoing)
- `featured`: Filter featured events (true/false)
- `search`: Search in title and description
- `date_from`, `date_to`: Date range filter
- `ordering`: Sort by field (date, -date, title, etc.)
- `page`, `page_size`: Pagination

### Team (`/api/v1/team/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/members/` | List all team members |
| GET | `/members/<uuid>/` | Get member details |
| POST | `/members/` | Create member (admin) |
| PUT | `/members/<uuid>/` | Update member (admin) |
| DELETE | `/members/<uuid>/` | Delete member (admin) |
| GET | `/featured/` | Get featured members |
| GET | `/by-committee/` | Get members grouped by committee |

**Query Parameters:**
- `committee`: Filter by committee
- `role`: Filter by role
- `batch`: Filter by batch
- `featured`: Filter featured members
- `is_faculty`: Filter faculty members
- `search`: Search by name
- `group_by`: Group results (committee, role, batch)

### Contact (`/api/v1/core/contact/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/info/` | Get contact information |
| PUT | `/info/` | Update contact info (admin) |
| POST | `/submit/` | Submit contact form |
| GET | `/submissions/` | List submissions (admin) |

### Announcements (`/api/v1/core/announcements/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List announcements |
| GET | `/<uuid>/` | Get announcement details |
| POST | `/` | Create announcement (admin) |

### Gallery (`/api/v1/core/gallery/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List galleries |
| GET | `/<uuid>/` | Get gallery details |
| POST | `/` | Create gallery (admin) |

### Navigation (`/api/v1/core/navigation/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get navigation menu |
| POST | `/` | Create nav item (admin) |

## Project Structure

```
backend/
├── apps/
│   ├── core/           # Core functionality (auth, contact, announcements, etc.)
│   ├── events/         # Events, activities, roadmap
│   └── team/           # Team members
├── base/               # Base classes and utilities
├── config/             # Django settings and configuration
├── docker/             # Docker configuration
├── media/              # Uploaded files
├── manage.py
├── requirements.txt
└── pyproject.toml
```

## Admin Panel

Access the Django admin at http://localhost:8000/admin/

Features:
- Manage all content (events, team, announcements, etc.)
- View contact form submissions
- Upload and manage images
- Configure navigation menu

## Environment Variables

See `env.example` for all available configuration options:

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG` | Debug mode | `True` |
| `SECRET_KEY` | Django secret key | (required) |
| `POSTGRES_*` | Database config | (required) |
| `EMAIL_*` | Email configuration | Console backend |
| `RECAPTCHA_*` | reCAPTCHA keys | (optional) |
| `REDIS_URL` | Redis connection | (optional) |

## Development

### Running Tests
```bash
python manage.py test
```

### Code Style
```bash
# Format with black
black .

# Lint with flake8
flake8
```

### Docker
```bash
cd docker/nonprod
docker-compose up -d
```

## Deployment

For production deployment:

1. Set `DEBUG=False`
2. Configure proper `SECRET_KEY`
3. Set up PostgreSQL database
4. Configure email service (SendGrid, AWS SES, etc.)
5. Set up Redis for caching
6. Configure CORS for your frontend domain
7. Set up SSL/HTTPS
8. Use gunicorn/uvicorn for serving

## License

This project is for IIT Jodhpur CIES internal use.

