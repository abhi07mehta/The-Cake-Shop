import React, { useState } from "react";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import { useUserAuth } from "../context/UserAuthContext";
import forgotBg from "../assets/forgotBg.jpg"
import FooterHome from "../components/FooterHome";

const ForgotPassword = () => {
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");
  const { forgot_Password } = useUserAuth();
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgot_Password(forgetPasswordEmail);
      setShow(true)
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-wrapper">
      <HeaderHome />
      <Container fluid className="p-0">
        {show ? (
          <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh", paddingTop: "100px" }}>
            <div className="card-premium p-5 text-center" style={{ maxWidth: "500px" }}>
              <div className="mb-4" style={{ color: "var(--primary)" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 className="section-title mb-3">Check Your Email</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>We've sent a password reset link to your email. Check your inbox and follow the instructions.</p>
              <Button onClick={() => { setShow(false); navigate("/") }} className="btn-premium px-5 py-3 mt-3 w-100">Back to Home</Button>
            </div>
          </Container>
        ) : (
          <Row className="g-0" style={{ minHeight: '100vh' }}>
            <Col lg={7} className="d-none d-lg-block position-relative">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${forgotBg})`, backgroundSize: "cover", backgroundPosition: "center", borderBottomRightRadius: "48px" }}>
                <div className="h-100 w-100" style={{ background: "linear-gradient(160deg, rgba(74,63,53,0.85) 0%, rgba(194,147,91,0.3) 100%)", borderBottomRightRadius: "48px" }}></div>
                <div className="position-absolute text-white" style={{ bottom: "12%", left: "8%", maxWidth: "480px" }}>
                  <h2 className="heading-jumbo mb-3" style={{ fontSize: "3rem" }}>Forgot Your<br/>Password? 🔐</h2>
                  <p className="fs-6" style={{ opacity: 0.85, lineHeight: 1.7 }}>No worries! We'll send you instructions to reset it and get you back to ordering delicious cakes.</p>
                </div>
              </div>
            </Col>
            <Col lg={5} className="d-flex justify-content-center align-items-center" style={{ paddingTop: '90px', paddingBottom: '40px' }}>
              <div style={{ width: '100%', maxWidth: '420px', padding: '0 2rem' }}>
                <div className="mb-5">
                  <h2 className="section-title mb-2">Reset Password</h2>
                  <p style={{ color: 'var(--text-light)' }}>Enter the email associated with your account and we'll send reset instructions.</p>
                </div>
                {error && <Alert variant="danger" className="border-0 shadow-sm" style={{borderRadius: 'var(--radius-sm)'}}>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label-premium">Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" className="form-control-premium" onChange={(e) => setForgetPasswordEmail(e.target.value)} />
                  </Form.Group>
                  <Button className="btn-premium w-100 py-3" type="Submit">Send Reset Link</Button>
                </Form>
                <div className="text-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <p style={{ color: "var(--text-light)" }}>Remember your password? <Link to="/login" style={{ textDecoration: "none", color: "var(--primary)", fontWeight: 600 }}>Sign in</Link></p>
                  <p style={{ color: "var(--text-light)" }}>Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "var(--primary)", fontWeight: 600 }}>Sign up</Link></p>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <FooterHome />
    </div>
  )
}

export default ForgotPassword;