import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import qiuLogo from "../assets/logo.png"
import { FaInstagram, FaFacebook, FaWhatsapp, FaPhoneAlt } from "react-icons/fa"
import { FiMail, FiMapPin } from "react-icons/fi"

const FooterHome = () => {
    return (
        <>
            {/* CTA Banner */}
            <section style={{ padding: '0 1rem', marginBottom: '-60px', position: 'relative', zIndex: 2 }}>
                <div className="footer-cta">
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '0.5rem' }}>Want a Custom Design?</h3>
                    <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '1.05rem' }}>We craft cakes tailored to your imagination. Tell us your dream cake!</p>
                    <Link to="/usercustomcake" style={{ textDecoration: 'none' }}>
                        <button style={{ background: '#fff', color: 'var(--primary)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.8rem 2.5rem', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
                            onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; }}
                            onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
                        >
                            Order Custom Cake
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-modern" style={{ paddingTop: '100px' }}>
                <Container style={{ paddingBottom: '2rem' }}>
                    <Row className="g-4">
                        <Col lg={4} md={6}>
                            <div className="d-flex align-items-center mb-3">
                                <img style={{ width: "42px", height: "42px", objectFit: "contain" }} alt="logo" className="me-2" src={qiuLogo} />
                                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-main)", fontSize: "1.15rem" }}>The Cake Shop</span>
                            </div>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                Made with love and creativity since 2009. Crafting sweet memories one cake at a time.
                            </p>
                            <div className="d-flex gap-2">
                                <a href="_#" className="social-icon"><FaFacebook /></a>
                                <a href="/" className="social-icon"><FaWhatsapp /></a>
                                <a href="/" className="social-icon"><FaInstagram /></a>
                            </div>
                        </Col>

                        <Col lg={2} md={6}>
                            <h4>Quick Links</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['About Us', 'Products', 'Custom Cakes', 'Gallery'].map(item => (
                                    <li key={item} style={{ marginBottom: '0.6rem' }}>
                                        <a href="_#" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
                                            onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                            onMouseOut={(e) => e.target.style.color = 'var(--text-light)'}
                                        >{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        <Col lg={2} md={6}>
                            <h4>Support</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['FAQ', 'Returns', 'Delivery', 'Terms'].map(item => (
                                    <li key={item} style={{ marginBottom: '0.6rem' }}>
                                        <a href="_#" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
                                            onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                            onMouseOut={(e) => e.target.style.color = 'var(--text-light)'}
                                        >{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        <Col lg={4} md={6}>
                            <h4>Contact Us</h4>
                            <div className="d-flex align-items-start gap-3 mb-3">
                                <FaPhoneAlt style={{ color: 'var(--primary)', marginTop: '4px', flexShrink: 0 }} />
                                <div>
                                    <a href="tel:+918866443258" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.95rem' }}>+91 8866443258</a>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3 mb-3">
                                <FiMail style={{ color: 'var(--primary)', marginTop: '4px', flexShrink: 0 }} />
                                <div>
                                    <a href="mailto:TCScakes@gmail.com" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.95rem' }}>TCScakes@gmail.com</a>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3">
                                <FiMapPin style={{ color: 'var(--primary)', marginTop: '4px', flexShrink: 0 }} />
                                <p style={{ color: 'var(--text-light)', margin: 0, fontSize: '0.95rem' }}>Lonavala Hills, Pune</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="footer-bottom">
                    <Container>
                        <p style={{ margin: 0 }}>© 2024 The Cake Shop. All rights reserved.</p>
                    </Container>
                </div>
            </footer>
        </>
    )
}

export default FooterHome;