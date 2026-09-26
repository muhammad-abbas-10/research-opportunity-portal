# Research Opportunity Portal

A full-stack web application that allows faculty members to post, view, update, and manage university research opportunities in one centralized platform. Built with Node.js, Express, and MySQL for the backend, with a REST API architecture.

## GitHub Repository
https://github.com/muhammad-abbas-10/research-opportunity-portal

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Testing:** Postman

## Project Structure
```
research-opportunity-portal/
│
├── backend/
│   ├── controllers/
│   │   └── opportunityController.js
│   ├── routes/
│   │   └── opportunityRoutes.js
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── .env               (not committed)
│   └── .gitignore
│
├── database/
│   └── schema.sql
│
├── frontend/
│   └── (HTML/CSS/JS files)
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL installed and running

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/research-opportunity-portal.git
cd research-opportunity-portal
```

### 2. Set up the database
Open MySQL and run the schema file:
```bash
mysql -u root -p < database/schema.sql
```
This creates the `research_portal` database and the `opportunities` table.

### 3. Install backend dependencies
```bash
cd backend
npm install
```

### 4. Configure environment variables
Create a `.env` file inside the `backend/` folder with the following:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=research_portal
PORT=5000
```

### 5. Run the server
```bash
node server.js
```
The server will start at `http://localhost:5000`.

### 6. Open the frontend
Open `frontend/index.html` in your browser, or serve it with a live server extension.

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

## Postman Collection
The exported Postman collection is included in this repository as `research-opportunity-portal.postman_collection.json`.

## Author
Muhammad Abbas – 24P-0545 – BAI-5A (CS DEPARTMENT)

## Project Status
- [x] Phase 1: Project setup, database schema, basic server
- [x] Phase 2: Backend CRUD API routes
- [ ] Phase 3: Frontend interface
- [ ] Postman testing and collection export
- [ ] Demo video
