import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaWhatsapp,FaMailBulk, FaPhoneAlt } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="text-center text-white fixed-bottom" style={{ backgroundImage: "linear-gradient(to bottom, #6fb3b8, #82bec4, #95c9d0, #a7d4dc, #badfe7)" }}>
            <Row className="container g-0 pt-1 mb-1">
            <Col className="text-center fs-6 text-dark p-1 ">
                © 2024s Copyright: TCS Cakes
            </Col>
                <Col>
                <section className="mb-0">
                    <a
                        className="btn btn-link btn-floating btn-sm text-dark mx-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><FaFacebook className="fs-5" /></a>


                    <a
                        className="btn btn-link btn-floating btn-sm text-dark mx-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><FaPhoneAlt className="fs-5"/></a>

                    <a
                        className="btn btn-link btn-floating btn-sm text-dark mx-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><FaWhatsapp className="fs-5" /></a>

                    <a
                        className="btn btn-link btn-floating btn-sm text-dark mx-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><FaInstagram className="fs-5" /></a>
                    <a
                        className="btn btn-link btn-floating btn-sm text-dark mx-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><FaMailBulk className="fs-5"/></a>
                </section>
                </Col>

                
                
            </Row>

            
        </footer>
    )
}

export default Footer;