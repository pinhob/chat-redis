import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleClick = (role) => {
    navigate(role === 0 ? '/technician' : '/attendant', {
      state: {
        name,
        role
      }
    });
  };

  return (
    <>
      <h1>Chat</h1>

      <label htmlFor="name">
        Nome:
        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
      </label>
      <h2>Entrar como:</h2>
      <button onClick={() => handleClick(0)}>Técnico</button>
      <button onClick={() => handleClick(1)}>Atendente</button>
    </>
  );
};

export default Login;