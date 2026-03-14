
# Finance_Manager

A personal finance management web application for students to track expenses, manage tuition income, split group bills, and get AI-assisted financial insights.

Repository: https://github.com/fahin99/Finance_Manager
Maintainer: @fahin99

---

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-3.1.2-green)
![License](https://img.shields.io/badge/License-Educational-orange)

## Features

- Personal expense tracking with category-level insights
- Group expense management and bill splitting
- Tuition scheduling and progress tracking
- Dashboard analytics and summary cards
- AI assistant (FinBuddy chatbot)
- Email notifications and reminders
- User profile and account settings
- Real-time updates for collaborative flows

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Backend | Flask 3.1.2, Flask-SQLAlchemy, Flask-Login |
| Frontend | HTML, CSS, JavaScript |
| Real-time | Flask-SocketIO, Flask-APScheduler |
| AI/ML | Groq API (Mixtral-8x7b-32768) |
| Database | SQLite (development), PostgreSQL-ready (production) |

## Architecture And Workflow

The app follows a standard Flask blueprint architecture:

- `app.py`: Application entry point, app setup, extension wiring, and route registration
- `routes/`: HTTP route blueprints by domain
- `services/`: Business logic and helper service modules
- `templates/`: Jinja2 templates for all pages and email layouts
- `static/`: CSS, JS, images, and other front-end assets
- `api/`: API-layer modules and integrations
- `tools/`: Utility scripts for maintenance and exports
- `instance/`: Local runtime data such as SQLite database files

### Key Folder Responsibilities

- `routes/auth.py`: Register, login, logout, and session workflows
- `routes/dashboard.py`: Dashboard rendering and aggregated user stats
- `routes/expense.py`: Personal expense CRUD and related logic
- `routes/group.py`: Group creation, split calculations, and balances
- `routes/tuition.py`: Tuition records, schedules, and reporting actions
- `routes/profile.py`: Profile update and user settings
- `routes/notifications.py`: Notification and reminder endpoints
- `routes/database.py`: Database-related route helpers
- `services/chat_context.py`: Context builder for AI chatbot prompts

## Project Structure

```text
Finance_Manager/
|-- app.py
|-- requirements.txt
|-- package.json
|-- run_app.bat
|-- setup.bat
|-- runtime.txt
|-- API_ROUTES.md
|-- routes/
|   |-- __init__.py
|   |-- auth.py
|   |-- dashboard.py
|   |-- database.py
|   |-- expense.py
|   |-- group.py
|   |-- notifications.py
|   |-- profile.py
|   `-- tuition.py
|-- services/
|   |-- __init__.py
|   `-- chat_context.py
|-- templates/
|-- static/
|-- api/
|-- tools/
|-- exports/
`-- instance/
```

## Quick Start (Windows)

```bash
git clone https://github.com/fahin99/Finance_Manager.git
cd Finance_Manager
setup.bat
```

## Manual Setup

1. Create a virtual environment

```bash
python -m venv venv
venv\Scripts\activate
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Configure environment variables in `.env`

```env
GROQ_API_KEY=your_key
GROQ_MODEL_NAME=ai_model
SECRET_KEY=secret_key
DATABASE_URL=your_database

# Mail settings for weekly reports
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USE_SSL=false
MAIL_USERNAME=email
MAIL_PASSWORD=password
MAIL_DEFAULT_SENDER=email

# Weekly report scheduler
ENABLE_WEEKLY_REPORTS=true
WEEKLY_REPORT_DAY=sun
WEEKLY_REPORT_HOUR=8

# Tuition reminders
ENABLE_TUITION_REMINDERS=true
```

4. Run the application

```bash
python app.py
```

5. Open the app

http://localhost:5000

---

## API Documentation

See [API_ROUTES.md](API_ROUTES.md) for endpoint-level details covering authentication, expenses, groups, tuition, and analytics.

## Usage Guide

### Personal Expenses
1. Open the personal expenses page from the dashboard.
2. Add expense records with amount, category, and notes.
3. Review category-level spending insights.

### Group Expenses
1. Create or join a group.
2. Add shared expenses and split among members.
3. Check balances to see who owes whom.

### Tuition Management
1. Add tuition/student records.
2. Set schedule details and track completion progress.
3. Export data where needed.

### FinBuddy Chatbot
1. Open the chatbot from the dashboard.
2. Ask spending and saving questions based on your tracked data.

## Configuration Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Flask session/signing key | Required |
| `DATABASE_URL` | PostgreSQL connection string | SQLite fallback |
| `GROQ_API_KEY` | Groq API key for chatbot | Optional |
| `ENABLE_WEEKLY_REPORTS` | Send weekly email reports | `true` |
| `ENABLE_TUITION_REMINDERS` | Send tuition reminders | `true` |
| `WEEKLY_REPORT_DAY` | Day for weekly reports | `sun` |
| `WEEKLY_REPORT_HOUR` | Hour for weekly reports | `8` |

## Security Notes

- Use a strong random value for `SECRET_KEY`.
- Keep `.env` out of version control.
- Use HTTPS and a production-grade database in deployment.
- Configure secure mail credentials and least-privilege access.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push and open a pull request.

## License

Educational project for student-focused learning and development.

## Support

For issues or feature requests, open an issue in this repository.
