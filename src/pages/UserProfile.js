import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import HeaderUser from "../components/HeaderUser";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
// import { async } from "@firebase/util";
// import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"
import Footer from "../components/Footer";

const UserProfile = () => {
    const { user } = useUserAuth();
    const [userData, setUserData] = useState([]);
    const [costomCakeData, setCustomCakeData] = useState([]);
    const [orderData, setOrderData] = useState([]);

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

    const getCustomCakeDetails = async() =>{
        try{
            const q = query(collection(db, "customCake"), where("email", "==", `${user.email}`));
            const querySnapshot = await getDocs(q);
            let arr = [];

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                arr.push({ id: doc.id, value: doc.data() })
                // console.log(doc.id, " => ", doc.data());

            });
            return { arr };

            
        }catch (e) {
            console.log(e);
        }
    }

    const getOrderDetails = async() =>{
        try{
            const q = query(collection(db, "orderRv"), where("email", "==", `${user.email}`));
            const querySnapshot = await getDocs(q);
            let arr = [];

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                arr.push({ id: doc.id, value: doc.data() })
                // console.log(doc.id, " => ", doc.data());

            });
            return { arr };

            
        }catch (e) {
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

    useEffect(()=>{
        getCustomCakeDetails().then((res)=>{
            setCustomCakeData([...res.arr]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [user.email])

    useEffect(()=>{
        getOrderDetails().then((res)=>{
            setOrderData([...res.arr]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [user.email])

    console.log("all res",costomCakeData);
    return (
        <>
            <Container fluid className="p-0 overflow-hidden">
                <Row className="g-0 mb-5">
                    <HeaderUser />
                </Row>

                <Row className="g-0 justify-content-center pt-4 m-3">
                    {userData === undefined || userData.length === 0 ? (<Spinner animation="border" />) : (
                    <>
                    <Card className="w-25">
                        <Card.Header style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Profile Details</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><span className="fw-bold">Name : </span> {userData.value.name}</ListGroup.Item>
                            <ListGroup.Item><span className="fw-bold">Email :</span> {userData.value.email}</ListGroup.Item>
                            <ListGroup.Item><span className="fw-bold">Mobile:</span> {userData.value.mobile}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Row className="g-0">
                        {console.log("this is custom cake data",costomCakeData)}
                        
                        <h3 className="m-3 text-center" style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Custom Cake Order Details</h3>{
                            costomCakeData === undefined || costomCakeData.length === 0 ?(<h4 className="text-center text-warning">No Order</h4>):(<>
                            {costomCakeData.map((dt)=> ( <Row className="m-2 p-2 border border-warning">
                                   
                                    <Col>
                                        <Row>
                                        Flavor: {dt.value.flavor}
                                        </Row>
                                        <Row>
                                        Theme: {dt.value.theme}
                                        </Row>
                                        <Row>
                                        Cake Text: {dt.value.cakeText}
                                        </Row>
                                        
                                    </Col>
                                    <Col>
                                        <Row>
                                        Size: {dt.value.size}
                                        </Row>
                                        <Row>
                                        Shape: {dt.value.shape}
                                        </Row>
                                        <Row>
                                        Date:  {dt.value.date}
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            Order ID:{dt.id}
                                        </Row>
                                        <Row>
                                            Type:{dt.value.type}
                                        </Row>
                                        <Row>
                                            Status:{dt.value.orderStatus}
                                        </Row>
                                    </Col>
                                </Row>)
                                )}
                            </> 
                            )
                        }
                        
                        
                        
                        
                        <h3 className="m-3 text-center" style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Normal Order Details</h3>{
                            orderData === undefined || orderData.length === 0 ?(<h4 className="text-center text-warning">No Order</h4>):(<>
                            {orderData.map((dt)=> ( <Row className="m-2 p-2 border border-warning">
                                    
                                    <Col>
                                        <Row>
                                            Flavor: {dt.value.flavor}
                                        </Row>
                                        <Row>
                                        Title: {dt.value.title}
                                        </Row>
                                        
                                    </Col>
                                    <Col>
                                        <Row>
                                            Price: {dt.value.price}
                                        </Row>
                                        <Row>
                                            Order ID:{dt.id}
                                        </Row>
                                        <Row>
                                            Status: {dt.value.orderStatus}
                                        </Row>
                                    </Col>

                                </Row>)
                                )}
                            </> 
                            )
                        }
                        
                    </Row>
                    </>
                    )}
                </Row>
                <Row className="g-0 mt-5">
                    <Footer />
                </Row>
            </Container>
        </>
    )
}

export default UserProfile;