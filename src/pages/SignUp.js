import React, { Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import * as yup from "yup"
import { useFormik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import HeaderHome from "../components/HeaderHome";
import signupBg from "../assets/signupBg.jpg"
import FooterHome from "../components/FooterHome";

const SignUp = () => {
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const initialValues = {
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const validSchema = () => {
        return yup.object({
            name: yup.string()
                .max(15, "Maximum 15 Characters")
                .required("Required"),
            mobile: yup.string()
                .matches(/^[0-9]+$/, "Just Numbers")
                .min(10, "Invalid Number")
                .max(13, "Invalid Number")
                .required("Required"),
            email: yup.string()
                .email("Please Enter Email")
                .required("Required"),
            password: yup.string()
                .min(6, "Minimum 6 Characters")
                .required("Required"),
            confirmPassword: yup.string()
                .oneOf([yup.ref('password'), null], "Passwords must match")
                .required("Required"),
        })
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validSchema,
        onSubmit: async (values) => {
            setError("");
            try {
                await signUp(values.email, values.password);
                await addDoc(collection(db, "users"), {
                    name: values.name,
                    email: values.email,
                    mobile: values.mobile
                });
                setShow(true);
            } catch (err) {
                setError(err.message);
            }
        },
    });

    return (
        <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
            <HeaderHome />
            
            <Container fluid className="p-0">
                {show ? (
                    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh", paddingTop: "80px" }}>
                        <div className="card-premium p-5 text-center" style={{ maxWidth: "600px" }}>
                            <div className="mb-4" style={{ color: "var(--primary)" }}>
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h2 className="section-title mb-3">Registration Successful!</h2>
                            <p className="fs-5 text-muted mb-4">
                                Thank you for choosing The Cake Shop! Your account has been created and your preferences are securely stored.
                            </p>
                            <Button onClick={() => { setShow(false); navigate("/userdash") }} className="btn-premium px-5 py-3 w-100">
                                Go to Dashboard
                            </Button>
                        </div>
                    </Container>
                ) : (
                    <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
                        <Row className="g-0 min-vh-100 align-items-stretch">
                            <Col lg={7} className="d-none d-lg-block position-relative">
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${signupBg})`, backgroundSize: "cover", backgroundPosition: "center", borderBottomRightRadius: "40px" }}>
                                    <div className="h-100 w-100" style={{ background: "linear-gradient(135deg, rgba(74, 63, 53, 0.8) 0%, rgba(194, 147, 91, 0.4) 100%)", borderBottomRightRadius: "40px" }}></div>
                                    <div className="position-absolute text-white" style={{ top: "30%", left: "10%", maxWidth: "500px" }}>
                                        <h1 className="heading-jumbo mb-4" style={{ fontSize: "3.5rem" }}>Create Your<br/>Sweet Profile</h1>
                                        <p className="fs-5" style={{ opacity: 0.9 }}>Join our community to order custom cakes, track your history, and get exclusive holiday offers.</p>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col lg={5} className="d-flex justify-content-center align-items-center" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
                                <div style={{ width: '100%', maxWidth: '450px', padding: '0 2rem' }}>
                                    <div className="text-center mb-4">
                                        <h2 className="section-title mb-2">Sign Up</h2>
                                        <p className="text-muted">Fill out the form below to get started</p>
                                    </div>

                                    {error && <Alert variant="danger" className="border-0 shadow-sm rounded-3">{error}</Alert>}

                                    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                                        <Row>
                                            <Col md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label style={{ fontWeight: 500, color: "var(--secondary)", fontSize: "0.9rem" }}>Full Name</Form.Label>
                                                    <Form.Control
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        placeholder="John Doe"
                                                        className="py-2 px-3 shadow-none"
                                                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid #e0d5c1" }}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.name}
                                                        isInvalid={!!formik.touched.name && !!formik.errors.name}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            
                                            <Col md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label style={{ fontWeight: 500, color: "var(--secondary)", fontSize: "0.9rem" }}>Mobile Number</Form.Label>
                                                    <Form.Control
                                                        id="mobile"
                                                        name="mobile"
                                                        type="text"
                                                        placeholder="Enter mobile number"
                                                        className="py-2 px-3 shadow-none"
                                                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid #e0d5c1" }}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.mobile}
                                                        isInvalid={!!formik.touched.mobile && !!formik.errors.mobile}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.mobile}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label style={{ fontWeight: 500, color: "var(--secondary)", fontSize: "0.9rem" }}>Email Address</Form.Label>
                                                    <Form.Control
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter email"
                                                        className="py-2 px-3 shadow-none"
                                                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid #e0d5c1" }}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.email}
                                                        isInvalid={!!formik.touched.email && !!formik.errors.email}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label style={{ fontWeight: 500, color: "var(--secondary)", fontSize: "0.9rem" }}>Password</Form.Label>
                                                    <Form.Control
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        className="py-2 px-3 shadow-none"
                                                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid #e0d5c1" }}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.password}
                                                        isInvalid={!!formik.touched.password && !!formik.errors.password}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label style={{ fontWeight: 500, color: "var(--secondary)", fontSize: "0.9rem" }}>Confirm Password</Form.Label>
                                                    <Form.Control
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type="password"
                                                        placeholder="Re-enter"
                                                        className="py-2 px-3 shadow-none"
                                                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid #e0d5c1" }}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.confirmPassword}
                                                        isInvalid={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Button className="btn-premium w-100 py-3 mb-3" type="submit" onClick={formik.handleSubmit}>
                                            Create Account
                                        </Button>
                                    </Form>

                                    <div className="text-center mt-3 pt-3 border-top" style={{ borderColor: "#e0d5c1 !important" }}>
                                        <p style={{ color: "var(--text-light)" }}>
                                            Already have an account? <Link to="/login" style={{ textDecoration: "none", color: "var(--primary)", fontWeight: 600 }}>Sign In</Link>
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <FooterHome />
                    </Suspense>
                )}
            </Container>
        </div>
    )
}

export default SignUp;