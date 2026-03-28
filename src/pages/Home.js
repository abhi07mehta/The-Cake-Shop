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
        <div style={{ backgroundColor: "var(--background)" }}>
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
                        <Col lg={10}>
                            <h1 className="heading-jumbo text-white mb-4" style={{textShadow: "0 4px 12px rgba(0,0,0,0.3)"}}>
                                Crafted with Love.<br/><span style={{ color: "var(--primary)"}}>Baked to Perfection.</span>
                            </h1>
                            <p className="lead text-white mx-auto mb-5" style={{ maxWidth: '600px', fontSize: "1.2rem", fontWeight: 300 }}>
                                Produced through strict supervision and quality standards. A special combination of the best ingredients, especially for you.
                            </p>
                            <Button className="btn-premium px-5 py-3 fs-5 me-3">Order Now</Button>
                            <Button className="btn-outline-premium text-white border-white px-5 py-3 fs-5">Our Menu</Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Products Section */}
            <section className="section-padding">
                <Container>
                    <div className="section-title-wrapper">
                        <span className="section-subtitle">Our Specialties</span>
                        <h2 className="section-title">Discover Our Products</h2>
                        <div style={{ width: "60px", height: "3px", backgroundColor: "var(--primary)", margin: "0 auto" }}></div>
                    </div>
                    
                    <Row className="g-4">
                        <Col md={4}>
                            <Card className="card-premium">
                                <Card.Img variant="top" src={homeCupcake} />
                                <Card.Body>
                                    <h3 className="card-title">Cup Cakes</h3>
                                    <p className="card-text">
                                        Miniatures of large cakes placed in beautiful colored cups. Attractive appearance and perfectly portioned for sweet cravings.
                                    </p>
                                    <Button className="btn-outline-premium mt-3 w-100">Explore</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="card-premium">
                                <Card.Img variant="top" src={homeCake} />
                                <Card.Body>
                                    <h3 className="card-title">Signature Cakes</h3>
                                    <p className="card-text">
                                        Masterpieces made with premium wheat flour, sugar, eggs, and rich butter. Perfect for birthdays, weddings, or any celebration.
                                    </p>
                                    <Button className="btn-outline-premium mt-3 w-100">Explore</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="card-premium">
                                <Card.Img variant="top" src={homepudding} />
                                <Card.Body>
                                    <h3 className="card-title">Premium Pudding</h3>
                                    <p className="card-text">
                                        A classic dessert dish made from rich cream and milk. Silky, smooth, and melts perfectly in your mouth.
                                    </p>
                                    <Button className="btn-outline-premium mt-3 w-100">Explore</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* About Us Section */}
            <section className="section-padding" style={{ backgroundColor: "var(--accent)" }}>
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={5} className="text-center position-relative">
                            <img src={aboutus} alt="About The Cake Shop" className="img-fluid img-blob" style={{ maxWidth: '400px', height: '400px' }} />
                        </Col>
                        <Col lg={7}>
                            <span className="section-subtitle">Our Story</span>
                            <h2 className="section-title mb-4">A Legacy of Sweetness</h2>
                            <p className="fs-5 mb-4" style={{ color: "var(--secondary)", lineHeight: 1.8 }}>
                                Founded in 2009 by Mr. Abhishek Mehta, The Cake Shop is located in the beautiful Lonavala Hill Area near Pune city. 
                            </p>
                            <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                                In an area famous for its excellent culinary delights, TCS Cakes are a favorite for locals and visitors alike. We specialize in cupcakes, puddings, custom event cakes, and memories.
                            </p>
                            <Button className="btn-premium">Read the Full Story</Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding">
                <Container>
                    <div className="section-title-wrapper">
                        <span className="section-subtitle">Testimonials</span>
                        <h2 className="section-title">What Our Customers Say</h2>
                        <div style={{ width: "60px", height: "3px", backgroundColor: "var(--primary)", margin: "0 auto" }}></div>
                    </div>

                    <Row className="g-4 justify-content-center">
                        <Col md={5}>
                            <div className="testimonial-card">
                                <img src={customer1} className="testimonial-img" alt="Customer" />
                                <h4>Nita Ambani</h4>
                                <p className="testimonial-text mt-3">
                                    "The products offered are highly recommended for large and small events with a very delicious taste. The presentation is incredibly elegant."
                                </p>
                                <div style={{ color: "#f5b301", fontSize: "1.2rem", marginTop: "1rem" }}>★★★★★</div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className="testimonial-card">
                                <img src={customer2} className="testimonial-img" alt="Customer" />
                                <h4>Rohit Sharma</h4>
                                <p className="testimonial-text mt-3">
                                    "The website has an attractive appearance and is easy to use. Most importantly, the cakes are absolutely phenomenal!"
                                </p>
                                <div style={{ color: "#f5b301", fontSize: "1.2rem", marginTop: "1rem" }}>★★★★★</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <FooterHome />
        </div>
    )
}

export default Home;