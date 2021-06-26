import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './App.scss';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import { getSites } from '../helpers/data/sitesData';
import Routes from '../helpers/data/Routes';
import { getWorkers } from '../helpers/data/workersData';

function App() {
  const [user, setUser] = useState(null);
  const [sites, setSites] = useState([]);
  const [workers, setWorkers] = useState([]);

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
        getSites(authed.uid).then((sitesArray) => setSites(sitesArray));
        getWorkers(authed.uid).then((workersArray) => setWorkers(workersArray));
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      <Router>
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
               </div>
             </Col>
             <Col sm="6">
               <div className="center-container">
                 <Routes
                   sites={sites}
                   setSites={setSites}
                   workers={workers}
                   setWorkers={setWorkers}
                   user={user}
                 />
               </div>
             </Col>
             <Col sm="3">
               <div className="buffer-container">
               </div>
             </Col>
            </Row>
          </div>
        </Container>
      </Router>
    </>
  );
}

export default App;
