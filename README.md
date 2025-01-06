# Grants Management API

A simple Node.js application to manage grants, including creating, modifying, fetching, and deleting grants. This API is designed to be easy to use and extend, making it ideal for managing grant-related data.

---

## Features

- **Create a Grant**: Add a new grant with details like title, description, objective, funding, location, and deadline.
- **Fetch All Grants**: Retrieve a list of all grants stored in the database.
- **Fetch a Single Grant**: Get details of a specific grant by its title.
- **Modify a Grant**: Update details of an existing grant.
- **Delete a Grant**: Remove a grant from the database.

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A JSON file for storing data (e.g., `db.json`).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/grants-management-api.git
   cd grants-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your database file:
   - Create a `db.json` file in the project directory with an initial structure:
     ```json
     {
       "grants": []
     }
     ```

---

## Usage

### Running the App

Start the server:

```bash
npm start
```

The app will run at `http://localhost:3000`.

### API Endpoints

#### 1. **Create a Grant**

- **Endpoint**: `POST /api/v1/grants/new`
- **Body**:
  ```json
  {
    "title": "Grant Title",
    "description": "Detailed description",
    "objective": "Grant objective",
    "funding": 50000,
    "location": "City, Country",
    "deadline": "2025-01-31"
  }
  ```
- **Response**: `201 Created`

#### 2. **Fetch All Grants**

- **Endpoint**: `GET /api/v1/grants`
- **Response**: List of all grants.

#### 3. **Fetch a Single Grant**

- **Endpoint**: `GET /api/v1/grants/:title`
- **Response**: Grant details.

#### 4. **Modify a Grant**

- **Endpoint**: `PUT /api/v1/grants/:title`
- **Body**:
  ```json
  {
    "description": "Updated description",
    "funding": 60000
  }
  ```
- **Response**: `200 OK`

#### 5. **Delete a Grant**

- **Endpoint**: `DELETE /api/v1/grants/:title`
- **Response**: `200 OK`

---

## Project Structure

```plaintext
.
├── models/
│   ├── grants.model.js       # Grant model
│   ├── user.model.js         # User model (future extension)
├── utilite/
│   ├── gemini.js             # Utility for generating concept notes
│   ├── jsonClient.js         # JSON database client
├── handler/
│   └── handler.js            # Main API handler
├── db.json                   # JSON database
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

---

## Author

Developed by [Ali](https://github.com/zolldic).

For questions or feedback, feel free to contact me!

---
