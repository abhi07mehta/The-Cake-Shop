import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import HeaderUser from "../components/HeaderUser";
import {  useNavigate } from "react-router-dom";
import {  useFormik } from "formik";
import * as yup from "yup"
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import "firebase/firestore";
import { collection, getDocs,  query,  where, addDoc } from "firebase/firestore";
import Footer from "../components/Footer";


const UserFeedback = () => {
    const { user } = useUserAuth();
    const [userData, setUserData] = useState([])
    let navigate = useNavigate();
    // const [show,setShow] = useState(false);

    const getUserDetials = async () => {
        try {
            // console.log("here");
            const q = query(collection(db, "users"), where("email", "==", `${user.email}`));
            const querySnapshot = await getDocs(q);
            let arr = [];

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                arr.push({ id: doc.id, value: doc.data() })
                // console.log(doc.id, " => ", doc.data());

            });
            return { arr };
        }
        catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getUserDetials().then((res) => {
            setUserData(...res.arr);
        })
            .catch((err) => {
                console.log(err);
            });
    }, [user.email])
    

    const initialValues = {
        exp: "yes",
        feedback: "",
    }

    const validSchema = () => {
        return yup.object({
            feedback: yup.string()
                .max(100, "Max Length 100 Char")
                .required("required"),
        })
    }

    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: validSchema,

        onSubmit: async (values) => {

            console.log(values);
            // setError("");
            try {
                const docRef = await addDoc(collection(db, "feedback"), {
                    name: userData.value.name,
                    email: userData.value.email,
                    mobile: userData.value.mobile,
                    exp:values.exp,
                    feedback:values.feedback
                });
                // console.log("this is signup data", docRef);
                navigate("/userprofile")
            } catch (err) {
                console.log("error");
            }
        },
    });
    return (
        <>
            <Container fluid>
            <Row className="g-0 mb-5">
                <HeaderUser />
            </Row>
            
            {userData === undefined || userData.length === 0 ? (<Spinner animation="border" />) : (<>
                
                <Container className="">
                <Row className="g-0">
                    <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{
                            backgroundColor: "#C2EDCE",
                            backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"
                        }}>Feedback</h2>
                </Row>
                    
                    <Form onSubmit={formik.handleSubmit}>
                    <fieldset>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="disabledTextInput">Name</Form.Label>
                                            <Form.Control
                                                id="name"
                                                name="name"
                                                type="text"
                                                defaultValue={userData.value.name}
                                                readOnly

                                                onChange={formik.handleChange}
                                            // value= {userData.value.name} 
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                type="email"
                                                onChange={formik.handleChange}
                                                defaultValue={userData.value.email}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="disabledTextInput">Mobile</Form.Label>
                                            <Form.Control
                                                id="mobile"
                                                name="mobile"
                                                type="text"
                                                onChange={formik.handleChange}
                                                defaultValue={userData.value.mobile}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </fieldset>
                        <Form.Group className="m-3" md="3">
                            <Form.Label className="fw-bold">Would you recommend this cake shop to your connections?</Form.Label>
                            <Form.Check
                                id="exp"
                                name="exp"
                                type="radio"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label="Ya"
                                value="yes"

                            />
                        
                            <Form.Check
                                id="exp"
                                name="exp"
                                type="radio"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label="Tidak"
                                value="no"

                            />
                            </Form.Group>

                        <Form.Group className="m-3" md="3">
                            <Form.Label className="fw-bold">Please give feedback regarding our products</Form.Label>
                            <Form.Control
                                id="feedback"
                                name="feedback"
                                as="textarea"
                                placeholder="Please type Here"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.feedback}
                                isInvalid={!!formik.touched.feedback && !!formik.errors.feedback}

                            />
                            {formik.touched.feedback && formik.errors.feedback ? <Form.Control.Feedback type="invalid">{formik.errors.feedback}*</Form.Control.Feedback> : null}
                        </Form.Group>
                        <Row>
                        <Button style={{ background: "#388087", border: "none" }} className=" w-50 m-auto" type="submit" >Send Feedback</Button>
                        </Row>
                         </Form>

                    {/* <div>Picked: {formik.vlaues.pick}</div> */}
                </Container>
            </>)}
            <Row className="g-0 mt-5">
                    <Footer />
                </Row>
            </Container>
            

        </>
    )
}

export default UserFeedback;