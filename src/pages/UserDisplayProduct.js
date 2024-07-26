// import { async } from "@firebase/util";
import { collection, getDocs, query,  where } from "firebase/firestore";
// import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import HeaderUser from "../components/HeaderUser";
import { db } from "../firebase";
import { cartActions } from "../store/cart-slice";

const UserDisplayProduct = () => {
    const [posts, setPosts] = useState([]);
    const [imgurl, setImgurl] = useState([]);

    const dispatch = useDispatch();

    // const getUrls = (post) => {
    //     // setImgurl([])
    //     post.map(async (p) =>
    //         await getDownloadURL(ref(storage, `/files/${p.value.urlId}`)).then((igurl) => {
    //             setImgurl(arr => [...arr, igurl])
    //         })
    //     )
    // }




    const postsFirstBatch = async () => {
        setImgurl([])
        try {
            const data = await getDocs(query(collection(db, "Products")));
            // console.log(data);
            let posts = [];
            data.docs.map((doc) => posts.push({ id: doc.id, value: doc.data()}))
            return { posts };
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

    const inStock = async () =>{
        try {

            const q = query(collection(db, "Products"), where("quantity", ">", 0));
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

    useEffect(() => {
        postsFirstBatch()
            .then((res) => {
                setPosts(res.posts);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    // console.log("last key", imgurl)

    const addToCartHandler = (
        category,
        title,
        price,
        typeOfProduct,
        flavor,
        mfgDate,
        expDate,
        description,
        urlId,
        id,
        url,
        quantity
    ) => {
        dispatch(
            cartActions.addItemToCart({
                category,
                title,
                price,
                typeOfProduct,
                flavor,
                mfgDate,
                expDate,
                description,
                urlId,
                id,
                url,
                quantity
            })
        );
    };

    return (
        <>
            <Container fluid className="p-0 overflow-hidden">
                <Row className="g-0 mb-5">
                    <HeaderUser />
                </Row>

                <Row className="g-0">
                    <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{
                            backgroundColor: "#C2EDCE",
                            backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"
                        }}>Product</h2>
                </Row>

                <Row className="g-0">
                    <Col style={{ backgroundImage: "linear-gradient(to bottom, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)" }} md={2}>
                        <Row className="g-0 m-4">
                            <h2>Filters</h2>
                        </Row>
                        <Row className="g-0 mx-3 my-4">
                            <Form.Select
                                id="category"
                                name="category"
                                onChange={(e) => { handlecat(e) }}
                            >
                                <option readOnly defaultValue>Select Product</option>
                                <option value="Cake">Cake</option>
                                <option value="Pudding">Pudding</option>
                                <option value="CupCakes">CupCakes</option>
                            </Form.Select>
                        </Row>
                        <Row className="g-0 mx-3 my-4">
                            <Form.Select
                                id="typeOfProduct"
                                name="typeOfProduct"
                                onChange={(e) => { handleType(e) }}
                            >
                                <option readOnly defaultValue>Product Type</option>
                                <option value="bestSeller">BestSeller</option>
                                <option value="Trending">Trending</option>
                                <option value="Premium">Premium</option>
                            </Form.Select>
                        </Row>
                        <Row className="g-0 mx-3 my-4">
                            <Button onClick={showAll}>All Products</Button>
                        </Row>
                        <Row className="g-0 mx-3 my-4">
                            <Button onClick={inStock}>Products available</Button>
                        </Row>
                        <p className="text-center mx-3" >Note: Orders are sent no later than 1 hour after payment</p>
                    </Col>
                    <Col>

                        <Row className="g-0 mx-4">

                            {posts.map((product, index) => (
                                <Col className=" m-2">
                                    <Card style={{ width: '20rem' }}>
                                        <Card.Img className="w-100" height="220px" variant="top" alt={index} src={product.value.imgUrl} />
                                        <Card.Body style={{ backgroundImage: "linear-gradient(to top, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)" }}>
                                            <Card.Title>{product.value.title}</Card.Title>
                                            <Card.Text style={{ height: "75px" }}>
                                                {product.value.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem>Category: {product.value.category}</ListGroupItem>
                                            <ListGroupItem>Type: {product.value.typeOfProduct}</ListGroupItem>
                                            <ListGroupItem>Flavor: {product.value.flavor}</ListGroupItem>
                                            <ListGroupItem>MFG Date: {product.value.mfgDate}</ListGroupItem>
                                            <ListGroupItem>EXP Date: {product.value.expDate}</ListGroupItem>
                                            <ListGroupItem>Quantity: {product.value.quantity}</ListGroupItem>
                                            <ListGroupItem>Price: {product.value.price}</ListGroupItem>
                                        </ListGroup>
                                        <Card.Body>
                                            {(product.value.quantity>0)?<Button className="w-100" variant="success"

disabled={!(product.value.quantity>0)}
onClick={() => {
    addToCartHandler(
        product.value.category,
        product.value.title,
        product.value.price,
        product.value.typeOfProduct,
        product.value.flavor,
        product.value.mfgDate,
        product.value.expDate,
        product.value.description,
        product.value.urlId,
        product.id,
        product.value.imgUrl,
        product.value.quantity
    ); alert("Moved to Cart");
}}>Add To Cart</Button>:<Button className="w-100" disabled variant="warning">Sold out</Button>}
                                            
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

export default UserDisplayProduct;

