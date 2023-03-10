import { useState } from 'react';
import { Container } from "@chakra-ui/react";
import './App.css';
import Login from './pages/login.jsx';
import SignUp from './pages/signUp.jsx';
import Guest from './pages/guest.jsx';
import UserPets from './pages/pets.jsx';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState("");
  const [guest, setGuest] = useState(false);

  return (
    <Container className="App">
      {!isUserLoggedIn ?
        <Container textAlign={'center'}>
          <h1>Welcome to Pet API!</h1>
          <br />
          {showLogin ?
            <Login loginGuestUser={() => {
              setIsUserLoggedIn(true);
              setGuest(true);
            }} loginUser={(username) => {
              setName(username);
              setIsUserLoggedIn(true);
            }} signUp={() => setShowLogin(false)} />
            :
            <SignUp signInGuestUser={() => {
              setIsUserLoggedIn(true);
              setGuest(true);
            }} loginNewUser={(username) => {
              setName(username);
              setIsUserLoggedIn(true);
            }} LogIn={() => setShowLogin(true)} />
          }
        </Container> :
        guest ?
        <Guest logoutGuestUser={() => {
          setIsUserLoggedIn(false);
          setGuest(false);
        }} /> :
          <UserPets name={name} logoutUser={() => {
            setIsUserLoggedIn(false);
            setName("");
          }} />}
    </Container>
  )
};

export default App;