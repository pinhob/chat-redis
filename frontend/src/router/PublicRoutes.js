import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/technician' element={<h1>Técnico</h1>} />
      <Route path='/attendant' element={<h1>Atendente</h1>} />
    </Routes>
  )
};

export default PublicRoutes;
