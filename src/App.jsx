import React from 'react';
import FormPage from './pages/FormPage';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Form/:id' element={<FormPage />} />
    </Routes>
  );
}
