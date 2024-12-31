# TODO List Project

---

## Prerequisites

Before getting started, ensure the following are installed on your system:

1. **Git**: To clone the repository.
    - [Download and Install Git](https://git-scm.com/)
    - Verify installation:
      ```bash
      git --version
      ```

2. **Docker Desktop**: To manage containers.
    - [Download and Install Docker Desktop](https://www.docker.com/products/docker-desktop/)
    - Ensure Docker Compose is included (it is by default with Docker Desktop).
    - Verify installation:
      ```bash
      docker --version
      docker-compose --version
      ```

---

## Steps to Run the Application

### 1. Clone the Repository

Open a terminal and clone the project repository:
```bash
git clone https://github.com/DanVaitzman1/todo-list-project.git
```

Navigate into the project directory:
```bash
cd todo-list-project
```

---

### 2. Start the Application with Docker Compose

Run the following commands from the project root directory:

1. **Build and Start the Containers**:
   ```bash
   docker-compose up --build
   ```
   This will:
    - Build the backend and frontend services.
    - Start the containers for the backend, frontend, and MongoDB.

2. **Verify the Services**:
    - Backend API (with Swagger):
      Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser.
    - Frontend Application:
      Open [http://localhost:8080](http://localhost:8080) in your browser.

---

### 3. Stop the Application

To stop the running containers, press `Ctrl + C` in the terminal where `docker-compose up` is running.

Alternatively, you can stop the containers with:
```bash
docker-compose down
```

---

## Additional Notes

1. **Clean Builds**:
   If you encounter any issues, perform a clean build by removing existing containers and images:
   ```bash
   docker-compose down --rmi all --volumes --remove-orphans
   docker-compose up --build
   ```

2. **Logs**:
   View logs for troubleshooting:
   ```bash
   docker-compose logs -f
   ```

3. **Accessing MongoDB (Optional)**:
   If your backend uses MongoDB and you want to inspect the database, you can connect to it using a MongoDB client at:
    - Host: `localhost`
    - Port: `27017`

---
