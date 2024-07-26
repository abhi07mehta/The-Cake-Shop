import React, { useState } from "react";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import { useUserAuth } from "../context/UserAuthContext";
import forgotBg from "../assets/forgotBg.jpg"
import FooterHome from "../components/FooterHome";
const ForgotPassword = () => {

  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");
  const { forgot_Password } = useUserAuth();
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgot_Password(forgetPasswordEmail);
      setShow(true)
      // navigate("/");
    }
    catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Container fluid className="p-0">
      {show ? (<Alert show={show} style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>
                    <Alert.Heading>We will send a password reset link</Alert.Heading>
                    <p>
                    Thank you for choosing The Cake Shop!!!
                    </p>
                    <p>You will be directed to the main page</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => { setShow(false); navigate("/") }} variant="outline-success">
                            okay!
                        </Button>
                    </div>
                </Alert>) :(<><Row className="g-0 mb-5">
          <HeaderHome />
        </Row>
        <Row className="g-0 align-items-center">
          <Col style={{ background: `url(${forgotBg})`, height: "90vh", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className="w-50">

          </Col>
          <Col className="w-50">
            <div className="p-4 box">
              <h2 className="text-center fs-2  shadow-sm p-2 bg-body rounded" style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Forgot Password</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setForgetPasswordEmail(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button style={{ background:"#388087",border:"none" }} className=" w-100" type="Submit">
                    Reset Password
                  </Button>
                </div>
              </Form>
              <div className="py-2 w-75 m-auto border border-info mt-4 text-center">
              Don't have an account yet?<Link style={{textDecoration:"none",color:"#388087"}} to="/signup">Sign up</Link>
              </div>
            </div>
          </Col>
        </Row></>)}
        <Row>
          <FooterHome/>
        </Row>
      </Container>

    </>
  )
}

export default ForgotPassword;