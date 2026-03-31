import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useFormik } from "formik";
import * as yup from "yup"
import { Link } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import HeaderHome from "../components/HeaderHome";
import loginBg from "../assets/loginBg.jpg";
import FooterHome from "../components/FooterHome";

const Login = () => {
    const [error, setError] = useState("");
    const { logIn, user } = useUserAuth();
    let navigate = useNavigate();

    const initialValues = { email: "", password: "" }

    const validSchema = () => {
        return yup.object({
            email: yup.string().email("Please enter a valid email").required("Email is required"),
            password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
        })
    }

    useEffect(() => {
        if (user !== null) {
            if (user.uid === undefined || user.uid === null) {
                alert("Failure in data retrieval")
            }
            if (user.uid === "gSip0fqARiR9u9TM0XT779j4tsi2") {
                navigate("/admindash");
            } else {
                navigate("/userdash");
            }
        }
    }, [user, navigate])

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validSchema,
        onSubmit: async (values) => {
            try {
                await logIn(values.email, values.password)
            } catch (err) {
                setError(err.message);
            }
        },
    });

    return (
        <div className="page-wrapper">
            <HeaderHome />
            <Container fluid className="p-0">
                <Row className="g-0" style={{ minHeight: '100vh' }}>
                    <Col lg={5} className="d-flex justify-content-center align-items-center" style={{ paddingTop: '90px', paddingBottom: '40px' }}>
                        <div style={{ width: '100%', maxWidth: '420px', padding: '0 2rem' }}>
                            <div className="mb-5">
                                <h2 className="section-title mb-2">Welcome Back</h2>
                                <p style={{ color: 'var(--text-light)' }}>Enter your credentials to access your account.</p>
                            </div>

                            {error && <Alert variant="danger" className="border-0 shadow-sm" style={{borderRadius: 'var(--radius-sm)'}}>{error}</Alert>}
                            
                            <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-premium">Email Address</Form.Label>
                                    <Form.Control
                                        id="email" name="email" type="email" placeholder="name@example.com"
                                        className="form-control-premium"
                                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}
                                        isInvalid={!!formik.touched.email && !!formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label-premium">Password</Form.Label>
                                    <Form.Control
                                        id="password" name="password" type="password" placeholder="••••••••"
                                        className="form-control-premium"
                                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}
                                        isInvalid={!!formik.touched.password && !!formik.errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex justify-content-end mb-4">
                                    <Link to="/forgotpassword" style={{ textDecoration: "none", color: "var(--primary)", fontSize: "0.9rem", fontWeight: 500 }}>Forgot Password?</Link>
                                </div>

                                <Button className="btn-premium w-100 py-3" type="submit">Sign In</Button>
                            </Form>

                            <div className="text-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border)'}}>
                                <p style={{ color: "var(--text-light)" }}>
                                    Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "var(--primary)", fontWeight: 600 }}>Create one</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                    
                    <Col lg={7} className="d-none d-lg-block position-relative">
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${loginBg})`, backgroundSize: "cover", backgroundPosition: "center", borderBottomLeftRadius: "48px" }}>
                            <div className="h-100 w-100" style={{ background: "linear-gradient(160deg, rgba(44,36,27,0.85) 0%, rgba(194,147,91,0.4) 100%)", borderBottomLeftRadius: "48px" }}></div>
                            <div className="position-absolute text-white" style={{ bottom: "12%", left: "8%", maxWidth: "500px" }}>
                                <h2 className="heading-jumbo mb-3" style={{ fontSize: "3rem" }}>Taste the<br/>Magic ✨</h2>
                                <p className="fs-6" style={{ opacity: 0.85, lineHeight: 1.7 }}>Sign in to explore our exclusive range of artisan cakes and place your perfect order.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <FooterHome />
        </div>
    )
}

export default Login;