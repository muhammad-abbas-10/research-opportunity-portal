# Research Opportunity Portal

A full-stack web application that allows faculty members to post, view, update, and manage university research opportunities in one centralized platform. Built with Node.js, Express, and MySQL for the backend, with a REST API architecture and a vanilla HTML/CSS/JS frontend.

## GitHub Repository
https://github.com/muhammad-abbas-10/research-opportunity-portal

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (MariaDB via XAMPP)
- **Frontend:** HTML, CSS, JavaScript (vanilla, no framework)
- **Dev tooling:** nodemon, http-server, concurrently
- **Testing:** Postman

## Project Structure
```
research-opportunity-portal/
│
├── package.json             # Root scripts to run backend + frontend together
├── package-lock.json
│
├── backend/
│   ├── controllers/
│   │   └── opportunityController.js
│   ├── routes/
│   │   └── opportunityRoutes.js
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── .env                 # not committed
│   └── .gitignore
│
├── database/
│   └── schema.sql
│
├── frontend/
│   ├── index.html           # Homepage: list of opportunities + create form
│   ├── details.html         # View, edit, delete one opportunity; toggle status
│   ├── style.css
│   └── script.js
│
├── research-opportunity-portal.postman_collection.json
│
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL/MariaDB installed and running (e.g. via XAMPP)

### 1. Clone the repository
```bash
git clone https://github.com/muhammad-abbas-10/research-opportunity-portal.git
cd research-opportunity-portal
```

### 2. Set up the database
Start MySQL (via XAMPP Control Panel or your MySQL service), then run the schema:
```bash
mysql -u root -p < database/schema.sql
```
Or paste the contents of `database/schema.sql` into MySQL Workbench / the MariaDB command line. This creates the `research_portal` database and the `opportunities` table.

### 3. Configure environment variables
Create a `.env` file inside the `backend/` folder:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=research_portal
PORT=5000
```
(Leave `DB_PASSWORD` blank if using XAMPP's default root user.)

### 4. Install dependencies

Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

Install root dependencies (used to run both servers together):
```bash
npm install
```

### 5. Run the whole app with one command
From the project root:
```bash
npm run dev
```
This starts both servers at once:
- Backend API → `http://localhost:5000`
- Frontend → `http://127.0.0.1:5500`

Open your browser to:
```
http://127.0.0.1:5500
```

To run them separately instead:
```bash
npm run backend    # starts only the Express API
npm run frontend   # starts only the static frontend server
```

## API Endpoints

| Method | Endpoint                     | Description                          |
|--------|-------------------------------|---------------------------------------|
| POST   | /api/opportunities            | Create a new research opportunity     |
| GET    | /api/opportunities            | Get all research opportunities        |
| GET    | /api/opportunities/:id        | Get a single opportunity by ID        |
| PUT    | /api/opportunities/:id        | Update an existing opportunity        |
| DELETE | /api/opportunities/:id        | Delete an opportunity                 |

### Example request body (POST / PUT)
```json
{
    "title": "AI in Healthcare Research",
    "description": "Exploring ML models for early disease detection",
    "research_area": "Artificial Intelligence",
    "faculty_name": "Dr. Ahmed Khan",
    "department": "Computer Science",
    "required_skills": "Python, TensorFlow",
    "positions_available": 2,
    "application_deadline": "2025-12-01",
    "status": "Open"
}
```

### Status Codes Used
- `200 OK` – successful GET, PUT, DELETE
- `201 Created` – successful POST
- `400 Bad Request` – missing/invalid input
- `404 Not Found` – opportunity does not exist
- `500 Internal Server Error` – unexpected server error

## Frontend Features
- View all research opportunities in a list
- View full details of a selected opportunity
- Create a new opportunity through a validated form
- Edit an existing opportunity's details
- Toggle status between Open and Closed
- Delete an opportunity (with confirmation prompt)
- Success and error messages shown for all actions
- Client-side validation for required fields, in addition to backend validation

## Postman Collection
The exported Postman collection is included in this repository as:
```
research-opportunity-portal.postman_collection.json
```
It includes: creating multiple opportunities, retrieving all, retrieving one by ID, updating, changing status, deleting, retrieving a deleted opportunity (404 demonstration), and a request with missing fields (400 demonstration).

## Author
Muhammad Abbas – P24-0545 – BAI-5A

## Project Status
- [x] Phase 1: Project setup, database schema, basic server
- [x] Phase 2: Backend CRUD API routes
- [x] Phase 3: Frontend interface (list, details, create, edit, delete, status toggle)
- [ ] Postman testing and collection export
- [ ] Demo video
