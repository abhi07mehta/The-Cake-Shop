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
                .oneOf([yup.ref('password'), null], "Incorrect password")
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
                const docRef = await addDoc(collection(db, "users"), {
                    name: values.name,
                    email: values.email,
                    mobile: values.mobile
                });
                // console.log("this is signup data", docRef);
                setShow(true)
            } catch (err) {
                setError(err.message);
            }
        },
    });

    return (
        <>
            <Container fluid className="p-0">
                {show ? (<Alert show={show} style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>
                    <Alert.Heading>You are successfully registered</Alert.Heading>
                    <p>
                    Thank you for choosing The Cake Shop!!
                    </p>
                    <p>Data is automatically saved into our Servers</p>
                    <p>You will be directed automatically to the dashboard</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => { setShow(false); navigate("/userdash") }} variant="outline-success">
                            okay!
                        </Button>
                    </div>
                </Alert>) : (<Suspense fallback="loading">
                    <Row className="g-0 mb-5">
                        <HeaderHome />
                    </Row>
                    <Row className="g-0 align-items-center">
                        <Col style={{ background: `url(${signupBg})`, height: "90vh", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className="w-50">

                        </Col>
                        <Col className="w-50">
                            <div className="p-3 box">
                                <h2 className="text-center fs-2  shadow-sm p-2 bg-body rounded" style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Sign Up</h2>
                                <div>
                                    {error && <Alert variant="danger" >{error}</Alert>}
                                </div>

                                <Form className="m-2" autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <Col>

                                        <Form.Group className="m-3" md="3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Please Enter Name"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                                isInvalid={!!formik.touched.name && !!formik.errors.name}

                                            />
                                            {formik.touched.name && formik.errors.name ? <Form.Control.Feedback type="invalid">{formik.errors.name}*</Form.Control.Feedback> : null}
                                        </Form.Group>

                                        <Form.Group className="m-3" md="3">
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control
                                                id="mobile"
                                                name="mobile"
                                                type="text"
                                                placeholder="Please Enter Mobile Number"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.mobile}
                                                isInvalid={!!formik.touched.mobile && !!formik.errors.mobile}
                                            />
                                            {formik.touched.mobile && formik.errors.mobile ? <Form.Control.Feedback type="invalid">{formik.errors.mobile}*</Form.Control.Feedback> : null}
                                        </Form.Group>

                                        <Form.Group className="m-3" md="3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Please Enter Email"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                isInvalid={!!formik.touched.email && !!formik.errors.email}
                                            />
                                            {formik.touched.email && formik.errors.email ? <Form.Control.Feedback type="invalid">{formik.errors.email}*</Form.Control.Feedback> : null}
                                        </Form.Group>

                                        <Form.Group className="m-3" md="3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Please Enter Password"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                isInvalid={!!formik.touched.password && !!formik.errors.password}
                                            />
                                            {formik.touched.password && formik.errors.password ? <Form.Control.Feedback type="invalid">{formik.errors.password}*</Form.Control.Feedback> : null}
                                        </Form.Group>


                                        <Form.Group className="m-3" md="3">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Re-enter Password"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.confirmPassword}
                                                isInvalid={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                                            />
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}*</Form.Control.Feedback> : null}
                                        </Form.Group>
                                        <div className="m-3">
                                            <Button style={{ background: "#388087", border: "none" }} className=" w-100" type="submit">Sign up</Button>
                                        </div>

                                    </Col>
                                </Form>
                                <div className="py-2 w-75 m-auto border border-info mt-4 text-center">
                                Already have an account? <Link style={{ textDecoration: "none", color: "#388087" }} to="/login">Login</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <FooterHome />
                </Row>
                </Suspense>)}
            </Container>
        </>
    )
}

export default SignUp;