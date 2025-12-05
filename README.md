# Habit Tracker – Final Project (INFR 3120 – Part III)

This is our final release for the INFR3120 Web & Scripting Programming project.  
Our group decided to create a full Habit Tracking web application where users can register, log in, and manage their habits in a simple and clean interface. We also added authentication, profile picture upload, and a polished UI to make the experience easier and more personal.

---

## 👥 Group Members
- **Sarah Soueidan**
- **Judah Odoom**
- **Kevin Nguyen**

---

## 🌐 Live Deployment Links
### Backend (Render)
https://project-part-iii.onrender.com/

### Database  
MongoDB Atlas (Cloud-hosted)

---

## 📌 Project Overview
This website allows users to:

- Create an account (local, Google, GitHub)
- Log in and manage daily habits
- Add, edit, and delete habits
- Upload and update their profile picture
- View a clean, user-friendly dashboard
- Log out securely

Our goal was to make the site simple, clean, and visually appealing while keeping everything functional and easy to navigate.

---

## 🚀 Features Implemented

### ✔ Authentication  
- Local username + password  
- Google and GitHub OAuth  
- Session + Passport.js setup  
- Flash messages for errors/success

### ✔ Habit Management (CRUD)
- Add a new habit  
- Edit habit details  
- Delete habits  
- View all habits in a clean dashboard

### ✔ Profile Picture Upload (BONUS +10 Marks)
- Users can upload a picture from their computer  
- Image is stored and saved to their profile  
- Displays in the header and profile page  
- Uses Multer for file uploads  
- Works on Render deployment  

### ✔ UI / Front-End
- Consistent colors, spacing, and layout  
- Clean form design  
- Easy navigation  
- Profile page with image preview  
- Mobile-friendly structure  

### ✔ Deployment
- Backend fully deployed to Render  
- MongoDB Atlas used as cloud database  
- Environment variables secured through Render settings  

---

## 🗂 Technologies Used
- **Node.js / Express**
- **EJS Templates**
- **MongoDB Atlas + Mongoose**
- **Passport.js (Local + Google + GitHub Auth)**
- **Multer (Image uploads)**
- **Bootstrap / Custom CSS**
- **Render (Cloud Deployment)**

---

## 📁 File Structure
/models
/routes
/views
/public
/uploads
app.js
README.md
.env (not included)

---

## 🧪 How to Run Locally

1. Clone the repo:

2. Install dependencies:

3. Add your `.env` file with:
MONGO_URI=
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CALLBACK_URLS...

4. Start the server:

---

## 🎥 Demo Video
Our group demo video explains our code, features, and individual contributions.  
(Link will be added once uploaded.)

---

## 📚 Code Citations
Any external code used (ex: Multer setup examples, passport docs, route references) was learned from:
- Lecture code from INFR3120  
- Express documentation  
- MongoDB documentation  
- Passport.js documentation  
- Multer documentation  

Everything else was written by our group.

---

## Personal Note (from Sarah)
This project took a lot of work, but it was also fun seeing everything come together.  
The deployment, profile picture feature, and clean UI were the biggest challenges, but we managed to finish everything and make the app feel complete.

---

## Final Status
Our project is:
- Fully functional  
- Error-free  
- Visually polished  
- Deployed online  
- Includes bonus features  
- Ready for marking  


