import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import HeaderUser from "../components/HeaderUser";
import homeCake from "../assets/homeCake.jpg"
import homeCupcake from "../assets/homeCupCake.jpg"
import homepudding from "../assets/homePudding.jpg"
import FooterHome from "../components/FooterHome";
import { useNavigate } from "react-router";

const UserDash = () => {
  const navigate = useNavigate()
  
  const products = [
    { img: homeCupcake, title: "Premium Cupcakes", desc: "Miniature works of art in beautiful cups. Attractive packaging, perfectly portioned for sweet cravings and celebrations.", align: "left" },
    { img: homeCake, title: "Signature Cakes", desc: "Handcrafted masterpieces with premium wheat flour, sugar, eggs, and rich butter. Perfect for any celebration.", align: "right" },
    { img: homepudding, title: "Artisan Pudding", desc: "Silky, smooth, luxuriously creamy desserts made from the finest cream and milk. Melts perfectly in your mouth.", align: "left" },
  ];

  return (
    <div className="page-wrapper">
      <HeaderUser />
      <Container style={{ paddingTop: '90px', paddingBottom: '2rem' }}>
        {/* Welcome Banner */}
        <div className="text-center mb-5 pb-3">
          <span className="section-subtitle">Welcome Back!</span>
          <h2 className="section-title">The Cake Shop</h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '500px', margin: '0 auto' }}>Browse our exquisite selection of handcrafted treats</p>
          <div className="section-divider mt-3"></div>
        </div>

        {/* Products */}
        {products.map((product, i) => (
          <div key={i} className="dash-card mb-4">
            <Row className="align-items-center g-4">
              {product.align === 'left' ? (
                <>
                  <Col md={4}>
                    <img src={product.img} alt={product.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                  </Col>
                  <Col md={8}>
                    <h3 style={{ color: 'var(--text-main)' }}>{product.title}</h3>
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>{product.desc}</p>
                    <Button onClick={() => navigate("/userdisplayproduct")} className="btn-premium">Browse & Buy →</Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col md={8}>
                    <h3 style={{ color: 'var(--text-main)' }}>{product.title}</h3>
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>{product.desc}</p>
                    <Button onClick={() => navigate("/userdisplayproduct")} className="btn-premium">Browse & Buy →</Button>
                  </Col>
                  <Col md={4}>
                    <img src={product.img} alt={product.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                  </Col>
                </>
              )}
            </Row>
          </div>
        ))}
      </Container>
      <FooterHome />
    </div>
  );
};

export default UserDash;
