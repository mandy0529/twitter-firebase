import {useEffect, useState} from 'react';
import Router from './components/Router';
import {authService} from './fbase';

function App() {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        console.log(user, '1true userstate');
      } else {
        setLoggedIn(false);
        console.log(user, '2 false userstate');
      }
      setInit(true);
    });
  });

  return <>{init ? <Router loggedIn={loggedIn} /> : 'initializing . . .'}</>;
}

export default App;
