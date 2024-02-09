import FormPage from './pages/AddFormPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Database from './pages/Database';
import ProfilForm from './pages/ProfilForm';
import "./App.css"
import NotFoundPage from './pages/NotFoundPage';
import DetailPage from './pages/DetailPage';
export default function App() {
  return (
    <Routes>
      <Route path='/admin' element={<Database />} />
      <Route path='/' element={<HomePage />} />
      <Route path='admin/Form/:id' element={<FormPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/profile/:id' element={<ProfilePage />} />
      <Route path='/profile/:id/form' element={<ProfilForm />} />
      <Route path='/*' element={<NotFoundPage />} />
      <Route path='/detail/:id' element= {<DetailPage />}/>
    </Routes>
  );
}
