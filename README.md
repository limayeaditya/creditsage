# CreditSage
We are a credit rating agency that assesses the creditworthiness of financial products, specifically residential mortgage-backed securities (RMBS). Our ratings are critical for investors and institutions in determining the quality and risk associated with mortgage-backed securities.
# Project Setup Guide

This document provides step-by-step instructions to run the project, both with and without Docker.

---

## **1. Prerequisites**
Ensure you have the following installed:
- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js 16+](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Docker](https://www.docker.com/) (if running with Docker)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## **2. Running the Project Without Docker**

### **Backend Setup (FastAPI)**
1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```
2. **Create a virtual environment:**
   ```sh
   python -m venv venv
   ```
3. **Activate the virtual environment:**
   - **Windows:**
     ```sh
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```sh
     source venv/bin/activate
     ```
4. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
5. **Set environment variables (or use a `.env` file):**
   ```sh
   export DATABASE_URL="mysql+pymysql://admin:pass1234@localhost/mortgages"
   export LOG_LEVEL=INFO
   ```
6. **Run the FastAPI server:**
   ```sh
   uvicorn app:app --host 0.0.0.0 --port 8000 --reload
   ```

### **Frontend Setup (ReactJS)**
1. **Navigate to the frontend directory:**
   ```sh
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set environment variables (or use a `.env` file):**
   ```sh
   export REACT_APP_API_BASE_URL=http://127.0.0.1:8000
   ```
4. **Run the React app:**
   ```sh
   npm start
   ```

### **MySQL Setup (Local Installation)**
1. Start MySQL service.
2. Create a database:
   ```sql
   CREATE DATABASE mortgages;
   ```
3. Ensure the database credentials match the `.env` configuration.
4. Create the `mortgages` table:
   ```sql
   USE mortgages;
   CREATE TABLE mortgages (
       id INT AUTO_INCREMENT PRIMARY KEY,
       credit_score INT NOT NULL,
       loan_amount DECIMAL(10,2) NOT NULL,
       property_value DECIMAL(10,2) NOT NULL,
       annual_income DECIMAL(10,2) NOT NULL,
       debt_amount DECIMAL(10,2) NOT NULL,
       loan_type VARCHAR(255) NOT NULL,
       property_type VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

---

## **3. Running the Project With Docker Compose**

### **Update the `.env` File**
Before running Docker Compose, ensure your `.env` file has the following values:
```
DATABASE_URL=mysql+pymysql://admin:pass1234@mysql-container/mortgages
LOG_LEVEL=INFO
LOG_FORMAT=%(asctime)s - %(levelname)s - %(name)s - %(message)s
REACT_APP_API_BASE_URL=http://backend:8000
```

### **Steps:**
1. **Ensure Docker is running.**
2. **Navigate to the project root directory (where `docker-compose.yml` is located):**
   ```sh
   cd /path/to/project
   ```
3. **Run the application using Docker Compose:**
   ```sh
   docker-compose up --build -d
   ```
4. **Verify the services are running:**
   ```sh
   docker ps
   ```
5. **Access the application:**
   - Backend: `http://localhost:8000/docs`
   - Frontend: `http://localhost:3000`
   - MySQL: Connect using `admin:pass1234@mysql-container`
6. **Enter the MySQL container and create the `mortgages` table:**
   ```sh
   docker exec -it mysql-container mysql -uadmin -ppass1234
   ```
   ```sql
   USE mortgages;
   CREATE TABLE mortgages (
       id INT AUTO_INCREMENT PRIMARY KEY,
       credit_score INT NOT NULL,
       loan_amount DECIMAL(10,2) NOT NULL,
       property_value DECIMAL(10,2) NOT NULL,
       annual_income DECIMAL(10,2) NOT NULL,
       debt_amount DECIMAL(10,2) NOT NULL,
       loan_type VARCHAR(255) NOT NULL,
       property_type VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### **Stopping the Containers**
To stop the services, run:
```sh
docker-compose down
```

---

## **4. Debugging Issues**
- **Check running containers:**
  ```sh
  docker ps
  ```
- **View logs:**
  ```sh
  docker logs container_name
  ```
- **Enter a running container:**
  ```sh
  docker exec -it container_name bash
  ```

---

Now, you can successfully run the project with and without Docker! 🚀

