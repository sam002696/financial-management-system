# Financial Management System

This repository contains a **Financial Management System** that includes three main components:

1. **Frontend (Angular 19)** - User interface built with Angular
2. **Backend Service ( Spring Boot with MySQL)** - API service using Spring Boot
3. **Express Server (Node.js)** - Additional backend service using Express.js

## Prerequisites

Ensure you have the following installed before proceeding:

- **Git** - [Download & Install Git](https://git-scm.com/downloads)
- **Node.js (v18.19.1 or newer)** - [Download & Install Node.js](https://nodejs.org/)
  - _Recommended:_ Use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to manage Node.js versions.
- **MySQL** - [Download & Install MySQL](https://dev.mysql.com/downloads/installer/)
- **Java** - [Download & Install Java](https://www.oracle.com/java/technologies/javase/)
- **IntelliJ IDEA** - [Download IntelliJ IDEA](https://www.jetbrains.com/idea/)
- **Visual Studio Code** - [Download VS Code](https://code.visualstudio.com/)

---

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/sam002696/financial-management-system.git
cd financial-management-system
```

---

## Frontend Setup (Angular 19)

1. Navigate to the frontend directory:

```bash
cd frontend-angular
```

2. Install dependencies:

```bash
npm install
```

3. Start the Angular application:

```bash
npm start
```

4. The frontend will be available at:
   - **http://localhost:4200**

---

## Database Setup (MySQL)

1. **Start MySQL Server** (if not already running) on port **3306**.
2. Open MySQL CLI or a GUI tool like MySQL Workbench.
3. Create the required database:

```sql
CREATE DATABASE financial_activity_system;
```

4. MySQL Credentials:
   ```yaml
   username: root
   password: root
   driver-class-name: com.mysql.cj.jdbc.Driver
   url: jdbc:mysql://localhost:3306/financial_activity_system
   ```
5. Other necessary details can be found in the `application.yml` file.

---

## Backend Setup (Spring Boot + MySQL)

1. Navigate to the backend service directory:

```bash
cd backend-service-springboot
```

2. Open the project in **IntelliJ IDEA**.
3. Ensure Java and Maven are installed.
4. Run the Spring Boot application using IntelliJ IDEA or via terminal:

```bash
mvn spring-boot:run
```

5. The backend will be running at:
   - **http://localhost:9500**
   - **Swagger API Documentation:** [http://localhost:9500/swagger-ui/index.html#](http://localhost:9500/swagger-ui/index.html#)

---

## Express Server Setup (Node.js)

1. Navigate to the Express server directory:

```bash
cd backend-service-express
```

2. Install dependencies:

```bash
npm install
```

3. Start the Express server:

```bash
npm start
```

4. The Express backend will be available at:
   - **http://localhost:3000**

---

## Running the Complete System

To run the entire system:

1. Start **MySQL**
2. Start the **Spring Boot backend**
3. Start the **Express server**
4. Start the **Angular frontend**

Your application should now be fully functional.

---

## Project Overview

### Purpose

The **Financial Activity Management System** focuses on tracking financial activities (**income, expenses, loans**) and enforcing contracts without processing actual financial transactions.

### Key Features

#### 1. User Management

- **User Registration**: Users can register with an email and password. The system ensures email validity and uniqueness.
- **User Login**: Users log in with their credentials, and the system generates a JWT token for authentication.
- **Profile Management**: Users can update their profiles while authenticated.

#### 2. Financial Activities

- **Income Logging**: Users can log income sources, and the system creates an associated contract.
- **Expense Logging**: Users log expenses, and the system ensures expenses don’t exceed available balance.
- **Loan Management**: Users can request loans, and the system validates and enforces repayment rules.

#### 3. Contract Enforcement

- Contracts track each financial activity, ensuring proper enforcement of balance checks and loan repayment schedules.
- **Loan Repayment Tracking**: The system updates contract statuses and shows due dates.
- **Expense Validation**: Ensures users do not overspend beyond their available funds.

#### 4. Reporting & Summaries

- Users can generate reports summarizing **income vs. expenses**, **loan status**.
- Provides insights into financial health and outstanding obligations.

#### 5. Real-Time Notifications (Express + Socket.io)

- Express server handles **real-time notifications** for financial activities.
- Frontend users receive instant updates when **income, expenses, or loans** are logged.
