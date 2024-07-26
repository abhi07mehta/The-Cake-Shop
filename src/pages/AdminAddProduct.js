import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import HeaderAdmin from "../components/HeaderAdmin";
import {  useFormik } from "formik";
import * as yup from "yup"
// import { useDispatch } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom"


const AdminAddProduct = () => {
    const [productImageId, setProductImageId] = useState();
    const [progress,setProgress] = useState(0);
    const [downloadUrl, setDownloadUrl]= useState();
    // const [imgurl, setImgurl] = useState();
    // const dispatch = useDispatch();
    let navigate = useNavigate();

    const initialValues = {
        category: "",
        title: "",
        price: "",
        typeOfProduct: "",
        flavor: "",
        mfgDate: "",
        expDate: "",
        description: "",
        qnt: "1",
    }

    const validSchema = () => {
        return yup.object({
            category: yup.string()
                .required("Required"),
            description: yup.string()
                .max(800, "Maximum 800 Characters")
                .required("Required"),
            title: yup.string()
                .max(25, "Maximum 15 Characters")
                .required("Required"),
            price: yup.string()
                .required("Required"),
            typeOfProduct: yup.string()
                .required("Required"),
            flavor: yup.string()
                .required("Required"),
            mfgDate: yup.date()
                .required("Required"),
            expDate: yup.date()
                .required("Required"),
            qnt: yup.string()
                .matches(/^[0-9]+$/, "Only Numbers")
                .required("Required")
        })
    }

    const storeImage = (e) =>{

        const file = e.target.files[0]

        uploadFile(file);
        
    }

    const uploadFile = (file)=>{
        if(!file) return;
        let imgId = `${Math.floor(Math.random() * 100000000)}`

        setProductImageId(imgId);

        const storageRef = ref(storage, `/files/${imgId}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(prog);
            },
            (error) => alert(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDownloadUrl(downloadURL);
                 })
            }
          );

       
    }
    


    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: validSchema,

        onSubmit: async (values) => {


            console.log(values);
            try {
                const docRef = await addDoc(collection(db, "Products"), {
                    category: values.category,
                    title: values.title,
                    price: values.price,
                    typeOfProduct: values.typeOfProduct,
                    flavor: values.flavor,
                    mfgDate: values.mfgDate,
                    expDate: values.expDate,
                    description: values.description,
                    urlId : productImageId,
                    imgUrl: downloadUrl,
                    quantity:values.qnt
                } )
                setProgress(0); 
                // console.log("this is signup data", docRef);
            } catch (err) {
                alert("error",err);
            }
            formik.resetForm();
            navigate("/admindisplayproduct")
        },
    });
    return (
        <>
            <Container fluid className="p-0 overflow-hidden">
                <Row className="g-0 mb-5">
                    <HeaderAdmin />
                </Row>
                <Row className="g-0">
                    <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Add Product</h2>
                </Row>

                <Container fluid>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row className="g-0 m-2">
                            <Form.Group>
                                <Form.Select
                                    id="category"
                                    name="category"
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.category}
                                >
                                    <option readOnly >Select Category</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Pudding">Pudding</option>
                                    <option value="CupCakes">CupCakes</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>


                        <Row className="g-0">
                            <Col className="m-2">
                                <Form.Group>
                                    <Form.Control
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Product Name"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        isInvalid={!!formik.touched.title && !!formik.errors.title}

                                    />
                                    {formik.touched.title && formik.errors.title ? <Form.Control.Feedback type="invalid">{formik.errors.title}*</Form.Control.Feedback> : null}
                                </Form.Group>
                            </Col>
                            <Col className="m-2">
                                <Form.Group>
                                    <Form.Control
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Price"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                        isInvalid={!!formik.touched.price && !!formik.errors.price}

                                    />
                                    {formik.touched.price && formik.errors.price ? <Form.Control.Feedback type="invalid">{formik.errors.price}*</Form.Control.Feedback> : null}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className="g-0 m-2">
                            <Form.Group>
                                <Form.Select
                                    id="typeOfProduct"
                                    name="typeOfProduct"
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.typeOfProduct}
                                >
                                    <option readOnly>Product Type</option>
                                    <option value="bestSeller">BestSeller</option>
                                    <option value="Trending">Trending</option>
                                    <option value="Premium">Premium</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="g-0 m-2">
                            <Form.Select
                                id="flavor"
                                name="flavor"
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.flavor}
                            >
                                <option readOnly>Pilih Rasa</option>
                                        <option value="Chocolate Cake">Chocolate Cake</option>
                                        <option value="Red Velvet Cake">Red Velvet Cake</option>
                                        <option value="Vanilla Cake">Vanilla Cake</option>
                                        <option value="Cheesecake">Cheesecake</option>
                                        <option value="Black Forest Cake">Black Forest Cake</option>
                                        <option value="Funfetti cake">Funfetti cake</option>
                                        <option value="Coffee Cake">Coffee Cake</option>
                            </Form.Select>
                        </Row>


                        <Row className="g-0">
                            <Col className="mx-2">
                                <Form.Group>
                                    <Form.Label className="m-1 fw-bold">MFG Date</Form.Label>
                                    <Form.Control
                                        id="mfgDate"
                                        name="mfgDate"
                                        type="date"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.mfgDate}
                                        isInvalid={!!formik.touched.mfgDate && !!formik.errors.mfgDate}

                                    />
                                    {formik.touched.mfgDate && formik.errors.mfgDate ? <Form.Control.Feedback type="invalid">{formik.errors.mfgDate}*</Form.Control.Feedback> : null}
                                </Form.Group>
                            </Col>
                            <Col className="mx-2">
                                <Form.Group>
                                    <Form.Label className="m-1 fw-bold">Exp Date</Form.Label>
                                    <Form.Control
                                        id="expDate"
                                        name="expDate"
                                        type="date"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.expDate}
                                        isInvalid={!!formik.touched.expDate && !!formik.errors.expDate}
                                    />
                                    {formik.touched.expDate && formik.errors.expDate ? <Form.Control.Feedback type="invalid">{formik.errors.expDate}*</Form.Control.Feedback> : null}
                                </Form.Group>
                            </Col>
                            <Col className="mx-2">
                                <Form.Group>
                                    <Form.Label className="m-1 fw-bold">Quantity</Form.Label>
                                    <Form.Control
                                        id="qnt"
                                        name="qnt"
                                        type="number"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.qnt}
                                        isInvalid={!!formik.touched.qnt && !!formik.errors.qnt}
                                    />
                                    {formik.touched.qnt && formik.errors.qnt ? <Form.Control.Feedback type="invalid">{formik.errors.qnt}*</Form.Control.Feedback> : null}
                                </Form.Group>
                            </Col>
                        </Row>




                        <Row className="g-0 m-2">
                            <Form.Group>
                                <Form.Control
                                    id="description"
                                    name="description"
                                    as="textarea"
                                    placeholder="Product Description"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    isInvalid={!!formik.touched.description && !!formik.errors.description}

                                />
                                {formik.touched.description && formik.errors.description ? <Form.Control.Feedback type="invalid">{formik.errors.description}*</Form.Control.Feedback> : null}
                            </Form.Group>
                        </Row>

                        <Row className="g-0 m-2">
                            <Form.Control
                                id="productImage"
                                name="productImage"
                                type="file"
                                placeholder="Image"
                                onChange={(e) => storeImage(e)}
                                required
                            />
                        </Row>
                        <h6>Upload{progress}%</h6>

                        <Row>
                            <Button disabled={progress!==100 && !downloadUrl} style={{ background: "#388087", border: "none" }} className=" w-50 m-auto" type="submit">Add Product</Button>
                        </Row>
                    </Form>
                </Container>
                <Row className="g-0 mt-5">
          <Footer />
        </Row>
            </Container>


            {/*  */}


        </>
    )
}

export default AdminAddProduct;