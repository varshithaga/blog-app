# 📝 Blog App (Django + React)

This is a full-stack blog application built using **Django (DRF)** for the backend and **React** for the frontend. It supports user authentication, creating posts with tags and images, commenting (with nested replies), and liking posts.

---

# 🚀 Features

- 🔐 User registration & login (Token-based)<br>
- ✍️ Create, read, update, and delete blog posts<br>
- 🖼️ Upload images with posts<br>
- 🏷️ Add multiple tags (comma-separated)<br>
- 💬 Comment & reply to comments (nested)<br>
- 👍 Like/Unlike posts<br>
- 🔍 Search posts by tag<br>
- 🎨 Clean UI with responsive layout<br>

---
📄 **Screenshots Preview**  
For a visual walkthrough of the application (Login, Create Post, View Posts, Comments, Like, etc.), please refer to the above blogapp.pdf.

---

# 🗂️ Folder Structure

<pre>
blog-app/
├── backend/       # Django backend (API)
│   ├── blog/      # Blog app (models, views, serializers)
│   └── manage.py
├── frontend/      # React frontend (UI)
│   └── src/
└── README.md      
</pre>

---

# ⚙️ Installation

## 1. Clone the repository

<pre>
git clone https://github.com/varshithaga/blog-app.git
cd blog-app
</pre>

---

## 2. Setup Python backend

<pre>
cd backend
python -m venv venv
venv\Scripts\activate       # On Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
</pre>

---

## 3. Setup React frontend

<pre>
cd ../frontend
npm install
npm start
</pre>

---

# 🧑‍💻 Author

**Varshitha GA** – [GitHub Profile](https://github.com/varshithaga)


## 🗂️ In Depth  Folder Structure

<pre>

blog-app/
├── backend/ # Django Backend
│ ├── blog/ # Django App: Core blog logic
│ │ ├── init.py
│ │ ├── admin.py # Register models for Django admin
│ │ ├── apps.py
│ │ ├── models.py # Post, Comment, Like, Tag models
│ │ ├── serializers.py # DRF Serializers for all models
│ │ ├── urls.py # Blog app-level API routes
│ │ ├── views.py # PostViewSet, CommentViewSet, Auth APIs
│ │ └── migrations/
│ │ ├── init.py
│ │ └── 0001_initial.py
│ ├── backend/
│ │ ├── init.py
│ │ ├── asgi.py
│ │ ├── settings.py # Django project settings
│ │ ├── urls.py # Project-level URL config
│ │ └── wsgi.py
│ ├── manage.py
│ └── requirements.txt # Python dependencies

├── frontend/ # React Frontend
│ ├── public/
│ │ └── index.html
│ └── src/
│ ├── api/
│ │ └── api.js # Axios API instance
│ ├── components/
│ │ ├── Login.js # Login form
│ │ ├── Signup.js # Signup form
│ │ ├── PostForm.js # Create a new post
│ │ ├── PostList.js # List all posts + search
│ │ ├── PostDetail.js # View single post + like
│ │ └── CommentSection.js# Add/view comments & replies
│ ├── App.js # React routing
│ └── index.js # React root entry

├── .gitignore
├── README.md # Project documentation

<pre>


