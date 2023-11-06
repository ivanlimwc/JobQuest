import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouteProvider, RouterProvider} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Job from './pages/Job';
import Review from './pages/Review';
import Company from './pages/Company';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path = '/' element={<RootLayout />}>
      <Route path='/' element={<App />} />
      <Route path ='/signin' element={<Signin />} />
      <Route path = '/signup' element={<Signup />} />
      <Route path = '/profile' element={<Profile />} />
      <Route path = '/job' element={<Job />} />
      <Route path = '/review' element={<Review />} />
      <Route path = '/company' element={<Company />} />
    </Route>
  ))
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
