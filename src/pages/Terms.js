import React from "react";
import FooterHome from "../components/FooterHome";
import HeaderUser from "../components/HeaderUser";
import { Container } from "react-bootstrap";

const Terms = () => {
    return (
        <div className="page-wrapper">
            <HeaderUser />
            <Container style={{ paddingTop: '100px', paddingBottom: '3rem', maxWidth: '800px' }}>
                <div className="text-center mb-5">
                    <span className="section-subtitle">Legal</span>
                    <h2 className="section-title">Terms & Conditions</h2>
                    <div className="section-divider"></div>
                </div>

                <div className="card-premium p-4 p-md-5" style={{ lineHeight: 1.8 }}>
                    <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                        The following terms and conditions apply to all products purchased from The Cake Shop (TCS). Please read them carefully before placing your order.
                    </p>

                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>1. Return Policy</h4>
                    <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>At TCS stores, the following return policies apply:</p>
                    <ul style={{ color: 'var(--text-light)', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Customers can return products that do not match their order within <strong style={{ color: 'var(--text-main)' }}>2 hours</strong> after delivery.</li>
                        <li style={{ marginBottom: '0.5rem' }}>Cancellations are accepted when the wrong product type is delivered, the cake is damaged during delivery, or the taste does not match the order.</li>
                        <li>Products that have been ordered cannot be canceled after payment is made.</li>
                    </ul>

                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>2. How to Return</h4>
                    <ul style={{ color: 'var(--text-light)', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li>Visit our shop with the purchased product along with your proof of payment.</li>
                    </ul>

                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>3. Refund Policy</h4>
                    <ul style={{ color: 'var(--text-light)', paddingLeft: '1.5rem' }}>
                        <li>Upon successful verification, we will issue a full refund for the returned product.</li>
                    </ul>
                </div>
            </Container>
            <FooterHome />
        </div>
    )
}

export default Terms;