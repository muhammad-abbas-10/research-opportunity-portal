# Research Opportunity Portal

<p align="center">
  A full-stack web application for publishing and managing university research opportunities in one place.
</p>

<p align="center">
  <a href="https://github.com/muhammad-abbas-10/research-opportunity-portal"><img src="https://img.shields.io/badge/View_on-GitHub-181717?style=for-the-badge&logo=github" alt="View the GitHub repository"></a>
  <a href="./demo_video.mp4"><img src="https://img.shields.io/badge/Watch-Demo_Video-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch the demo video"></a>
  <a href="./Research%20Opportunity%20Portal/"><img src="https://img.shields.io/badge/API_Collection-Bruno-F4AA41?style=for-the-badge&logo=bruno&logoColor=white" alt="Open the Bruno API collection"></a>
</p>

## Overview

The **Research Opportunity Portal** gives faculty a simple, centralized way to create, browse, update, close, and remove research opportunities. It combines a responsive vanilla JavaScript interface with a RESTful Express API and a MySQL database.

**Repository:** [github.com/muhammad-abbas-10/research-opportunity-portal](https://github.com/muhammad-abbas-10/research-opportunity-portal)

## Demo & API Collection

- 🎬 **Demo video:** [Watch the project walkthrough](./demo_video.mp4)
- 🧪 **Bruno collection:** [Open `Research Opportunity Portal`](./Research%20Opportunity%20Portal/) and import the folder in [Bruno](https://www.usebruno.com/). It includes requests for create, read, update, delete, status changes, and `400`/`404` test cases.

## Tech Stack

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Bruno-F4AA41?style=for-the-badge&logo=bruno&logoColor=white" alt="Bruno">
</p>

| Layer | Technologies |
| --- | --- |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js, REST API |
| Database | MySQL / MariaDB |
| Development | `nodemon`, `concurrently`, `http-server`, `dotenv`, CORS |
| API testing | Bruno |

## Features

- Create research opportunities with faculty, department, skills, deadline, and available-position details.
- Browse all opportunities, ordered by most recently created.
- Open a detailed view for any opportunity.
- Edit opportunity information and set its status to **Open** or **Closed**.
- Delete opportunities with a confirmation prompt.
- Validate required fields on both the client and server.
- Return clear success and error feedback, including appropriate `400`, `404`, and `500` API responses.

## Project Structure

```text
.
├── backend/
│   ├── controllers/                 # Opportunity CRUD logic
│   ├── routes/                      # Express API routes
│   ├── db.js                        # MySQL connection
│   └── server.js                    # Express server entry point
├── database/
│   └── schema.sql                   # Database and table definition
├── frontend/
│   ├── index.html                   # Opportunity list and create form
│   ├── details.html                 # Details, edit, status, and delete view
│   ├── script.js                    # Frontend API integration
│   └── style.css                    # Application styling
├── Research Opportunity Portal/     # Bruno API collection
├── demo_video.mp4                   # Project demo
└── package.json                     # Root development scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)
- MySQL or MariaDB running locally — XAMPP is supported

### 1. Clone the repository

```bash
git clone https://github.com/muhammad-abbas-10/research-opportunity-portal.git
cd research-opportunity-portal
```

### 2. Create the database

Run the provided schema while MySQL/MariaDB is running:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `research_portal` database and its `opportunities` table. Alternatively, execute `database/schema.sql` in MySQL Workbench, phpMyAdmin, or a MariaDB client.

### 3. Configure the backend

Create `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=research_portal
PORT=5000
```

> Leave `DB_PASSWORD` blank when using XAMPP's default local MySQL configuration.

### 4. Install dependencies

```bash
npm install
cd backend
npm install
cd ..
```

### 5. Run the application

```bash
npm run dev
```

| Service | Address |
| --- | --- |
| Frontend | [`http://127.0.0.1:5500`](http://127.0.0.1:5500) |
| API | [`http://localhost:5000`](http://localhost:5000) |

To run each service independently:

```bash
npm run backend   # Express API with nodemon
npm run frontend  # Static frontend server
```

## API Reference

Base URL: `http://localhost:5000/api/opportunities`

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/opportunities` | Create an opportunity |
| `GET` | `/api/opportunities` | Retrieve all opportunities |
| `GET` | `/api/opportunities/:id` | Retrieve one opportunity |
| `PUT` | `/api/opportunities/:id` | Update an opportunity |
| `DELETE` | `/api/opportunities/:id` | Delete an opportunity |

### Example request body

```json
{
  "title": "AI in Healthcare Research",
  "description": "Exploring ML models for early disease detection",
  "research_area": "Artificial Intelligence",
  "faculty_name": "Dr. Ahmed Khan",
  "department": "Computer Science",
  "required_skills": "Python, TensorFlow",
  "positions_available": 2,
  "application_deadline": "2026-12-01",
  "status": "Open"
}
```

## Author

**Muhammad Abbas** · P24-0545 · BAI-5A

## Project Status

- [x] Database schema and server setup
- [x] CRUD REST API
- [x] Frontend for create, view, edit, status updates, and deletion
- [x] Bruno API collection and error-case tests
- [x] Demo video
