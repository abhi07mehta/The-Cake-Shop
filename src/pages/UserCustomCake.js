import React, { useEffect, useState } from "react";
import { Col, Container, Form,  Row, Spinner, Image } from "react-bootstrap";
import HeaderUser from "../components/HeaderUser";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import "firebase/firestore";
import { collection, getDocs,  query, where} from "firebase/firestore";
import FooterHome from "../components/FooterHome";
import caketype1 from '../assets/satu.png'
import caketype2 from '../assets/dua.png'
import BiarthdayCake from "../components/BirthdayCake";
import RegularCake from "../components/RegularCake";
import { type } from "@testing-library/user-event/dist/type";


const UserCustomCake = () => {
    const { user } = useUserAuth();
    const [userData, setUserData] = useState([])
    const [type1, setType1] = useState("custom");
    // const [typeOfpayment, setTypeofPayment] = useState();
    // const [refrance, setRefrance] = useState('None');
    // let navigate = useNavigate();
    // const [show,setShow] = useState(false);

  

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

    useEffect(() => {
        getUserDetials().then((res) => {
            setUserData(...res.arr);
        })
            .catch((err) => {
                console.log(err);
            });
    }, [user.email])


    
    return (
        <>

            <Container fluid className="p-0 overflow-hidden">
                <Row className="g-0 mb-5">
                    <HeaderUser />
                </Row>
                {userData === undefined || userData.length === 0 ? (<Spinner animation="border" />) : (<>
                    <Container fluid className="p-0 overflow-hidden">
                    <Row className="g-0">
                    <h2 className="text-center fs-4 shadow-lg p-2 mb-3 bg-body rounded mt-4"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Custom Cake</h2>
                </Row>
                        <>
                            <fieldset>
                                <Row className="px-3">
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="disabledTextInput">Name</Form.Label>
                                            <Form.Control
                                                id="name"
                                                name="name"
                                                type="text"
                                                defaultValue={userData.value.name}
                                                readOnly
                                            // value= {userData.value.name} 
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                type="email"
                                                defaultValue={userData.value.email}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="disabledTextInput">Mobile</Form.Label>
                                            <Form.Control
                                                id="mobile"
                                                name="mobile"
                                                type="text"
                                                defaultValue={userData.value.mobile}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </fieldset>
                                <h2 className="text-center">Select Image</h2>
                                <br></br>
                                <Row>
                                    <Col className="text-center">
                                    <Image className={`border border-dark mx-auto w-50 h-55 ${type1 === "Birthday Cake"?"opacity-100":"opacity-25"}`} onClick={()=>setType1("Birthday Cake")}  src={caketype1}/>
                                </Col>
                                <Col className="text-center">
                                <Image className= {`border border-dark mx-auto w-50 h-55 ${type1 === "Regular"?"opacity-100":"opacity-25"}`} onClick={()=>setType1("Regular")}  src={caketype2} />
                                </Col>
                                <Row>
                                {type1 === "Birthday Cake" ? ( <BiarthdayCake user={userData} type1 = {type1}/>
                                ) : (
                                    <RegularCake user={userData} type1 = {type1}/>
                                )}
                                </Row>
                            </Row>
                            
                            
                           
                        </>
                    </Container>
                </>)}
                <Row className="g-0 mt-5">
                    <FooterHome />
                </Row>
            </Container>


        </>
    )
}

export default UserCustomCake;