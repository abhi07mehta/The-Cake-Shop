import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import HeaderAdmin from '../components/HeaderAdmin'
import Footer from "../components/Footer";
import { FiPlusCircle, FiPackage, FiLayers, FiShoppingBag, FiMessageSquare, FiUsers, FiTag } from "react-icons/fi";

const AdminDash = () => {
  const navigate = useNavigate()

  const cards = [
    { icon: <FiPlusCircle />, title: "Add Product", desc: "Add new products with details, images, and pricing for your customers to browse.", path: "/adminaddproduct", color: "#c2935b" },
    { icon: <FiPackage />, title: "Manage Products", desc: "View, edit, or remove existing products. The display mirrors what customers see.", path: "/admindisplayproduct", color: "#e6b981" },
    { icon: <FiLayers />, title: "Custom Orders", desc: "Review and manage incoming custom cake requests from your customers.", path: "/admincustomcakeorder", color: "#ff6b81" },
    { icon: <FiShoppingBag />, title: "Order History", desc: "Track all cake, pudding, and cupcake orders received from customers.", path: "/admindisplayorder", color: "#4caf50" },
    { icon: <FiMessageSquare />, title: "Customer Feedback", desc: "Read and respond to feedback and reviews submitted by your customers.", path: "/adminfeedback", color: "#ff8c42" },
    { icon: <FiUsers />, title: "Customer Details", desc: "View registered customer profiles, contact info, and order history.", path: "/adminuserdetails", color: "#6c63ff" },
    { icon: <FiTag />, title: "Promo Codes", desc: "Create and manage discount codes to boost sales and reward loyal customers.", path: "/adminpromocodes", color: "#9b59b6" },
  ];

  return (
    <div className="page-wrapper">
      <HeaderAdmin />
      <Container style={{ paddingTop: '90px', paddingBottom: '2rem' }}>
        <div className="text-center mb-5 pb-2">
          <span className="section-subtitle">Management</span>
          <h2 className="section-title">Admin Dashboard</h2>
          <div className="section-divider"></div>
        </div>

        <Row className="g-4">
          {cards.map((card, i) => (
            <Col md={6} lg={4} key={i}>
              <div className="dash-card d-flex flex-column">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, fontSize: '1.3rem', flexShrink: 0 }}>
                    {card.icon}
                  </div>
                  <h4 style={{ margin: 0 }}>{card.title}</h4>
                </div>
                <p>{card.desc}</p>
                <Button onClick={() => navigate(card.path)} className="btn-premium mt-auto w-100">
                  Open →
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default AdminDash;
