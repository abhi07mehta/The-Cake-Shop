import React, { useState } from "react";
import { Accordion, Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import CardPayment from "./CardPayment";
import BankPayment from "./BankPayment";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const RegularCake = (props) => {
    const [typeOfpayment, setTypeofPayment] = useState();
    const [refrance, setRefrance] = useState('None');
    let navigate = useNavigate();
    // const [productImageId, setProductImageId] = useState();
    const [progress,setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl]= useState(0);

  const storeImage = (e) =>{

    const file = e.target.files[0]

    uploadFile(file);
    
}

const uploadFile = (file)=>{
    if(!file) return;
    let imgId = `${Math.floor(Math.random() * 100000000)}`

    // setProductImageId(imgId);

    const storageRef = ref(storage, `/Paymentfiles/${imgId}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setDownloadUrl(downloadURL);
             })
        }
      );

   
}

    const initialValues = {
        shape: "",
        size: "",
        flavor: "",
        cakeText: "",
        address: "",
        topping:"",
        extraToppings:"",
        date: "",
        time:""
    }

    const validSchema = () => {
        return yup.object({
            address: yup.string()
                .max(100, "Please Enter Address"),
            date: yup.date()
                .required("Required"),
            shape: yup.string()
                .required("Required"),
            size: yup.string()
                .required("Required"),
            flavor: yup.string()
                .required("Required"),
            topping: yup.string()
                .required("Required"),
            extraToppings: yup.string()
                .required("Required"),
            time:yup.string()
                .required("Required")
        })
    }
    let sizePrice;
    const getprice = (size) => {
        
        if (size === "Big") {
            sizePrice = 200000;
        }
        else if (size === "Medium") {
            sizePrice = 150000;
        }
        else if (size === "Small") {
            sizePrice = 135000;
        }
        return sizePrice;
    }
     
    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: validSchema,

        onSubmit: async (values) => {

            console.log("coming here");

            let customPrice = getprice(values.size);

            console.log(values);
            try {
                const docRef = await addDoc(collection(db, "customCake"), {
                    type:props.type1,
                    name: props.user.value.name,
                    email: props.user.value.email,
                    mobile: props.user.value.mobile,
                    shape: values.shape,
                    size: values.size,
                    flavor: values.flavor,
                    date: values.date,
                    extraToppings: values.extraToppings,
                    topping:values.topping,
                    price:customPrice,
                    time:values.time,
                    typeOfpayment:typeOfpayment,
                    orderStatus: "Processing",
                    refranceNo: refrance,
                    imgUrl: downloadUrl,
                });
                // console.log("this is signup data", docRef);
                navigate("/userfeedback")
            } catch (err) {
                alert("error",err);
            }
        },
    });
    return (
        <>
        <Form onSubmit={formik.handleSubmit}>
        <h3>Regular Cake</h3>
            <Row className="px-3">
                <Col>
                    <Form.Group className="m-3" md="3">
                        <Form.Label className="fw-bold">Select Shape</Form.Label>
                        <Form.Check
                            id="square"
                            name="shape"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Square"
                            value="Square"
                            isInvalid={!!formik.errors.shape}

                        />

                        <Form.Check
                            id="shape"
                            name="shape"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Rectangle"
                            value="Rectangle"
                            isInvalid={!!formik.errors.shape}

                        />
                        <Form.Check
                            id="Bulat"
                            name="shape"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Round"
                            value="Round"
                            isInvalid={!!formik.errors.shape}

                        />
                        {formik.errors.shape ? <Form.Control.Feedback type="invalid">{formik.errors.shape}*</Form.Control.Feedback> : null}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="m-3" md="3">
                        <Form.Label className="fw-bold">Pilih Ukuran</Form.Label>
                        <Form.Check
                            id="size"
                            name="size"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Small (250 gr)"
                            value="Small"
                            isInvalid={!!formik.errors.size}

                        />

                        <Form.Check
                            id="size"
                            name="size"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Medium (500 gr)"
                            value="Medium"
                            isInvalid={!!formik.errors.size}

                        />
                        <Form.Check
                            id="size"
                            name="size"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Large (1 kg)"
                            value="Large"
                            isInvalid={!!formik.errors.size}

                        />
                        {formik.errors.size ? <Form.Control.Feedback type="invalid">{formik.errors.size}*</Form.Control.Feedback> : null}
                    </Form.Group>
                </Col>
                <Col>
                    {/* <Form.Select
                        id="flavor"
                        name="flavor"
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.topping}
                    >
                        <option readOnly >Pilih Rasa</option>
                        <option value="Pisang">Pisang</option>
                        <option value="Keju">Keju</option>
                        <option value="Cokelat">Cokelat</option>
                        <option value="Kopi">Kopi</option>
                        <option value="Pandan">Pandan</option>
                    </Form.Select> */}
                    <Form.Group>
                    <Form.Label className="fw-bold">Select Flavor</Form.Label>
                    <Form.Check
                            id="flavor"
                            name="flavor"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Fruit"
                            value="Fruit"
                            isInvalid={!!formik.errors.flavor}

                        />
                        <Form.Check
                            id="flavor"
                            name="flavor"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Cheese"
                            value="Cheese"
                            isInvalid={!!formik.errors.flavor}

                        />
                        <Form.Check
                            id="flavor"
                            name="flavor"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Chocolate"
                            value="Chocolate"
                            isInvalid={!!formik.errors.flavor}

                        />
                        <Form.Check
                            id="flavor"
                            name="flavor"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Coffee"
                            value="Coffee"
                            isInvalid={!!formik.errors.flavor}

                        />
                        {/* <Form.Check
                            id="flavor"
                            name="flavor"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Pandan"
                            value="Pandan"
                            isInvalid={!!formik.errors.flavor}

                        /> */}
                        
                    </Form.Group>
                </Col>
                <Col>
                    {/* <Form.Select
                        id="topping"
                        name="topping"
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.topping}
                    >
                        <option readOnly >Pilih Topping Favorite</option>
                        <option value="Pisang">Pisang</option>
                        <option value="Keju">Keju</option>
                        <option value="Cokelat">Cokelat</option>
                    </Form.Select> */}
                    <Form.Group>
                    <Form.Label className="fw-bold">Select Favorite Toppings</Form.Label>
                    <Form.Check
                            id="topping"
                            name="topping"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Fruit"
                            value="Fruit"
                            isInvalid={!!formik.errors.topping}

                        />
                        <Form.Check
                            id="topping"
                            name="topping"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Cheese"
                            value="Cheese"
                            isInvalid={!!formik.errors.topping}

                        />
                        <Form.Check
                            id="topping"
                            name="topping"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Chocolate"
                            value="Chocolate"
                            isInvalid={!!formik.errors.topping}

                        />
                    </Form.Group>
                </Col>
                <Col>
                    {/* <Form.Select
                        id="extraToppings"
                        name="extraToppings"
                        onChange={formik.handleChange}
                    >
                        <option readOnly >Extra Topping</option>
                        <option value="Cokelat">Extra Cokelat</option>
                        <option value="Buah">Extra Buah</option>
                        <option value="Keju">Extra Keju</option>
                        <option value="Tiramisu">Extra Tiramisu</option>
                    </Form.Select> */}
                    <Form.Label className="fw-bold">Extra Topping</Form.Label>
                    <Form.Check
                            id="extraToppings"
                            name="extraToppings"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Extra Chocolate"
                            value="Extra Chocolate"
                            isInvalid={!!formik.errors.extraToppings}

                        />
                        <Form.Check
                            id="extraToppings"
                            name="extraToppings"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Extra Fruit"
                            value="Extra Fruit"
                            isInvalid={!!formik.errors.extraToppings}

                        />
                        <Form.Check
                            id="extraToppings"
                            name="extraToppings"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Extra Cheese"
                            value="Extra Cheese"
                            isInvalid={!!formik.errors.extraToppings}

                        />
                        <Form.Check
                            id="extraToppings"
                            name="extraToppings"
                            type="radio"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Extra Tiramisu"
                            value="Extra Tiramisu"
                            isInvalid={!!formik.errors.extraToppings}

                        />
                </Col>
            </Row>

            {/* <Row className="px-3 mt-2">
                
            </Row>

            <Row className="px-3 mt-2">
                
            </Row>

            <Row className="g-0 m-3">
                
            </Row> */}

            <Row className="g-0 m-3">
                <Form.Group>
                    <Form.Label className="fw-bold">Enter Address</Form.Label>
                    <Form.Control
                        id="address"
                        name="address"
                        as="textarea"
                        placeholder="Please type Here"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        isInvalid={!!formik.touched.address && !!formik.errors.address}
                    />
                    {formik.touched.address && formik.errors.address ? <Form.Control.Feedback type="invalid">{formik.errors.address}*</Form.Control.Feedback> : null}
                </Form.Group>
            </Row>

            <Row className="g-0 m-3">
                <Col>
                <Form.Group>
                    <Form.Label className="fw-bold">Delivery Date</Form.Label>
                    <Form.Control
                        id="date"
                        name="date"
                        type="date"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.date}
                        isInvalid={!!formik.errors.date}
                    />
                    {formik.touched.date && formik.errors.date ? <Form.Control.Feedback type="invalid">{formik.errors.date}*</Form.Control.Feedback> : null}
                </Form.Group>
                </Col>
                
                <Col className="mx-2">
                <Form.Label className="fw-bold">Delivery Hours</Form.Label>
                <Form.Select
                        id="time"
                        name="time"
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.time}
                    >
                        <option readOnly >Delivery Hours</option>
                        <option value="9 AM to 12 PM">9 AM to 12 PM</option>
                        <option value="12 PM to 3 PM">12 PM to 3 PM</option>
                        <option value="3 PM to 6 PM">3 PM to 6 PM</option>
                        <option value="6 PM to 9 PM">6 PM to 9 PM</option>
                    </Form.Select>
                    {formik.touched.time && formik.errors.time ? <Form.Control.Feedback type="invalid">{formik.errors.time}*</Form.Control.Feedback> : null}
                </Col>
            </Row>
            <Row style={{ backgroundImage: "linear-gradient(to top, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)" }} className="g-0 py-3 justify-content-center">
                <Card style={{ backgroundColor: "#FBAB7E", backgroundImage: "linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% )" }} className="w-50 p-2">
                    <h5 className="text-center">Create Order Details</h5>
                    <Card.Body>
                        <Card.Title>Cake Flavor:{formik.values.flavor}</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted"> {formik.values.theme}</Card.Subtitle> */}
                        <ListGroup variant="flush">
                            <ListGroup.Item>Size: {formik.values.size}</ListGroup.Item>
                            <ListGroup.Item>Shape: {formik.values.shape}</ListGroup.Item>
                            <ListGroup.Item>Topping: {formik.values.topping}</ListGroup.Item>
                            <ListGroup.Item>Extra Topping: {formik.values.extraToppings}</ListGroup.Item>
                            <ListGroup.Item>Delivery time: {formik.values.time}</ListGroup.Item>
                            <ListGroup.Item>Delivery Date: {formik.values.date}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    <h5>Total: {getprice(formik.values.size)}</h5>
                </Card>
            </Row>
            
            <Button disabled={!typeOfpayment} style={{ background: "#388087", border: "none" }} className=" w-100 mb-5" type="submit" >Order Confirm</Button>
            
        </Form>
        <Accordion className="" defaultActiveKey="0">
        <Accordion.Item eventKey="0">
        <Accordion.Header>Cash On Delhivary</Accordion.Header>
        <Accordion.Body>
         <Form.Check onChange={()=>{setTypeofPayment("Cash On Delhivary")}} type="radio" label="Cash On Delhivary"/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Credit/Debit Card</Accordion.Header>
        <Accordion.Body>
                <CardPayment setRefrance={setRefrance} setTypeofPayment={setTypeofPayment}/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Bank Transfer</Accordion.Header>
        <Accordion.Body>
                            <BankPayment setRefrance={setRefrance} setTypeofPayment={setTypeofPayment}/>
                            
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
    <Row>
    <Row className="g-0 px-2">
      <h6 className="mx-1 w-75">Upload Payment</h6>
                            <Form.Control
                                id="productImage"
                                name="productImage"
                                type="file"
                                placeholder="Please give description"
                                onChange={(e) => storeImage(e)}
                                // required
                                className="mx-1 w-75"
                            />
                        </Row>
                        <h6 className="mx-2 p-2">Upload{progress}%</h6>
    </Row>
        </>
    )
}

export default RegularCake;