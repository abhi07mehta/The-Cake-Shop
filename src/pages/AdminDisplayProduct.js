import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { ref } from "firebase/storage";
import { db, storage } from "../firebase";
import { Button, Card, Col, Container, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import {  deleteObject } from "firebase/storage";
import Footer from "../components/Footer";


const AdminDisplayProduct = () => {
    const [posts, setPosts] = useState([]);
    // const [imgurl, setImgurl] = useState([]);
    const [updateFlag, setUpdateFlag] = useState();
    const [updateTitle, setUpdateTitle] = useState();
    const [updateDescription, setUpdateDescription] = useState();
    const [updatePrice, setUpdatePrice] = useState();
    const [updateQnt, setUpdateQnt] = useState();
    

    const postsFirstBatch = async () => {
        // setImgurl([])
        try {
            const data = await getDocs(query(collection(db, "Products")));
            // console.log(data);
            let posts = [];
            data.docs.map((doc) => posts.push({ id: doc.id, value: doc.data() }))
           

            return { posts, };
        } catch (e) {
            console.log(e);
        }
    }

    const showAll = async () => {
        try {
            const data = await getDocs(query(collection(db, "Products")));
            // console.log(data);
            let posts = [];
            data.docs.map((doc) => posts.push({ id: doc.id, value: doc.data() }))
            setPosts(posts);
        } catch (e) {
            console.log(e);
        }
    }

    const handleType = async (e) => {
        try {
            let sr = e.target.value;
            // console.log(sr);
            const q = query(collection(db, "Products"), where("typeOfProduct", "==", `${sr}`));
            const querySnapshot = await getDocs(q);
            let arr = [];

            querySnapshot.forEach((doc) => {
                arr.push({ id: doc.id, value: doc.data() })
            });
            setPosts(arr)
        }
        catch (e) {
            console.log(e);
        }
    }

    const handlecat = async (e) => {
        try {
            let sr = e.target.value;
            // console.log(sr);
            const q = query(collection(db, "Products"), where("category", "==", `${sr}`));
            const querySnapshot = await getDocs(q);
            let arr = [];

            querySnapshot.forEach((doc) => {
                arr.push({ id: doc.id, value: doc.data() })
            });
            setPosts(arr)
        }
        catch (e) {
            console.log(e);
        }
    }

    //   console.log(posts);
    useEffect(() => {
        // first 5 posts
        postsFirstBatch()
            .then((res) => {
                setPosts(res.posts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const handleRemove = async (id, urlid) => {
        const desertRef = ref(storage, `files/${urlid}`);

        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

        await deleteDoc(doc(db, "Products", `${id}`));
        showAll()
    }

    const handleUpdate = async (id) =>{
        try{
            const q = doc(db, "Products", `${id}`);
            await updateDoc(q, {
               
                    price: updatePrice,
                    title: updateTitle,
                    description: updateDescription,
                    quantity: updateQnt
                
              })
            
            setUpdateFlag(null)
            showAll()
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <>
            <Container fluid className="p-0 overflow-hidden">
                <Row className="g-0 mb-5">
                    <HeaderAdmin />
                </Row>

                <Row className="g-0">
                    <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Product</h2>
                </Row>

                <Row className="g-0">
                    <Col style={{backgroundImage: "linear-gradient(to bottom, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}} md={2}>
                        <Row className="g-0 m-4">
                            <h2>Filter</h2>
                        </Row>
                   <Row className="g-0 mx-3 my-4">
                   <Form.Select
                                    id="category"
                                    name="category"
                                    onChange={(e)=>  { handlecat(e) }}
                                >
                                    <option readOnly defaultValue >Select Product</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Pudding">Pudding</option>
                                    <option value="CupCakes">CupCakes</option>
                                </Form.Select>
                   </Row>
                   <Row className="g-0 mx-3 my-4">
                   <Form.Select
                                    id="typeOfProduct"
                                    name="typeOfProduct"
                                    onChange={(e)=> { handleType(e) }}
                                >
                                    <option readOnly defaultValue>Product Type</option>
                                    <option value="bestSeller">BestSeller</option>
                                    <option value="Trending">Trending</option>
                                    <option value="Premium">Premium</option>
                                </Form.Select>
                   </Row>
                   <Row className="g-0 mx-3 my-4">
                            <Button onClick={showAll}>Show All</Button>
                        </Row>
                    </Col>
                    <Col>
                    
                    <Row className="g-0 mx-4">

                {posts.map((product, index) => (
                    <Col  className=" m-2">
                    {console.log("this is data",product.value.imgUrl)}
                        <Card style={{ width: '20rem' }}>
                        <Card.Img className="w-100" height="220px" variant="top" alt={index} src={product.value.imgUrl} />
                        <Card.Body style={{backgroundImage: "linear-gradient(to top, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}}>
                            <Card.Title>{(updateFlag === product.id)?<Form.Control defaultValue={product.value.title} onChange={(e)=> setUpdateTitle(e.target.value)} placeholder="Please Update Title" />:`${product.value.title}`}</Card.Title>
                            <Card.Text style={{height:"75px"}}>
                            {(updateFlag === product.id)?<Form.Control defaultValue={product.value.description}  onChange={(e)=> setUpdateDescription(e.target.value)} placeholder="Please Update Description" />:`${product.value.description}`}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><span className="fw-bold">Category:</span>{product.value.category} </ListGroupItem>
                            <ListGroupItem><span className="fw-bold">Type:</span> {product.value.typeOfProduct}</ListGroupItem>
                            <ListGroupItem><span className="fw-bold">Flavor:</span> {product.value.flavor}</ListGroupItem>
                            <ListGroupItem><span className="fw-bold">MFG Date:</span> {product.value.mfgDate}</ListGroupItem>
                            <ListGroupItem><span className="fw-bold">EXP Date:</span> {product.value.expDate}</ListGroupItem>
                            <ListGroupItem><span className="fw-bold">Quantity:</span> {(updateFlag === product.id)?<Form.Control defaultValue={product.value.quantity} onChange={(e)=> setUpdateQnt(e.target.value)} placeholder="Please Update Quantity" />:` ${product.value.quantity}`}</ListGroupItem>
                            <ListGroupItem><span className="fw-bold">Price:</span>{(updateFlag === product.id)?<Form.Control defaultValue = {product.value.price} onChange={(e)=> setUpdatePrice(e.target.value)} placeholder="Please Update Price" />:` ${product.value.price}`}</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Button className="w-100" variant="danger"
                            onClick={async () => {
                                handleRemove(product.id, product.value.urlId)
                            }}>Hapus</Button>
                            {(updateFlag && updateFlag === product.id) ?<Button className="w-100 mt-2" variant="success"
                            onClick={async () => {
                                handleUpdate(product.id)
                            }}>Save</Button>:<Button className="w-100 mt-2" variant="info"
                            onClick={async () => {
                                setUpdateFlag(product.id)
                            }}>Update</Button>}
                        </Card.Body>
                    </Card>
                        
                    </Col>


                ))}

                </Row>
                    </Col>
                </Row>
                <Row className="g-0 mt-5">
          <Footer />
        </Row>
                
                
                

            </Container>
        </>
    )
}

export default AdminDisplayProduct;