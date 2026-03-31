import React from "react";
import { Container } from "react-bootstrap";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa"
import { FiMail, FiPhone } from "react-icons/fi"

const Footer = () => {
    return (
        <footer className="admin-footer">
            <Container className="d-flex flex-wrap justify-content-between align-items-center">
                <p style={{ margin: 0, color: 'var(--text-light)' }}>© 2024 The Cake Shop — Admin Panel</p>
                <div className="d-flex gap-1">
                    <a href="#!" className="social-icon" style={{width: 32, height: 32, fontSize: '0.8rem'}}><FaFacebook /></a>
                    <a href="#!" className="social-icon" style={{width: 32, height: 32, fontSize: '0.8rem'}}><FiPhone /></a>
                    <a href="#!" className="social-icon" style={{width: 32, height: 32, fontSize: '0.8rem'}}><FaWhatsapp /></a>
                    <a href="#!" className="social-icon" style={{width: 32, height: 32, fontSize: '0.8rem'}}><FaInstagram /></a>
                    <a href="#!" className="social-icon" style={{width: 32, height: 32, fontSize: '0.8rem'}}><FiMail /></a>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;