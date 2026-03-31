import React, { useEffect, useState } from "react";
import { Button, Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { FiLogOut, FiMenu, FiPackage, FiPlusCircle, FiGrid, FiLayers, FiShoppingBag, FiMessageSquare, FiUsers, FiTag } from "react-icons/fi"
import qiuLogo from "../assets/logo.png"

const HeaderAdmin = () => {
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

  const menuItems = [
    { path: '/admindash', label: 'Dashboard', icon: <FiGrid className="me-2" /> },
    { path: '/adminaddproduct', label: 'Add Product', icon: <FiPlusCircle className="me-2" /> },
    { path: '/admindisplayproduct', label: 'Products', icon: <FiPackage className="me-2" /> },
    { path: '/admincustomcakeorder', label: 'Custom Orders', icon: <FiLayers className="me-2" /> },
    { path: '/admindisplayorder', label: 'Order History', icon: <FiShoppingBag className="me-2" /> },
    { path: '/adminfeedback', label: 'Feedback', icon: <FiMessageSquare className="me-2" /> },
    { path: '/adminuserdetails', label: 'Customers', icon: <FiUsers className="me-2" /> },
    { path: '/adminpromocodes', label: 'Promo Codes', icon: <FiTag className="me-2" /> },
  ];

  return (
    <Navbar expand={false} fixed="top" className="header-glass py-2">
      <Container>
        <Navbar.Toggle aria-controls="admin-offcanvas" className="border-0 shadow-none p-2" style={{ color: 'var(--text-main)' }}>
          <FiMenu className="fs-4" />
        </Navbar.Toggle>

        <Navbar.Offcanvas
          id="admin-offcanvas"
          placement="start"
          style={{ width: "300px", background: "var(--background)", borderRight: "1px solid var(--border-light)" }}
        >
          <Offcanvas.Header closeButton style={{ borderBottom: '1px solid var(--border-light)', padding: '1.25rem 1.5rem' }}>
            <Offcanvas.Title>
              <div className="d-flex align-items-center gap-2">
                <Image style={{ width: "36px", height: "36px", objectFit: "contain" }} src={qiuLogo} />
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-main)", fontSize: "1.1rem" }}>Admin Panel</span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ padding: '1rem' }}>
            <Nav className="flex-column">
              {menuItems.map(item => (
                <NavLink
                  key={item.path}
                  className={(navData) => (navData.isActive ? 'admin-nav-link-active' : 'admin-nav-link')}
                  to={item.path}
                >
                  {item.icon}{item.label}
                </NavLink>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Navbar.Brand as={NavLink} to="/admindash" className="d-flex align-items-center mx-auto">
          <Image style={{ width: "42px", height: "42px", objectFit: "contain" }} className="me-2" src={qiuLogo} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-main)", fontSize: "1.15rem" }}>The Cake Shop</span>
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2">
          {/* Theme Switcher */}
          <div className="theme-switcher d-none d-md-flex me-2">
            <div onClick={() => changeTheme('light')} className={`theme-dot ${currentTheme === 'light' ? 'active' : ''}`} style={{ background: 'linear-gradient(135deg, #fdfbf7, #e8dfd4)', border: '2px solid #c2935b' }} title="Light" />
            <div onClick={() => changeTheme('dark')} className={`theme-dot ${currentTheme === 'dark' ? 'active' : ''}`} style={{ background: 'linear-gradient(135deg, #1a1714, #2a2420)', border: '2px solid #e6b981' }} title="Dark" />
            <div onClick={() => changeTheme('yummy')} className={`theme-dot ${currentTheme === 'yummy' ? 'active' : ''}`} style={{ background: 'linear-gradient(135deg, #ff6b81, #ff8c42)', border: '2px solid #ff4762' }} title="Yummy" />
          </div>

          <Button className="btn-premium py-2 px-3 d-flex align-items-center gap-1" onClick={handleLogout}>
            <FiLogOut className="fs-5" />
          </Button>
        </div>
      </Container>
    </Navbar>
  )
}

export default HeaderAdmin;