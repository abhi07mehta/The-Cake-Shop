import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import HeaderUser from "../components/HeaderUser";
import homeCake from "../assets/homeCake.jpg"
import homeCupcake from "../assets/homeCupCake.jpg"
import homepudding from "../assets/homePudding.jpg"
// import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"
import FooterHome from "../components/FooterHome";
import { useNavigate } from "react-router";

const AdminDash = () => {
  const navigate = useNavigate()
  return (
    <>
    <Container fluid className="p-0 overflow-hidden">
    <Row className="g-0 mb-5">
      <HeaderUser />
    </Row>
    <Row className="g-0 pt-4">
        <h2 className="text-center p-3">Welcome to The Cake Shop</h2>
        <p className="text-center p-1">Everyone's Choice</p>
    </Row>
    <Row className="g-0">
    <Row className="g-0">
        <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}
                        >Product Selection</h2>
        </Row>
                    <Row className="g-0">
                      <Row className="g-0">
                      <Col>
                            <Card className="bg-warning border-0">
                                <Card.Img className="rounded-start mx-2" height={"250px"} width={"250px"} variant="top" src={`${homeCupcake}`} />
                                
                            </Card>
                        </Col>
                        <Col md={8}>
                        <Card.Body>
                                    <Card.Title>Cup Cakes</Card.Title>
                                    <Card.Text>
                                    Cupcakes are like miniatures of large cakes that are placed in cups made of colored paper. Cupcakes have attractive appearance because it is packaged in containers small and beautiful.
                                    </Card.Text>
                                    <Button onClick={() =>  navigate("/userdisplayproduct")} style={{ background: "#388087", border: "none" }}>Buy</Button>
                                </Card.Body>
                        </Col>
                      </Row>
                      <hr className="m-4 w-75 mx-auto " />
                        <Row className="g-0">
                          <Col md={8}>
                          <Card.Body>
                                    <Card.Title>Cakes</Card.Title>
                                    <Card.Text>Cake made with baking dough consisting of wheat flour, sugar, eggs, milk, fat, and raising agents with or without addition of other permitted food additives.
                                    </Card.Text>
                                    <Button onClick={() =>  navigate("/userdisplayproduct")} style={{ background: "#388087", border: "none" }}>Buy</Button>
                                </Card.Body>
                          </Col>
                        <Col>
                            <Card className="bg-warning border-0 pe-2">
                                <Card.Img className="rounded-end" height={"250px"} width={"250px"} variant="top" src={`${homeCake}`} />
                            </Card>
                        </Col>
                        </Row>
                        <hr className="m-4 w-75 mx-auto " />
                        <Row className="g-0 mb-3">

                        <Col >
                            <Card className="bg-warning border-0">
                                <Card.Img className="rounded-start mx-2" height={"250px"} width={"250px"} variant="top" src={`${homepudding}`} />
                            </Card>
                        </Col>

                          <Col md={8}>
                          <Card.Body>
                                    <Card.Title>Pudding</Card.Title>
                                    <Card.Text> Pudding is a dessert dish or what is known as dessert,made from cream or milk, cooked with flour that thickens easily, namely tapioca flour or corn flour.
                                    </Card.Text>
                                    <Button onClick={() =>  navigate("/userdisplayproduct")} style={{ background: "#388087", border: "none" }}>Buy</Button>
                                </Card.Body>
                          </Col>

                        </Row>
                        
                    </Row>
                </Row>
                <Row>
                    <FooterHome />
                </Row>
    </Container>
    
    </>
  );
};

export default AdminDash;
