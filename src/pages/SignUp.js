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

    const initialValues = { name: "", mobile: "", email: "", password: "", confirmPassword: "" }

    const validSchema = () => {
        return yup.object({
            name: yup.string().max(15, "Maximum 15 Characters").required("Required"),
            mobile: yup.string().matches(/^[0-9]+$/, "Numbers only").min(10, "Invalid Number").max(13, "Invalid Number").required("Required"),
            email: yup.string().email("Please enter a valid email").required("Required"),
            password: yup.string().min(6, "Minimum 6 Characters").required("Required"),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Required"),
        })
    }

    const formik = useFormik({
        initialValues,
        validationSchema: validSchema,
        onSubmit: async (values) => {
            setError("");
            try {
                await signUp(values.email, values.password);
                await addDoc(collection(db, "users"), { name: values.name, email: values.email, mobile: values.mobile });
                setShow(true);
            } catch (err) {
                setError(err.message);
            }
        },
    });

    return (
        <div className="page-wrapper">
            <HeaderHome />
            <Container fluid className="p-0">
                {show ? (
                    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh", paddingTop: "100px" }}>
                        <div className="card-premium p-5 text-center" style={{ maxWidth: "500px" }}>
                            <div className="mb-4" style={{ color: "var(--primary)" }}>
                                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <h2 className="section-title mb-3">You're In! 🎉</h2>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>Welcome to The Cake Shop family! Your account is ready and your sweet journey begins now.</p>
                            <Button onClick={() => { setShow(false); navigate("/userdash") }} className="btn-premium px-5 py-3 mt-3 w-100">Go to Dashboard</Button>
                        </div>
                    </Container>
                ) : (
                    <Suspense fallback={<div className="text-center p-5" style={{ color: 'var(--text-light)' }}>Loading...</div>}>
                        <Row className="g-0" style={{ minHeight: '100vh' }}>
                            <Col lg={7} className="d-none d-lg-block position-relative">
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${signupBg})`, backgroundSize: "cover", backgroundPosition: "center", borderBottomRightRadius: "48px" }}>
                                    <div className="h-100 w-100" style={{ background: "linear-gradient(160deg, rgba(74,63,53,0.9) 0%, rgba(194,147,91,0.35) 100%)", borderBottomRightRadius: "48px" }}></div>
                                    <div className="position-absolute text-white" style={{ top: "28%", left: "8%", maxWidth: "480px" }}>
                                        <h2 className="heading-jumbo mb-4" style={{ fontSize: "3rem" }}>Create Your<br/>Sweet Profile 🍰</h2>
                                        <p className="fs-6" style={{ opacity: 0.85, lineHeight: 1.8 }}>Join our community to order custom cakes, track your history, and receive exclusive offers.</p>
                                        <div className="d-flex gap-4 mt-4">
                                            <div><h3 style={{ color: '#e6b981', marginBottom: '0.2rem' }}>15+</h3><small style={{ opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem' }}>Years</small></div>
                                            <div><h3 style={{ color: '#e6b981', marginBottom: '0.2rem' }}>5K+</h3><small style={{ opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem' }}>Happy Customers</small></div>
                                            <div><h3 style={{ color: '#e6b981', marginBottom: '0.2rem' }}>50+</h3><small style={{ opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem' }}>Cake Varieties</small></div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col lg={5} className="d-flex justify-content-center align-items-center" style={{ paddingTop: '90px', paddingBottom: '40px' }}>
                                <div style={{ width: '100%', maxWidth: '420px', padding: '0 2rem' }}>
                                    <div className="mb-4">
                                        <h2 className="section-title mb-2">Create Account</h2>
                                        <p style={{ color: 'var(--text-light)' }}>Fill in your details to get started</p>
                                    </div>

                                    {error && <Alert variant="danger" className="border-0 shadow-sm" style={{borderRadius: 'var(--radius-sm)'}}>{error}</Alert>}

                                    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                                        {[
                                            { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                                            { id: "mobile", label: "Mobile Number", type: "text", placeholder: "+91 ..." },
                                            { id: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
                                        ].map(field => (
                                            <Form.Group className="mb-3" key={field.id}>
                                                <Form.Label className="form-label-premium">{field.label}</Form.Label>
                                                <Form.Control id={field.id} name={field.id} type={field.type} placeholder={field.placeholder}
                                                    className="form-control-premium" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values[field.id]}
                                                    isInvalid={!!formik.touched[field.id] && !!formik.errors[field.id]} />
                                                <Form.Control.Feedback type="invalid">{formik.errors[field.id]}</Form.Control.Feedback>
                                            </Form.Group>
                                        ))}

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="form-label-premium">Password</Form.Label>
                                                    <Form.Control id="password" name="password" type="password" placeholder="••••••"
                                                        className="form-control-premium" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}
                                                        isInvalid={!!formik.touched.password && !!formik.errors.password} />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="form-label-premium">Confirm</Form.Label>
                                                    <Form.Control id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••"
                                                        className="form-control-premium" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword}
                                                        isInvalid={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword} />
                                                    <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Button className="btn-premium w-100 py-3" type="submit">Create Account</Button>
                                    </Form>

                                    <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
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