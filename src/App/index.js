import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Col, Container, Row } from 'reactstrap';
import './App.scss';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

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
     <Container className="themed-container" fluid={true}>
       <Row xs="12">
         <Col>
           <Header className="themed-container" fluid="xl"/>
         </Col>
       </Row>
       <Row>
         <Col>
           <NavBar user={user} />
         </Col>
       </Row>
       <div className="main-container">
         <Row>
          <Col sm="3">
            <div className="buffer-container">
              Buffer Left
            </div>
          </Col>
          <Col sm="6">
            <div className="center-container">
              Center Container
            </div>
          </Col>
          <Col className="buffer-container" sm="3">
            <div className="buffer-container">
              Buffer Right
            </div>
          </Col>
         </Row>
       </div>
     </Container>
    </>
  );
}

export default App;
