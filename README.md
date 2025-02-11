Overview
A full-stack MERN-based healthcare application that allows users to book doctor appointments, manage schedules, and track patient records. The system includes three roles: User, Doctor, and Admin, each with specific functionalities.

Features
User Panel:
✅ Register and log in securely.
✅ Browse and book appointments based on doctor specialization (Neurologist, General Physician, Dermatologist, etc.).
✅ Select available slots between 10 AM - 9 PM.
✅ Make payments and cancel appointments if needed.

Doctor Panel:
✅ Secure login with role-based authentication.
✅ View appointments booked by patients, including name, age, payment mode (cash/card), and fees.
✅ Cancel or mark appointments as completed (with real-time toast notifications).
✅ Dashboard to track earnings, total appointments, and patient details.

Admin Panel:
✅ View, manage, and cancel user appointments (with notifications).
✅ Track total doctors, patients, and appointments via dashboard analytics.
✅ Add new doctors with details (image, specialization, education, experience).
✅ Manage doctor availability (mark doctors as unavailable).

Tech Stack
Frontend: React.js, Tailwind CSS, HTML
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Notifications: React Toastify
