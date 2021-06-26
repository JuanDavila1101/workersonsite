import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

export default function Home() {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid className="Jumbotron-Container">
            <h1 className="display-3">Welcome</h1>
            <h1 className="display-3">To</h1>
            <h1 className="display-3">Workers In Site</h1>
        </Container>
      </Jumbotron>
    </div>
  );
}
