# MediTrack

MediTrack is a comprehensive application designed for doctors to manage clients and health programs efficiently. It consists of a **Node.js backend**, a **Prisma database setup**, and an **Angular frontend**.

---

## Live demo link 
[Live Demo](https://medic-track.onrender.com)

## Video prototype link
[View Project Demo](https://drive.google.com/file/d/1_bpZb8EEKQJts4o_M_MwS2WiadIr70vW/view?usp=sharing)

## Features

- **Client Management**: Add, update, and manage client details.
- **Health Programs**: Create and assign health programs to clients.
- **Secure Authentication**: User authentication and role-based access.
- **Responsive UI**: Built with Angular for a seamless user experience.

---

## Tech Stack

### Backend
- **Node.js**: Backend framework.
- **Express.js**: API routing and middleware.
- **Prisma**: ORM for database management.

### Frontend
- **Angular**: Frontend framework for building dynamic user interfaces.

### Database
- **PostgreSQL**: Relational database used with Prisma.

---

## Installation

### Prerequisites
- Node.js (v16+)
- Angular CLI
- PostgreSQL

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/MediTrack.git
    cd MediTrack/backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure the database:
    - Create a `.env` file in the `backend` directory:
      ```env
      DATABASE_URL="postgresql://username:password@localhost:5432/meditrack"
      ```
    - Run Prisma migrations:
      ```bash
      npx prisma migrate dev
      ```
4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the Angular development server:
    ```bash
    ng serve
    ```

---

## Usage

1. Start the backend server.
2. Start the Angular frontend.
3. Access the application at `http://localhost:4200`.

---

## Scripts

### Backend
- **Start Server**: `npm start`
- **Run Migrations**: `npx prisma migrate dev`

### Frontend
- **Start Development Server**: `ng serve`
- **Build for Production**: `ng build`

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

---

## Contact

For any inquiries, please contact [your-email@example.com].  
