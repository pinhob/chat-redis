import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleClick = (role) => {
    role === 'technician' ? navigate('/technician') : navigate('/attendant');
  };

  return (
    <>
      <h1>Entrar como:</h1>
      <button onClick={() => handleClick("technician")}>Técnico</button>
      <button onClick={() => handleClick("attendant")}>Atendente</button>
    </>
  );
};

export default Login;