import React from "react";
import FooterHome from "../components/FooterHome";
import HeaderUser from "../components/HeaderUser";
import { Row, Container } from "react-bootstrap";

const Terms = () => {
    return (
        <Container fluid className="p-0 overflow-hidden">
            <Row className="g-0 mb-5">
                <HeaderUser />
            </Row>
            <Row className="g-0">
                <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                    style={{
                        backgroundColor: "#C2EDCE",
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"
                    }}>Terms and Conditions</h2>
            </Row>
            <div>the Cake Shop Terms and Conditions
                Return Policy: At TCS stores
                About Return Policy
                Terms and conditions are set out in the returns policy and apply to all products purchased from TCS.
                <ul>
                   <li>Right to cancel</li>
                    <ol>
                        <li> Customers can return products that do not match their order within 2 hours after delivery.</li> 
                        <li> Cancellations are accepted on condition that the wrong type of product is delivered, the cake is destroyed during delivery, the taste does not match the order.</li>
                        <li> Products that have been ordered cannot be canceled after payment is made</li>
                    </ol>

                
                    <li> How to return</li>
                    <ol>
                        <li> Come to the shop with the product you have purchased along with proof of payment and the product you have purchased</li>
                    </ol>
                    

                    
                   <li> Refund </li>
                    <ol>    
                        <li>We will refund the funds you have paid to purchase the product</li>
                    </ol>
                </ul>
            </div>

            <Row className="g-0 mt-5">
                <FooterHome />
            </Row>
        </Container>

    )
}

export default Terms;