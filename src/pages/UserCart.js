import { addDoc, collection, doc, getDocs, query, where, updateDoc } from "firebase/firestore";
import {  getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Accordion, Alert, Button, CloseButton, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../components/HeaderUser";
import { db, storage } from "../firebase";
import { cartActions } from "../store/cart-slice";
import Footer from "../components/Footer";
import CardPayment from "../components/CardPayment";
import BankPayment from "../components/BankPayment";

const UserCart = () => {
  // const cartProducts = useSelector((state) => state.cart.items);
  // const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  // const finalPrice = useSelector((state) => state.cart.finalPrice);
  const cartProducts = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { user } = useUserAuth();
  const [userData, setUserData] = useState([]);
  const [add, setAdd] = useState('');
  // const [bankAc,setBankAc] = useState(false); 
  const [typeOfpayment, setTypeofPayment] = useState();
  const [show,setShow] = useState(false);
  const [chked, setchked] = useState(false);
  const [refrance, setRefrance] = useState('None');
  let navigate = useNavigate();

  // const [prodQuantity, setProdQuantity] = useState(1);
  // const [pId, setPId] = useState();
  // const [productImageId, setProductImageId] = useState();
  const [progress,setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl]= useState(0);

  const storeImage = (e) =>{

    const file = e.target.files[0]

    uploadFile(file);
    
}

const uploadFile = (file)=>{
    if(!file) return;
    let imgId = `${Math.floor(Math.random() * 100000000)}`

    // setProductImageId(imgId);

    const storageRef = ref(storage, `/Paymentfiles/${imgId}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setDownloadUrl(downloadURL);
             })
        }
      );

   
}

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

  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const changeHandle = (ev, item) => {
    const { value } = ev.target; 
      dispatch(cartActions.setQuantity({ itemId: item.id, quantity: +value }));
  };

  const subfinalPrice = cartProducts.map((item) => item.price * item.quantity);
  const finalPrice = subfinalPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  // const subfinalPrice = cartProducts.map((item) => item.price * item.quantity);
  // const finalPrice = subfinalPrice.reduce(
  //   (previousValue, currentValue) => previousValue + currentValue,
  //   0
  // );

  const handleCheckout = (pd) => {
    // console.log("this is download",downloadUrl);

    if(add && typeOfpayment){
      pd.map(async (p) => {

        try {
          const docRef = await addDoc(collection(db, "orderRv"), {
            name: userData.value.name,
            email: userData.value.email,
            mobile: userData.value.mobile,
            title: p.title,
            price: p.price,
            flavor: p.flavor,
            address:add,
            typeOfpayment:typeOfpayment,
            orderStatus: "Processing",
            refranceNo: refrance,
            imgUrl: downloadUrl,
          });
          // console.log("this is signup data", docRef);
          // console.log("this is maxi", p);
        } catch (err) {
          console.log("error");
        }

        try{
          const q = doc(db, "Products", `${p.id}`);
          await updateDoc(q, {
             
                  quantity: p.maxquantity - p.quantity, 
              
            })
          
      }
      catch(e){
          console.log(e);
      }

        // const desertRef = ref(storage, `files/${p.urlId}`);
  
        // deleteObject(desertRef).then(() => {
        //   // File deleted successfully
        // }).catch((error) => {
        //   // Uh-oh, an error occurred!
        // });
  
        // await deleteDoc(doc(db, "Products", `${p.id}`));
  
        removeItemHandler(p.id)
  
        setShow(true)
  
      })
    }
    else{
      alert("please complete the process properly")
    }
    
  }

  // const quantityHandler = (e, id) => {
  //   setProdQuantity(e.target.value);
  //   setPId(id);
  // };
  // useEffect(() => {
  //   dispatch(
  //     cartActions.totalPriceHandler({ cartQuantity: prodQuantity, id: pId })
  //   );
  // }, [dispatch, pId, prodQuantity]);


  return (
    <>
    
      <Container fluid className="p-0 overflow-hidden">
        <Row className="g-0 mb-5">
          <HeaderUser />
        </Row>
        {show?(<><Alert show={show} style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>
                    <Alert.Heading>Your order has been placed!!</Alert.Heading>
                    <p>
                    Thank you for trusting The Cake Shop!!
                    </p>
                    <p>
                    Don't forget to make payment (for those who haven't paid).
                    </p>
                    <p> Your suggestions and input are very important to us, please provide suggestions and input. We will direct you to the feedback page</p>          <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => { setShow(false); navigate("/userfeedback") }} variant="outline-success">
                            okay!
                        </Button>
                    </div>
                </Alert></>):(<>
          {userData === undefined || userData.length === 0 ? (<Spinner animation="border" />) : (
          <>
            <Row className="">
              <Col md={8}>
                <h3 className="text-center m-4 shadow-sm p-2 bg-body rounded"
                        style={{backgroundColor: "#C2EDCE", 
                        backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}>Cart</h3>
                <Table className="mx-2 border-dark">
                  <thead>
                    <tr>
                      <th>Picture</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Max</th>
                      <th>Price</th>
                      <th>Clear</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((cartProduct) => (
                      <tr>
                        <td><img
                          src={cartProduct.url}
                          alt={cartProduct.id}
                          height="80px"
                          width="90px"
                        /></td>
                        <td> {cartProduct.title}</td>
                        <td>{cartProduct.category}</td>
                        <td><input
                              type="number"
                              min="1"
                              max= {`${cartProduct.maxquantity}`}
                              value={cartProduct.quantity}
                              onChange={(e) => {
                                changeHandle(e, cartProduct);
                              }}/>
                              </td>
                              <td>{`${cartProduct.maxquantity}`}</td>
                        <td>Rs {parseFloat(
                          cartProduct.price * cartProduct.quantity
                        ).toFixed(2)}</td>
                        <td><i
                          role="button"
                          className="bi bi-x"
                          onClick={() => removeItemHandler(cartProduct.id)}
                        ><CloseButton /></i></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col  md={4}>
                <h4
                className="text-center m-4 shadow-sm p-2 bg-body rounded"
                style={{backgroundColor: "#C2EDCE", 
                backgroundImage: "linear-gradient( 174.2deg,  #C2EDCE 7.1%, #BADFE7 67.4% )"}}
                >Order Process</h4>
                {/* <h4 className="m-4">Please fill details to complete the Order</h4> */}
                <div>
                  <div className="text-center fs-5">
                    <span className="mx-2 fw-bold">Total Price: Rs. </span>
                    {parseFloat(finalPrice).toFixed(2)}
                  </div>
                  <Form className="px-2"> 
                  <fieldset className="mx-4">
                                    <Row>
                                        <Form.Group className="mb-3">
                                            {/* <Form.Label htmlFor="disabledTextInput">Name</Form.Label> */}
                                            <Form.Control
                                                id="name"
                                                name="name"
                                                type="text"
                                                defaultValue={userData.value.name}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mb-3">
                                            {/* <Form.Label htmlFor="disabledTextInput">Email</Form.Label> */}
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                type="email"
                                                defaultValue={userData.value.email}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mb-3">
                                            {/* <Form.Label htmlFor="disabledTextInput">Mobile</Form.Label> */}
                                            <Form.Control
                                                id="mobile"
                                                name="mobile"
                                                type="text"
                                                defaultValue={userData.value.mobile}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Row>
                            </fieldset>
                            <Form.Group className="mx-3 mb-3">
                              <Form.Label>Enter Address</Form.Label>
                              <Form.Control
                                                as="textarea"
                                                id="address"
                                                name="address"
                                                type="text"
                                                onChange={(e)=>setAdd(e.target.value)}
                                                required
                                            />
                            </Form.Group>
                            
                  </Form>
                </div>
                <Accordion className="mx-4 mb-2" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
        <Accordion.Header>Cash On Delhivary</Accordion.Header>
        <Accordion.Body>
         <Form.Check onChange={()=>{setTypeofPayment("Cash On Delhivary")}} type="radio" label="Cash On Delhivary"/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Credit/Debit Card</Accordion.Header>
        <Accordion.Body>
                <CardPayment setRefrance={setRefrance} setTypeofPayment={setTypeofPayment}/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Bank Transfer</Accordion.Header>
        <Accordion.Body>
                            <BankPayment setRefrance={setRefrance} finalPrice={finalPrice} setTypeofPayment={setTypeofPayment}/>
                            
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <Row>
    <Row className="g-0 px-4">
      <h6 className="mx-3 w-75">Upload Proof of Payment</h6>
                            <Form.Control
                                id="productImage"
                                name="productImage"
                                type="file"
                                placeholder="Image Upload"
                                onChange={(e) => storeImage(e)}
                                // required
                                className="mx-3 w-75"
                            />
                        </Row>
                        <h6 className="mx-4 p-2">Upload{progress}%</h6>
    </Row>
    <Row className="m-4 w-100 d-inline">
    
      <Form.Check onChangeCapture={()=>{setchked(!chked)}} type="checkbox" className="d-inline" />
       <div className="d-inline" style={{color:"blue",textDecoration:"underline"}} onClick={()=>navigate("/terms")}>Accept the terms & conditions</div>
      
        
    </Row>
    <Row className="mx-4 mt-2">
      {console.log(chked)}
      <Button disabled={!chked} onClick={()=>handleCheckout(cartProducts)} type="submit">Place Order</Button></Row>
              </Col>
            </Row>
          </>
        )}
        </>)}
        
        <Row className="g-0 mt-5">
          <Footer />
        </Row>
      </Container>
    </>
  );
};

export default UserCart;