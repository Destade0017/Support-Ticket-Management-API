# 🎫 Support Ticket Management API

A RESTful backend API for managing customer support tickets, handling customer-agent communication, assigning support requests, and tracking ticket resolution.

Built with **Node.js, Express.js, MongoDB and Mongoose**, this project demonstrates practical backend engineering concepts including authentication, role-based access control, data relationships, pagination, filtering, aggregation and service-layer architecture.

## 📌 Project Overview

The Support Ticket Management API provides the backend infrastructure for a customer support platform.

Customers can create support tickets, track their progress and communicate with support agents. Support agents can manage tickets, assign requests, respond to customers and update ticket statuses.

The system enforces authentication, authorization and resource ownership to ensure users can only access resources they're permitted to manage.

## ✨ Features

### Ticket Management
- Create and manage support tickets.
- Retrieve individual tickets and ticket collections.
- Update ticket information.
- Delete tickets.
- Assign tickets to support agents.
- Track ticket creation and modification timestamps.

### Ticket Prioritization
Supports four priority levels:
- `low`
- `medium`
- `high`
- `urgent`

### Ticket Status Management
Supports four ticket statuses:
- `open`
- `in_progress`
- `resolved`
- `closed`

### Customer-Agent Communication
- Submit replies to support tickets.
- Retrieve conversation history.
- Associate replies with their respective tickets and authors.

### Advanced Querying
- Filter tickets by status.
- Filter tickets by priority.
- Filter tickets by category.
- Search tickets by title.
- Implement pagination.
- Sort tickets based on supported fields.

### Authorization & Access Control
- Authenticated users can create tickets.
- Customers can access their own tickets.
- Support agents can manage support requests.
- Ticket assignments are restricted by authorization rules.
- Administrative and agent permissions are enforced.

### Ticket Analytics
- Retrieve ticket statistics.
- Track ticket distribution across different statuses and priorities.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modelling |
| JavaScript | Programming language |
| JWT | Authentication |
| Postman | API testing |

## 📂 Project Structure

```text
support-ticket-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── ticket.model.js
│   │   └── reply.model.js
│   │
│   ├── controllers/
│   │   ├── ticket.controller.js
│   │   └── reply.controller.js
│   │
│   ├── routes/
│   │   ├── ticket.routes.js
│   │   └── reply.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── services/
│   │
│   └── app.js
│
├── server.js
├── .env.example
├── .gitignore
└── package.json
```

*The structure above represents the suggested architecture; adjust filenames to match the actual implementation.*

## 🔗 API Endpoints

Base URL: `/api/v1`

### Tickets

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tickets` | Create a support ticket |
| GET | `/tickets` | Retrieve tickets |
| GET | `/tickets/:id` | Retrieve a specific ticket |
| PATCH | `/tickets/:id` | Update a ticket |
| DELETE | `/tickets/:id` | Delete a ticket |
| PATCH | `/tickets/:id/assign` | Assign ticket to an agent |
| GET | `/tickets/stats` | Retrieve ticket statistics |

### Ticket Replies

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tickets/:id/replies` | Create a ticket reply |
| GET | `/tickets/:id/replies` | Retrieve ticket replies |

All endpoints requiring authentication must receive a valid authentication token.

## 📄 Ticket Data Structure

Example ticket:

```json
{
  "title": "Unable to complete payment",
  "description": "My payment keeps failing during checkout.",
  "category": "Payments",
  "priority": "high",
  "status": "open",
  "createdBy": "user-id",
  "assignedTo": null,
  "createdAt": "2026-11-18T12:00:00.000Z",
  "updatedAt": "2026-11-18T12:00:00.000Z"
}
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- Postman

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate into the project

```bash
cd support-ticket-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Start the development server

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:8000
```

## 🧪 API Testing

The API can be tested using Postman.

Important scenarios to test include:

- Creating a support ticket.
- Retrieving tickets belonging to an authenticated user.
- Preventing unauthorized access to another user's tickets.
- Assigning tickets to support agents.
- Updating ticket statuses and priorities.
- Creating and retrieving ticket replies.
- Filtering and searching tickets.
- Testing pagination and sorting.
- Verifying ticket statistics.
- Testing invalid requests and unauthorized access.

## 🔐 Security Considerations

- Authentication is required for protected endpoints.
- Role-based access control restricts privileged operations.
- Resource ownership is enforced.
- Request data is validated.
- Sensitive information must not be exposed in API responses.
- Environment variables are used for application secrets.

## 🎯 Engineering Concepts Demonstrated

This project explores practical backend engineering concepts:

- RESTful API design.
- MVC architecture.
- Authentication and authorization.
- Role-based access control (RBAC).
- MongoDB data modelling.
- Mongoose relationships and population.
- Advanced database queries.
- Pagination and sorting.
- Database indexing.
- MongoDB aggregation pipelines.
- Service-layer architecture.
- Centralized error handling.
- API validation and security.

## 🚀 Future Improvements

Potential extensions include:

- Email notifications when tickets are updated.
- Real-time ticket communication using WebSockets.
- File attachments.
- Ticket escalation and SLA management.
- Redis
