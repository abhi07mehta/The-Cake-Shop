import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import HeaderHome from "../components/HeaderHome";
import bgImage from "../assets/homePageBg.jpg"
import homeCake from "../assets/homeCake.jpg"
import homeCupcake from "../assets/homeCupCake.jpg"
import homepudding from "../assets/homePudding.jpg"
import customer1 from "../assets/homecustomer1.jpg"
import customer2 from "../assets/homecustomer2.jpg"
import aboutus from "../assets/qiu.jpeg"
// import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"
import FooterHome from "../components/FooterHome";

const Home = () => {
    return (
        <>
            <Container fluid className="p-0 overflow-hidden">
                <Row className="g-0 mb-5"
                    // style={{ backgroundImage: "radial-gradient( circle 1136px at 5.2% 14%,  rgba(255,255,255,1) 0%, rgba(234,168,17,1) 100.2% )" }}
                >
                    <HeaderHome ></HeaderHome>
                </Row>

                <Row className="g-0">
                    <Col className="bg-image d-flex flex-column justify-content-center"
                        style={{ backgroundImage: `url(${bgImage})`, height: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat",
                        filter: "brightness(2.3) grayscale(0.2) opacity(1)"
                    }}
                    >
                        <h1 className="mx-5 my-2"
                            style={{ color: "white" }}
                        >
                            The Cake Shop
                        </h1>
                        <p className="w-25 mx-5 my-2"
                            style={{ color: "white" }}
                        >Produced through strict supervision and quality standards. Cooked from a special combination of the best ingredients and technology. The perfect delicious cake, especially for you</p>
                    </Col>
                </Row>
                <Row className="g-0">
                    <Row
                        style={{ backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )" 
                    }}
                        className="py-2 my-2 g-0">
                        <h2 className="text-center">Product</h2>
                    </Row>
                    <Row className="g-0">
                        <Col className="w-25 mx-4 my-3">
                            <Card className="w-100 shadow-lg p-3 mb-5 bg-body rounded" >
                                <Card.Img height={"250px"} width={"250px"} variant="top" src={`${homeCupcake}`} />
                                <Card.Body>
                                    <Card.Title>Cup Cakes</Card.Title>
                                    <Card.Text>
                                    Cupcakes are like miniatures of large cakes that are placed in cups made of various colored paper. Cupcakes have attractive appearance because it is packaged in containers small and beautiful.
                                    </Card.Text>
                                    <Button style={{ background: "#388087", border: "none" }}>Click here</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="w-25 mx-4 my-3">
                            <Card className="w-100 shadow-lg p-3 mb-5 bg-body rounded" >
                                <Card.Img height={"250px"} width={"250px"} variant="top" src={`${homeCake}`} />
                                <Card.Body>
                                    <Card.Title>Cakes</Card.Title>
                                    <Card.Text>Cake made with baking dough consisting of wheat flour, sugar, eggs, milk, fat, and raising agents with or without addition of other permitted food additives.</Card.Text>
                                    <Button style={{ background: "#388087", border: "none" }}>Click here</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="w-25 mx-4 my-3" >
                            <Card className="w-100 shadow-lg p-3 mb-5 bg-body rounded">
                                <Card.Img height={"250px"} width={"250px"} variant="top" src={`${homepudding}`} />
                                <Card.Body>
                                    <Card.Title>Pudding</Card.Title>
                                    <Card.Text> Pudding is a dessert dish or what is known as dessert, made from cream or milk, cooked with flour which thickens easily. Namely tapioca flour or corn flour. </Card.Text>
                                    <Button style={{ background: "#388087", border: "none" }}>Click here</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Row>
                <Row className="g-0" >
                <Row
                        style={{ backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )" 
                    }}
                        className="py-2 my-2 g-0">
                        <h2 className="text-center">Customer Experience</h2>
                    </Row>
                    <Row className="justify-content-md-around g-0">
                        <Col md={3} >
                            <Card className="shadow p-3 mb-5 rounded" style={{ width: "400px", border: "none",background:"#F6F6F2" }}>
                                <Card.Img style={{ borderRadius: "50%", width: "100px", height: "100px", margin: "auto" }} variant="top" src={`${customer1}`} />
                                <Card.Body>
                                    <Card.Title className="text-center">Nita Ambani</Card.Title>
                                    <Card.Text className="text-center">The products offered are highly recommended for large and small events with a very delicious taste.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col  md={3}>
                            <Card className="shadow p-3 mb-5 rounded"  style={{ width: "400px", border: "none",background:"#F6F6F2" }}>
                                <Card.Img style={{ borderRadius: "50%", width: "100px", height: "100px", margin: "auto" }} variant="top" src={`${customer2}`} />
                                <Card.Body>
                                    <Card.Title className="text-center">Rohit Sharma</Card.Title>
                                    <Card.Text className="text-center">The website has an attractive appearance and is easy to understand. The products offered have good taste.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Row>

                <Row className="g-0">
                <Row
                        style={{ backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )" 
                    }}
                        className="py-2 my-2 g-0">
                        <h2 className="text-center">About Us</h2>
                    </Row>
                    <Row className="px-5 justify-content-md-center g-0" >
                        <Col md={3} className="px-5">
                            <img style={{ borderRadius: "50%" }} width={"250px"} height={"250px"} alt="aboutus" src={`${aboutus}`} />
                        </Col>
                        <Col md={6} className="px-5">
                            <p>
                            The Cake Shop was founded in 2009 by Mr. Abhishek Mehta. The Cake Shop is located at Lonavala Hill Area near Pune city. In an area famous for its excellent culinary delights, TCS Cakes are one of the favorites of many people who live in the area and beyond
                            visit the area. TCS Cakes sells several products consisting of cup cakes, pudding and cake.
                            Apart from that, customers can also order products according to their wishes.
                            </p>
                        </Col>
                    </Row>
                </Row>
                <Row className="g-0">
                    {/* <Row 
                style={{backgroundColor: "#FBAB7E",backgroundImage: "linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% )"}}
                className="p-3 my-3">
                    <h2 className="text-center">Contact Us</h2>
                </Row> */}
                    <Row >

                    </Row>
                </Row>
                {/* <Row
                    style={{ backgroundImage: "radial-gradient( circle 1136px at 5.2% 14%,  rgba(255,255,255,1) 0%, rgba(234,168,17,1) 100.2% )" }}
                    className=" px-5 justify-content-md-center g-0">
                    <Col className="p-4">
                        <div className="text-center">
                            <h4>Mobile: 0000000000000</h4>
                            <h4>Email:asddfadfsdf@gmail.com</h4>
                        </div>
                    </Col>
                    <Col className="p-4">
                        <div className="text-center">
                            <h4>Address</h4>
                            <p> Some quick example text to build on the card title and make up the bulk of
                                the card's content.Some quick example text to build on the card title and</p>
                        </div>
                    </Col>
                    <Row className="g-0">
                        <Col md={2}>
                            <p className="m-1 fs-4">&copy;Copyright:2022</p>
                        </Col>
                        <Col md={2}>
                            <div>
                                <FaInstagram className="m-2 fs-4" />
                                <FaFacebook className="m-2 fs-4" />
                                <FaWhatsapp className="m-2 fs-4" />
                            </div>

                        </Col>
                    </Row>

                </Row> */}
                <Row>
                    <FooterHome />
                </Row>

            </Container>
        </>
    )
}

export default Home;