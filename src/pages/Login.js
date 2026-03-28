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

    const initialValues = {
        email: "",
        password: "",
    }

    const validSchema = () => {
        return yup.object({
            email: yup.string()
                .email("Please enter a valid email")
                .required("Email is required"),
            password: yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required")
        })
    }

    useEffect(() => {
        if (user !== null) {
            if (user.uid === undefined || user.uid === null) {
                alert("Failure in data retrieval")
            }
            if (user.uid === "gSip0fqARiR9u9TM0XT779j4tsi2") {
                navigate("/admindash");
            }
            else {
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
        <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
            <HeaderHome />
            
            <Container fluid className="p-0">
                <Row className="g-0 min-vh-100 align-items-center">
                    <Col lg={5} className="d-flex justify-content-center align-items-center" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
                        <div style={{ width: '100%', maxWidth: '450px', padding: '0 2rem' }}>
                            <div className="text-center mb-5">
                                <h2 className="section-title mb-2">Welcome Back</h2>
                                <p className="text-muted">Please enter your details to sign in.</p>
                            </div>

                            {error && <Alert variant="danger" className="border-0 shadow-sm rounded-3">{error}</Alert>}
                            
                            <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label style={{ fontWeight: 500, color: "var(--secondary)" }}>Email Address</Form.Label>
                                    <Form.Control
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="py-2 px-3 shadow-none"
                                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid #e0d5c1" }}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        isInvalid={!!formik.touched.email && !!formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label style={{ fontWeight: 500, color: "var(--secondary)" }}>Password</Form.Label>
                                    <Form.Control
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="py-2 px-3 shadow-none"
                                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid #e0d5c1" }}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        isInvalid={!!formik.touched.password && !!formik.errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex justify-content-end mb-4">
                                    <Link to="/forgotpassword" style={{ textDecoration: "none", color: "var(--text-light)", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color="var(--primary)"} onMouseOut={(e) => e.target.style.color="var(--text-light)"}>Forgot Password?</Link>
                                </div>

                                <Button className="btn-premium w-100 py-3 mb-4" type="submit" onClick={formik.handleSubmit}>
                                    Sign In
                                </Button>
                            </Form>

                            <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: "#e0d5c1 !important" }}>
                                <p style={{ color: "var(--text-light)" }}>
                                    Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "var(--primary)", fontWeight: 600 }}>Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                    
                    <Col lg={7} className="d-none d-lg-block position-relative min-vh-100">
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${loginBg})`, backgroundSize: "cover", backgroundPosition: "center", borderBottomLeftRadius: "40px" }}>
                            <div className="h-100 w-100" style={{ background: "linear-gradient(135deg, rgba(194, 147, 91, 0.4) 0%, rgba(74, 63, 53, 0.8) 100%)", borderBottomLeftRadius: "40px" }}></div>
                            <div className="position-absolute text-white" style={{ bottom: "15%", left: "10%", maxWidth: "500px" }}>
                                <h1 className="heading-jumbo mb-3" style={{ fontSize: "3.5rem" }}>Taste the Magic</h1>
                                <p className="fs-5" style={{ opacity: 0.9 }}>Sign in to continue your journey through sweet, delectable wonders crafted especially for you.</p>
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