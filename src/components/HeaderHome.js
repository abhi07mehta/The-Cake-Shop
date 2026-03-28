import React, { useEffect } from "react";
import { Button, Container, Image, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import qiuLogo from "../assets/logo.png"

const HeaderHome = () => {
    
    // Theme switching logic
    const changeTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    return (
        <Navbar expand="lg" fixed="top" className="header-glass py-3">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Image style={{width:"50px", height:"50px", objectFit: "contain"}} className="me-2" src={qiuLogo} />
                    <span style={{fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--secondary)", fontSize: "1.25rem", letterSpacing: "1px"}}>The Cake Shop</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
                
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center mt-3 mt-lg-0">
                        {/* Theme Switcher Widget */}
                        <div className="d-flex align-items-center me-lg-4 mb-3 mb-lg-0 py-2 py-lg-0 px-3 border rounded-pill" style={{ borderColor: 'var(--primary) !important', backgroundColor: 'var(--white)' }}>
                            <span className="me-2" style={{fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)'}}>Theme:</span>
                            <div 
                                onClick={() => changeTheme('light')}
                                style={{cursor: 'pointer', width: '24px', height: '24px', borderRadius: '50%', background: '#fdfbf7', border: '2px solid #c2935b', marginRight: '10px'}}
                                title="Light Theme"
                            />
                            <div 
                                onClick={() => changeTheme('dark')}
                                style={{cursor: 'pointer', width: '24px', height: '24px', borderRadius: '50%', background: '#14110e', border: '2px solid #e6b981', marginRight: '10px'}}
                                title="Dark Theme"
                            />
                            <div 
                                onClick={() => changeTheme('yummy')}
                                style={{cursor: 'pointer', width: '24px', height: '24px', borderRadius: '50%', background: '#ff6b81', border: '2px solid #ff8c42'}}
                                title="Yummy Theme"
                            />
                        </div>

                        <Nav.Link as={Link} to="/login" className="mx-lg-2 mb-2 mb-lg-0 w-100 w-lg-auto">
                            <Button className="btn-outline-premium w-100">Sign In</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signup" className="mx-lg-2 w-100 w-lg-auto">
                            <Button className="btn-premium w-100">Sign Up</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderHome;