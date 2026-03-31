import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import HeaderHome from "../components/HeaderHome";
import bgImage from "../assets/homePageBg.jpg"
import homeCake from "../assets/homeCake.jpg"
import homeCupcake from "../assets/homeCupCake.jpg"
import homepudding from "../assets/homePudding.jpg"
import customer1 from "../assets/homecustomer1.jpg"
import customer2 from "../assets/homecustomer2.jpg"
import aboutus from "../assets/homeCake.jpg"
import FooterHome from "../components/FooterHome";

const Home = () => {
    return (
        <div className="page-wrapper">
            <HeaderHome />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <img 
                    src={bgImage} 
                    alt="Bakery background" 
                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} 
                />
                <Container className="position-relative" style={{ zIndex: 2 }}>
                    <Row className="align-items-center justify-content-center text-center">
                        <Col lg={10} xl={8}>
                            <span className="d-inline-block mb-3 px-4 py-2 rounded-pill" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>
                                Est. 2009 — Lonavala, Pune
                            </span>
                            <h1 className="heading-jumbo text-white mb-4" style={{textShadow: "0 4px 20px rgba(0,0,0,0.3)"}}>
                                Crafted with Love,<br/><span style={{ color: "#e6b981" }}>Baked to Perfection.</span>
                            </h1>
                            <p className="text-white mx-auto mb-5" style={{ maxWidth: '550px', fontSize: "1.15rem", fontWeight: 300, opacity: 0.9 }}>
                                A special combination of the finest ingredients and artisanal techniques. The perfect delicious cake, made especially for you.
                            </p>
                            <div className="d-flex flex-wrap gap-3 justify-content-center">
                                <Button className="btn-premium px-5 py-3 fs-6">Order Now</Button>
                                <Button className="btn-outline-premium text-white border-white px-5 py-3 fs-6" style={{borderWidth: '2px'}}>View Menu</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/* Scroll indicator */}
                <div className="position-absolute text-center text-white" style={{ bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, opacity: 0.6 }}>
                    <div style={{ width: '24px', height: '38px', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '12px', margin: '0 auto 8px', position: 'relative' }}>
                        <div style={{ width: '3px', height: '8px', background: '#fff', borderRadius: '3px', position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', animation: 'scroll-dot 2s infinite' }}></div>
                    </div>
                    <small style={{ letterSpacing: '2px', fontSize: '0.7rem' }}>SCROLL</small>
                </div>
                <style>{`@keyframes scroll-dot { 0%,20% { opacity: 1; transform: translateX(-50%) translateY(0); } 100% { opacity: 0; transform: translateX(-50%) translateY(16px); } }`}</style>
            </section>

            {/* Products Section */}
            <section className="section-padding">
                <Container>
                    <div className="section-title-wrapper">
                        <span className="section-subtitle">Our Specialties</span>
                        <h2 className="section-title">Discover Our Products</h2>
                        <div className="section-divider"></div>
                    </div>
                    
                    <Row className="g-4">
                        {[
                            { img: homeCupcake, title: "Premium Cupcakes", desc: "Miniature works of art placed in beautiful colored cups. Perfectly portioned for your sweetest cravings and celebrations." },
                            { img: homeCake, title: "Signature Cakes", desc: "Handcrafted masterpieces using premium wheat flour, rich butter, and fresh eggs. Perfect for birthdays, weddings, and beyond." },
                            { img: homepudding, title: "Artisan Pudding", desc: "Silky, smooth, and luxuriously creamy. Made from the finest cream and milk, these desserts melt perfectly in your mouth." }
                        ].map((product, i) => (
                            <Col md={4} key={i}>
                                <Card className="card-premium">
                                    <div style={{ overflow: 'hidden' }}>
                                        <Card.Img variant="top" src={product.img} />
                                    </div>
                                    <Card.Body>
                                        <h3 className="card-title">{product.title}</h3>
                                        <p className="card-text">{product.desc}</p>
                                        <Button className="btn-outline-premium mt-auto w-100">Explore →</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* About Section */}
            <section className="section-padding" style={{ backgroundColor: "var(--accent)" }}>
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={5} className="text-center">
                            <img src={aboutus} alt="About" className="img-fluid img-blob" style={{ maxWidth: '380px', height: '380px' }} />
                        </Col>
                        <Col lg={7}>
                            <span className="section-subtitle">Our Story</span>
                            <h2 className="section-title mb-4">A Legacy of Sweetness</h2>
                            <p className="mb-4" style={{ color: "var(--text-main)", lineHeight: 1.8, fontSize: '1.05rem' }}>
                                Founded in 2009 by Mr. Abhishek Mehta, The Cake Shop is nestled in the beautiful Lonavala Hill Area near Pune city.
                            </p>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
                                In an area famous for its excellent culinary delights, TCS Cakes are a beloved favorite for locals and visitors alike. We specialize in cupcakes, puddings, custom event cakes, and crafting sweet memories.
                            </p>
                            <div className="d-flex gap-4 mt-4 flex-wrap">
                                <div>
                                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>15+</h3>
                                    <small style={{ color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>Years Experience</small>
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>5K+</h3>
                                    <small style={{ color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>Cakes Delivered</small>
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>100%</h3>
                                    <small style={{ color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>Fresh Ingredients</small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonials */}
            <section className="section-padding">
                <Container>
                    <div className="section-title-wrapper">
                        <span className="section-subtitle">Testimonials</span>
                        <h2 className="section-title">What Our Customers Say</h2>
                        <div className="section-divider"></div>
                    </div>

                    <Row className="g-4 justify-content-center">
                        {[
                            { img: customer1, name: "Nita Ambani", text: "The products are highly recommended for large and small events. The taste is absolutely divine and the presentation is incredibly elegant." },
                            { img: customer2, name: "Rohit Sharma", text: "The website is beautifully designed and so easy to use. Most importantly, the cakes are absolutely phenomenal! Will order again." }
                        ].map((t, i) => (
                            <Col md={5} key={i}>
                                <div className="testimonial-card">
                                    <img src={t.img} className="testimonial-img" alt={t.name} />
                                    <h4>{t.name}</h4>
                                    <p className="testimonial-text mt-3">"{t.text}"</p>
                                    <div style={{ color: "#f5b301", fontSize: "1.1rem", marginTop: "1rem", letterSpacing: '2px' }}>★★★★★</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <FooterHome />
        </div>
    )
}

export default Home;