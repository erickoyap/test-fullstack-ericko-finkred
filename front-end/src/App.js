import React from 'react';
import UserList from './components/users/UserList';
import UserAdd from './components/users/UserAdd';
import UserUpdate from './components/users/UserUpdate';
import Login from './components/Login';
import Logout from './components/Logout';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function App() {
  const routes =
        <>
        <Route path="/user/list" component={UserList} />
        <Route path="/user/add" component={UserAdd} />
        <Route path="/user/update/:id" component={UserUpdate} />
        <Route path="/login" component={Login} />
        </>;

  // TODO: confirm session from node.js, if not available, only Login shows up.

  return (
      <Router>
          <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous"
          />
          <Container as="div" style={{width:"768px"}}>
              <hr />
              <Nav>
                  <Nav.Item>
                      <Nav.Link href="/user/list">List
                      </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link href="/user/add">Add
                      </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link href="/login">Login
                      </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link href="#">
                          <Logout />
                      </Nav.Link>
                  </Nav.Item>
              </Nav>
              <hr />
              <Container style={{marginTop:"10px"}}>
                {routes}
                <br />
                  <div style={{marginTop:"20px", textAlign:"center"}}>Ericko Yaputro @2019</div>
              </Container>
          </Container>
      </Router>
  );
}

export default App;
