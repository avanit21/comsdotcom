import React, {Fragment} from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper/index";


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer style={currentTab(history, "/")} to='/'>
            <Navbar.Brand>comsdotcom</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            
            <Nav className='ml-auto'>
              <LinkContainer style={currentTab(history, "/cart")} to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {isAutheticated() && isAutheticated().user.role ===0 && (
                <LinkContainer style={currentTab(history, "/user/dashboard")}  to='/user/dashboard'>
                  <Nav.Link>
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
              )}

              {isAutheticated() && isAutheticated().user.role===1 && (
                <LinkContainer style={currentTab(history, "/admin/dashboard")}  to='/admin/dashboard'>
                  <Nav.Link>
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
              )}

              {!isAutheticated() && (
                <Fragment>
                  <LinkContainer style={currentTab(history, "/signup")}  to='/signup'>
                    <Nav.Link>
                      Signup
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer style={currentTab(history, "/signin")}  to='/signin'>
                    <Nav.Link>
                      Signin
                    </Nav.Link>
                  </LinkContainer>
                  
                </Fragment>
              )}
              {isAutheticated() && (

                <LinkContainer to="/" onClick={() => {
                  signout(() => {
                    history.push("/")
                  })
                }}>
                  <Nav.Link>
                    Signout
                  </Nav.Link>
                </LinkContainer>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  
);

export default withRouter(Menu);

