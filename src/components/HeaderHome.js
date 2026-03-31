import React, { useEffect, useState } from "react";
import { Button, Container, Image, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import qiuLogo from "../assets/logo.png"

const HeaderHome = () => {
    const [currentTheme, setCurrentTheme] = useState('light');

    const changeTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        setCurrentTheme(theme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        setCurrentTheme(savedTheme);
    }, []);

    return (
        <Navbar expand="lg" fixed="top" className="header-glass py-2">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Image style={{width:"46px", height:"46px", objectFit: "contain"}} className="me-2" src={qiuLogo} />
                    <span style={{fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-main)", fontSize: "1.2rem", letterSpacing: "0.5px"}}>The Cake Shop</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="home-navbar" className="border-0 shadow-none" style={{color: 'var(--text-main)'}} />
                
                <Navbar.Collapse id="home-navbar" className="justify-content-end">
                    <Nav className="align-items-center mt-3 mt-lg-0 gap-2">
                        {/* Theme Switcher */}
                        <div className="theme-switcher me-lg-3">
                            <div 
                                onClick={() => changeTheme('light')}
                                className={`theme-dot ${currentTheme === 'light' ? 'active' : ''}`}
                                style={{background: 'linear-gradient(135deg, #fdfbf7, #e8dfd4)', border: '2px solid #c2935b'}}
                                title="Light Theme"
                            />
                            <div 
                                onClick={() => changeTheme('dark')}
                                className={`theme-dot ${currentTheme === 'dark' ? 'active' : ''}`}
                                style={{background: 'linear-gradient(135deg, #1a1714, #2a2420)', border: '2px solid #e6b981'}}
                                title="Dark Theme"
                            />
                            <div 
                                onClick={() => changeTheme('yummy')}
                                className={`theme-dot ${currentTheme === 'yummy' ? 'active' : ''}`}
                                style={{background: 'linear-gradient(135deg, #ff6b81, #ff8c42)', border: '2px solid #ff4762'}}
                                title="Yummy Theme"
                            />
                        </div>

                        <Nav.Link as={Link} to="/login" className="p-0 mx-lg-1">
                            <Button className="btn-outline-premium">Sign In</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signup" className="p-0 mx-lg-1">
                            <Button className="btn-premium">Sign Up</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderHome;