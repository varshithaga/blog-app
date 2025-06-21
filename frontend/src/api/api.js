// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:8000/api/',
//   headers: {
//     Authorization: 'Token 4daae0befe2bec9d5f700f7e858c7f13171cc8f0',  // 👈 Add your token here
//   },
// });

// export default API;


import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  // Avoid sending token with login/register requests
  if (!['login/', 'register/'].includes(config.url) && token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});


export default API;
