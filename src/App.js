import React from 'react';
import Login from './components/Login';
import Recording from './components/Recording';
// import Webcam from 'react-webcam';

function App() {
  // const[jwtToken , setJwtToken] = useState(null);

  // const handleLogin = (token) => {
  //   setJwtToken(token);
  // };


  return (
    <div className="App">
      <Login />
      <Recording />
      
      
    </div>
   
  );
}

export default App;
