import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavBar.css";
import logoImg from '../../assets/images/얼음이.png';
import logoText from '../../assets/images/textlogo.png';

function NavBar() {
    return (
      <div className="nav-div">
        <Navbar className="navBar">
          <Container>
            <Navbar.Brand href="/">
              <img
                className="nav-logo"
                alt="logo"
                src={logoImg}
              ></img>
              <img
                className="nav-logotext"
                alt="logo"
                src={logoText}
              ></img>
            </Navbar.Brand>
            <Nav className="nav-button">
              <Nav.Link href="/register/need">필요해요</Nav.Link>
              <Nav.Link href="/register/get">받았어요</Nav.Link>
              <Nav.Link href="/reward">마이 리워드</Nav.Link>
            </Nav>
            <div>
            <div className="nav-right">로그아웃</div>
            <div className='nav-right'>HI, wing-beat님</div>
            </div>
          </Container>
        </Navbar>
      </div>
    );
  }
  
  export default NavBar;