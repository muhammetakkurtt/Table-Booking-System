# Table Booking System

Table Booking System is a web application that allows table reservations for restaurants. With this application, users can book a table, view their existing reservation and cancel it.

## Features

- User Registration and Login
- Table Reservation
- View Existing Reservation
- Reservation Cancellation

## Technologies Used

- Frontend: HTML, CSS (TailwindCSS), JavaScript
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JWT (JSON Web Tokens)

## Installation

Follow the steps below to get the project working in your local environment:

#### Requirements

- Node.js and npm must be installed.
- MySQL must be installed and running.

#### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/muhammetakkurtt/Table-Booking-System.git
    cd Table-Booking-System
    ```

2. Install the necessary packages:
    ```bash
    npm install
    ```

3. Configure the database:
   - Create a database in MySQL.
   - Create the `.env` file and enter the database configuration information:
     ```
     JWT_SECRET=secretkey
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=password
     DB_NAME=table_booking_system
     ```
4. Create database tables and add tables:
   - Run the following SQL queries using the MySQL command line:
     ```sql
     -- Create the Users table
     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         role ENUM('user', 'admin') DEFAULT 'user'
     );

     -- Create the Tables table
     CREATE TABLE tables (
         id INT AUTO_INCREMENT PRIMARY KEY,
         table_number INT NOT NULL,
         seats INT NOT NULL,
         status ENUM('available', 'occupied') DEFAULT 'available'
     );

     -- Create the Reservations table
     CREATE TABLE reservations (
         id INT AUTO_INCREMENT PRIMARY KEY,
         user_id INT,
         table_id INT,
         reservation_date DATETIME,
         status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
         FOREIGN KEY (user_id) REFERENCES users(id),
         FOREIGN KEY (table_id) REFERENCES tables(id)
     );

     -- Add tables with random numbers of seats
     INSERT INTO tables (table_number, seats, status) VALUES 
     (1, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (2, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (3, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (4, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (5, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (6, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (7, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (8, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (9, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (10, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (11, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (12, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (13, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (14, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (15, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (16, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (17, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (18, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (19, FLOOR(1 + (RAND() * 4)) * 2, 'available'),
     (20, FLOOR(1 + (RAND() * 4)) * 2, 'available');
     ```
     
5. Start the server: 
    ```bash
    npm start
    ```
    
6. View the project in your browser: 
    ```
    http://localhost:5000
    ```
      
## Usage

- You can log in to the system by registering and logging in as a user.
- Select the appropriate table and date to make a table reservation.
- You can view and cancel your existing reservation.

## Live Demo

You can use the link below to test the application live. The application is hosted on an EC2 instance running on AWS. PM2 is used to manage and run Node.js in the background and Nginx is used to manage incoming requests and run the application through a proxy on Ubuntu 22.04.

[Table Booking System Live Demo](http://13.51.197.141/)
