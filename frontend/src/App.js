// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import PostList from './components/PostList';
// import PostForm from './components/PostForm';
// import PostDetail from './components/PostDetail';

// const App = () => {
//   const isAuthenticated = !!localStorage.getItem('token');

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <Navigate to="/posts" /> : <Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/posts" element={isAuthenticated ? <PostList /> : <Navigate to="/" />} />
//         <Route path="/create" element={isAuthenticated ? <PostForm /> : <Navigate to="/" />} />
//         <Route path="/post/:id" element={isAuthenticated ? <PostDetail /> : <Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import PostList from './components/PostList';
// import PostDetail from './components/PostDetail';
// import PostForm from './components/PostForm';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ✅ When user visits '/', redirect them to /login */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<SignUp />} />
//         <Route path="/posts" element={<PostList />} />
//         <Route path="/post/:id" element={<PostDetail />} />
//         <Route path="/create" element={<PostForm />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';

function App() {
  const [isAuth, setAuth] = useState(false); // add this

  return (
    <Router>
      <Routes>
        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login setAuth={setAuth} />} /> {/* Pass setAuth */}
        <Route path="/register" element={<SignUp />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/create" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;

