import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup"

const CardPayment = (props) =>{

    const initialValues = {
        name: "",
        cardNumber: "",
        cvv:"",
        validMonth:"",
        validYear:""
    }

    const validSchema = () => {
        return yup.object({
            name: yup.string()
                .required("required"),
            cardNumber: yup.string()
                .required("required"),
            cvv: yup.string()
                .required("required"),
            validMonth: yup.string()
                .required("required"),
            validYear: yup.string()
                .required("required"),
        })
    }

    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: validSchema,

        onSubmit: async (values) => {
            try{
                props.setTypeofPayment("Paid With Card")
                alert("Paid With Card");
            }
            catch(err){
                alert("error", err);
            }
        },
    });

    console.log(props.setTypeofPayment);
    return(
        <>
                    <Form onSubmit={formik.handleSubmit}>
                    <Row className="g-0">
                              <Row>
                              <Form.Group className="">
                              <Form.Label>Full name</Form.Label>
                              <Form.Control
                                               id="name"
                                               name="name"
                                               onBlur={formik.handleBlur}
                                               onChange={formik.handleChange}
                                               value={formik.values.name}
                                               isInvalid={!!formik.touched.name && !!formik.errors.name}
                                            />
                            </Form.Group>
                              </Row>
                              <Row>
                                <Col md={8}>
                                <Form.Group className="">
                              <Form.Label>Card Number</Form.Label>
                              <Form.Control
                                               id="cardNumber"
                                               name="cardNumber"
                                               type="number"
                                               onBlur={formik.handleBlur}
                                               onChange={formik.handleChange}
                                               value={formik.values.cardNumber}
                                               isInvalid={!!formik.touched.cardNumber && !!formik.errors.cardNumber}
                                            />
                            </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group className="">
                              <Form.Label>CVV</Form.Label>
                              <Form.Control
                                                id="cvv"
                                                name="cvv"
                                                type="number"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.cvv}
                                                isInvalid={!!formik.touched.cvv && !!formik.errors.cvv}
                                            />
                            </Form.Group>
                                </Col>
                              </Row>
                              <Row className="my-3">
                                <Col>Valid Till</Col>
                                <Col><Form.Control
                                                id="validMonth"
                                                name="validMonth"
                                                type="number"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.validMonth}
                                                isInvalid={!!formik.touched.validMonth && !!formik.errors.validMonth}
                                            /></Col>
                                <Col>
                                <Form.Control
                                                id="validYear"
                                                name="validYear"
                                                type="number"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.validYear}
                                                isInvalid={!!formik.touched.validYear && !!formik.errors.validYear}
                                            />
                                </Col>
                                
                              </Row>
                              <Row>
                                <Button type="submit">Pay</Button>
                              </Row>
                              <Row>
                                <ul>
                                    <li><h6>
                                    Please write the reference number here or upload payment document in the space provided.
                                </h6></li>
                                </ul>
                              
                                
                                <Form.Group className="">
                              <Form.Label>reference number</Form.Label>
                              <Form.Control
                                                id="ref"
                                                name="ref"
                                                type="text"
                                                onChange={(e)=>{props.setRefrance(e.target.value)}}
                                            />
                            </Form.Group>
                              </Row>
                            </Row>
                    </Form>
                    
        </>
    )
}

export default CardPayment;