import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

import './App.scss';
import NavBar from '../components/NavBar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0]
        };
        setUser(userInfoObject);
        if (authed !== null) {
          setUser(true);
        } else if (user || user === null) {
          setUser(false);
        }
      }
    });
  }, []);

  return (
    <>
     <NavBar user={user} />
    </>
  );
}

export default App;
