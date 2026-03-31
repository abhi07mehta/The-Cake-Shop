import React, { useEffect, useState } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import qiuLogo from "../assets/logo.png"
import { FiLogOut, FiShoppingCart, FiHeart, FiMapPin } from "react-icons/fi"

const HeaderUser = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentTheme(savedTheme);
  }, []);

  const changeTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setCurrentTheme(theme);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      alert("Error", error);
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="header-glass py-2">
      <Container>
        <Navbar.Brand as={NavLink} to="/userdash" className="d-flex align-items-center">
          <Image style={{ width: "42px", height: "42px", objectFit: "contain" }} className="me-2" src={qiuLogo} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-main)", fontSize: "1.15rem" }}>The Cake Shop</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="user-navbar" className="border-0 shadow-none" />
        <Navbar.Collapse id="user-navbar">
          <Nav className="me-auto ms-lg-4 mt-3 mt-lg-0 gap-1">
            <NavLink
              className={(navData) => (navData.isActive ? 'nav-link-modern-active' : 'nav-link-modern')}
              to="/userdash"
            >Dashboard</NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? 'nav-link-modern-active' : 'nav-link-modern')}
              to="/userdisplayproduct"
            >Products</NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? 'nav-link-modern-active' : 'nav-link-modern')}
              to="/usercustomcake"
            >Custom Cake</NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? 'nav-link-modern-active' : 'nav-link-modern')}
              to="/userprofile"
            >Profile</NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? 'nav-link-modern-active' : 'nav-link-modern')}
              to="/userordertracking"
            >My Orders</NavLink>
          </Nav>
          <Nav className="align-items-center mt-3 mt-lg-0 gap-2">
            {/* Theme Switcher */}
            <div className="theme-switcher me-2">
              <div onClick={() => changeTheme('light')} className={`theme-dot ${currentTheme === 'light' ? 'active' : ''}`} style={{ background: 'linear-gradient(135deg, #fdfbf7, #e8dfd4)', border: '2px solid #c2935b' }} title="Light" />
              <div onClick={() => changeTheme('dark')} className={`theme-dot ${currentTheme === 'dark' ? 'active' : ''}`} style={{ background: 'linear-gradient(135deg, #1a1714, #2a2420)', border: '2px solid #e6b981' }} title="Dark" />
              <div onClick={() => changeTheme('yummy')} className={`theme-dot ${currentTheme === 'yummy' ? 'active' : ''}`} style={{ background: 'linear-gradient(135deg, #ff6b81, #ff8c42)', border: '2px solid #ff4762' }} title="Yummy" />
            </div>

            <NavLink
              className={(navData) => (navData.isActive ? 'cart-modern-active' : 'cart-modern')}
              to="/userwishlist"
              title="Wishlist"
            ><FiHeart className="fs-5" /></NavLink>

            <NavLink
              className={(navData) => (navData.isActive ? 'cart-modern-active' : 'cart-modern')}
              to="/usercart"
            ><FiShoppingCart className="fs-5" /></NavLink>

            <Button className="btn-premium py-2 px-3 d-flex align-items-center gap-2" onClick={handleLogout}>
              <FiLogOut className="fs-5" />
              <span className="d-none d-lg-inline">Logout</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderUser;
