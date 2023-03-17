import { Route, Routes } from 'react-router-dom';
import { Attendant, Login, Technician } from '../pages';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/technician' element={<Technician />} />
      <Route path='/attendant' element={<Attendant />} />
    </Routes>
  )
};

export default PublicRoutes;
