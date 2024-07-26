import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import HeaderAdmin from '../components/HeaderAdmin'
import Footer from "../components/Footer";
const AdminDash = () => {

  const navigate = useNavigate()
  return (
    <>
      <Container fluid className="p-0 overflow-hidden">
        <Row className="g-0 mb-5">
          <HeaderAdmin />
        </Row>
        <Row>
        <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}
                        >Admin Dashboard</h2>
        </Row>
        <Row className="g-0">
          <Col style={{backgroundImage: "linear-gradient(to right, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}} className="p-3 m-2 rounded-start">
            <h4 className="text-center">Add Product</h4>
            <p>Add several products here in detail, so customers can see the products offered.</p>
            <Button onClick={() =>  navigate("/adminaddproduct")} style={{ background: "#388087", border: "none" }}>Click here</Button>
          </Col>
          <Col style={{backgroundImage: "linear-gradient(to left, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}} className="p-3 m-2 rounded-end"><h4 className="text-center">Change Product</h4>
            <p>The entire product display can be seen in this section. The display seen by the admin will be the same as the display seen by the customer</p>
            <Button onClick={() =>  navigate("/admindisplayproduct")} style={{ background: "#388087", border: "none" }}>Click here</Button></Col>
        </Row>
        <Row className="g-0">
          <Col style={{backgroundImage: "linear-gradient(to right, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}} className="p-3 m-2 rounded-start">
          <h4 className="text-center">Custom Cake Orders</h4>
            <p>Incoming order data from customers regarding custom cake orders can be checked in this section.</p>
            <Button onClick={() =>  navigate("/admincustomcakeorder")} style={{ background: "#388087", border: "none" }}>Click here</Button>
          </Col>
          <Col style={{backgroundImage: "linear-gradient(to left, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}} className="p-3 m-2 rounded-end"><h4 className="text-center">Normal Order</h4>
            <p>All details of cake, pudding and cupcake orders received from customers can be checked in this section.</p>
            <Button onClick={() =>  navigate("/admindisplayorder")} style={{ background: "#388087", border: "none" }}>Click here</Button></Col>
        </Row>
        <Row className="g-0">
          <Col style={{backgroundImage: "linear-gradient(to right, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}} className="p-3 m-2 rounded-start">
          <h4 className="text-center">Customer Feedback</h4>
            <p>Feedback given by customers can be checked in this section.</p>
            <Button onClick={() =>  navigate("/adminfeedback")} style={{ background: "#388087", border: "none" }}>Click here</Button>
          </Col>
          <Col style={{backgroundImage: "linear-gradient(to left, #badfe7, #c8e6e3, #daebe3, #eaf0e8, #f6f6f2)"}} className="p-3 m-2 rounded-end">
          <h4 className="text-center">Customer Details</h4>
            <p>Details of each customer can be checked in this section.</p>
            <Button onClick={() =>  navigate("/adminuserdetails")} style={{ background: "#388087", border: "none" }}>Click here</Button>
          </Col>
        </Row>
        <Row className="g-0 mt-5">
          <Footer />
        </Row>
      </Container>


    </>
  );
};

export default AdminDash;
