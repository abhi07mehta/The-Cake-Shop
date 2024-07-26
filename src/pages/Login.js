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
                .email("Please enter email")
                .required("Require"),
            password: yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Require")
        })
    }

    useEffect(() => {
        console.log("calling this");
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

    }, [user])


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
        <>
            <Container fluid className="p-0">
                <Row className="g-0 mb-5">
                 <HeaderHome />
                </Row>
                <Row className="g-0 align-items-center">
                <Col className="w-50">
                    <div className="p-3">
                        <h2 className="text-center fs-2  shadow-sm p-2 bg-body rounded"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}
                        >Login</h2>

                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form className="m-2 mt-5" autoComplete="off" onSubmit={formik.handleSubmit}>
                            <Col>
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
                                <div className="m-3">
                                    <Button style={{ background:"#388087",border:"none" }} className=" w-100" type="submit">Login</Button>
                                </div>
                            </Col>
                        </Form>
                        <div className="py-2 w-75 m-auto border border-info mt-4 text-center">Don't have an account yet? <Link style={{textDecoration:"none",color:"#388087"}} to="/signup">Sign up</Link>
                        </div>
                        <div className="py-2 w-75 m-auto border border-info mt-4 text-center">
                        Forgot the password? <Link style={{textDecoration:"none",color:"#388087"}} to="/forgotpassword">Forgot Password</Link>
                        </div>
                    </div>
                </Col>
                <Col style={{ background: `url(${loginBg})`,height: "90vh", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className="w-50">

                </Col>
                </Row>
                <Row>
                    <FooterHome />
                </Row>
            </Container>
        </>
    )
}

export default Login;