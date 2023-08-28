import React, {useState} from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message , setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.get('http://localhost:8081/users/signin/${email}');
      const userExists = response.data.exists;

      if (userExists) {
        const userDataResponse = await axios.get('http://localhost:8081/users/signin/${email}');
        const userData = userDataResponse.data;
        setMessage('Logged in successfully!');
      }
      else {
        const newUser = { name , email };
        await axios.post('http://localhost:8081/users/register' , newUser);
        setMessage('User created and logged in!');
      }
      
    } catch (error) {
      setMessage('An error occured.');
      console.error('error');
      
    }
  };


  return (
    <div>
        <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} /> <br/> <br/>
        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} /> <br /> <br />
        <button onClick={handleLogin}> Login </button>
    </div>
  );
};

export default Login;