import React from 'react';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import UserPage from './components/UserPage/UserPage';
import { Routes, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

function App() {
  return (
    <div className="container">
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="users/edit/:id" element={<UserPage />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
