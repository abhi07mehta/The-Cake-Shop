import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup"

const BankPayment = (props) => {
    const initialValues = {
        destinationNumber: "",
    }

    const validSchema = () => {
        return yup.object({
            destinationNumber: yup.string()
                .required("required"),
        })
    }

    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: validSchema,

        onSubmit: async (values) => {
            try{
                props.setTypeofPayment("Paid With Bank")
                alert("Pay with Bank");
            }
            catch(err){
                alert("error", err);
            }
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit}>

            <Form.Group className="">
                <Form.Label>Bank Transfer</Form.Label>
                <Row className="g-0 mx-2 mb-3 ">
                    <Form.Label>Enter your Account Number:</Form.Label>
                    <Form.Control
                        id="destinationNumber"
                        name="destinationNumber"
                        type="number"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.destinationNumber}
                        isInvalid={!!formik.touched.destinationNumber && !!formik.errors.destinationNumber}
                       
                    />
                    <Form.Label>Destination account number:</Form.Label>
                    <Form.Control
                        type="text"
                        value={"xxxxxxxxxxx7/ The Cake Shop (SBI)"}
                        readOnly
                    />
                    {/* <div>Total: {parseFloat(props.finalPrice).toFixed(2)}</div> */}
                </Row>
            </Form.Group>   
            <Row>
                <Button type="submit">Pay</Button>
            </Row>
            <Row className="mx-2">
            <ul>
                                    <li><h6>
                                    Please write the reference number here or upload payment in the space provided.
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
        </Form>

    )
}

export default BankPayment;