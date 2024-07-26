import React from "react";
import { Button, Container,Image, Nav, Navbar } from "react-bootstrap";
import {  NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import qiuLogo from "../assets/QiuLogoSolid2.png"
import { FiLogOut, FiShoppingCart } from "react-icons/fi"
import './headerUser.css';

const HeaderUser = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      alert("Error",error);
    }
  };
  return (
    <>
      {/* <div> Hello</div> */}
      <Container className="m-0 px-2 fixed-top overflow-hidden" style={{ backgroundImage: "linear-gradient(to bottom, #6fb3b8, #82bec4, #95c9d0, #a7d4dc, #badfe7)" }}>

        <Navbar className="p-0" collapseOnSelect expand="lg">
          
            <Navbar.Brand className=" p-0 mx-2" href="#">
              <Image style={{ width: "140px", height: "55px", }} className=" border-0 m-0 rounded-pill p-0" src={qiuLogo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              <NavLink exact
                  className={(navData) => (navData.isActive ? 'nav-link-active mx-3 fw-bold fs-6' : 'nav-link mx-3 fw-bold fs-6')} 
                  to="/userdash" 
                  >Dashboard</NavLink>
                  <NavLink exact
                  className={(navData) => (navData.isActive ? ' nav-link-active mx-3 fw-bold fs-6' : 'nav-link mx-3 fw-bold fs-6')} 
                  to="/userdisplayproduct" 
                  >Product</NavLink>
                  <NavLink exact
                  className={(navData) => (navData.isActive ? ' nav-link-active mx-3 fw-bold fs-6' : 'nav-link mx-3 fw-bold fs-6')} 
                  to="/usercustomcake" 
                  >Custom Cake</NavLink>
                  <NavLink exact
                  className={(navData) => (navData.isActive ? 'nav-link-active mx-3 fw-bold fs-6' : 'nav-link mx-3 fw-bold fs-6')} to="/userprofile" >Order Details and profile</NavLink>
              </Nav>
              <Nav>
              <NavLink exact
                  className={(navData) => (navData.isActive ? 'cart-active ' : 'cart ')} 
                  to="/usercart" > <FiShoppingCart className="fs-4"/></NavLink>
                <Button style={{background:"#388087",border:"none"}} className="mx-2 my-0 px-2 py-1 fw-bold" onClick={handleLogout}><FiLogOut className="fs-4"/></Button>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  )
}

export default HeaderUser;

