import React from "react";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import qiuLogo from "../assets/QiuLogoSolid2.png"

const HeaderHome = () => {
    return (
        <>
         <Container className="m-0 p-0 fixed-top overflow-hidden" style={{ backgroundImage: "linear-gradient(to bottom, #6fb3b8, #82bec4, #95c9d0, #a7d4dc, #badfe7)" }}>
            <Navbar className="p-0" >
               
                    <Navbar.Brand href="/">
                    <Image style={{width:"140px",height:"55px",}} className=" border-0 mx-5 rounded-pill p-0"  src={qiuLogo} />
                        </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                        <Link style={{textDecoration:"none",color:"white"}} to="/login" >
                            <Button style={{background:"#388087",border:"none"}} className="mx-0 px-2 py-2">
                                Sign In
                            </Button></Link>
                            <Link style={{textDecoration:"none",color:"white"}} to="/signup" >
                            <Button style={{background:"#388087",border:"none"}} className="mx-4 px-2 py-2">
                                Sign Up
                            </Button></Link>
                            {/* <Link to="/signup" className="m-4">SignUp</Link> */}
                        </Navbar.Text>
                    </Navbar.Collapse>
                
            </Navbar>
            </Container>
        </>
    )
}

export default HeaderHome;