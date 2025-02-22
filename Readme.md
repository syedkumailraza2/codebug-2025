# CodeBug 2025 Backend

## Overview
This is the backend for **CodeBug 2025**, a platform for students to connect, share study materials, and manage events. The API provides endpoints for user authentication, study material management, and event scheduling.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Cloudinary (for file uploads)**

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/codebug-2025-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd codebug-2025-backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and add your environment variables (e.g., database connection, Cloudinary keys).
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Students

#### 1. Register a User
**Endpoint:** `/user`  
**Method:** `POST`
**Request Body:**
```json
{
  "email": "raza@gmail.com",
  "password": "1234567",
  "prn_no": "343259252",
  "bio": "students professional bio",
  "skills": "java, javascript",
  "tech_stack": "Fullstack, Frontend web, backend",
  "open_to_partner": "true"
}
```

#### 2. Update a User
**Endpoint:** `/user/:id`  
**Method:** `PUT`
**Request Body:**
```json
{
  "email": "raza@gmail.com",
  "password": "1234567",
  "prn_no": "343259252",
  "bio": "students professional bio",
  "skills": "java, javascript",
  "tech_stack": "Fullstack, Frontend web, backend"
}
```

#### 3. Delete a User
**Endpoint:** `/user/:id`  
**Method:** `DELETE`

#### 4. Login
**Endpoint:** `/login`  
**Method:** `POST`
**Request Body:**
```json
{
  "email": "raza@gmail.com",
  "password": "1234567"
}
```

#### 5. Logout
**Endpoint:** `/logout/:id`  
**Method:** `POST`

---

### Study Material

#### 1. Upload Study Material
**Endpoint:** `/notes/create`  
**Method:** `POST`
**Request Body:**
```json
{
  "name": "hello",
  "format": "pdf",
  "tech": "Java",
  "url": "cloudinary.com/hello"
}
```

#### 2. Get All Study Materials
**Endpoint:** `/notes`  
**Method:** `GET`

#### 3. Update Study Material
**Endpoint:** `/notes/:id`  
**Method:** `PUT`
**Request Body:**
```json
{
  "name": "hello",
  "format": "pdf",
  "tech": "Java",
  "url": "cloudinary.com/hello"
}
```

#### 4. Get a Specific Study Material
**Endpoint:** `/notes/:id`  
**Method:** `GET`
**Response Example:**
```json
{
  "name": "hello",
  "format": "pdf",
  "tech": "Java",
  "url": "cloudinary.com/hello"
}
```

#### 5. Delete Study Material
**Endpoint:** `/notes/:id`  
**Method:** `DELETE`

---

### Event Calendar

#### 1. Get All Events
**Endpoint:** `/events`  
**Method:** `GET`

#### 2. Create an Event
**Endpoint:** `/event/create`  
**Method:** `POST`
**Request Body:**
```json
{
  "name": "codebug",
  "date": "28-02-2025",
  "description": "event description",
  "poster": "poster.jpg"
}
```

#### 3. Update an Event
**Endpoint:** `/event/:id`  
**Method:** `PUT`
**Request Body:**
```json
{
  "name": "codebug",
  "date": "28-02-2025",
  "description": "event description",
  "poster": "poster.jpg"
}
```

#### 4. Delete an Event
**Endpoint:** `/event/:id`  
**Method:** `DELETE`

#### 5. Get an Event by ID
**Endpoint:** `/event/:id`  
**Method:** `GET`

## License
This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to update the README based on any future modifications to the API.

