import React from "react";
import { Button, Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { FiLogOut } from "react-icons/fi"
import qiuLogo from "../assets/QiuLogoSolid2.png"
import './headerAdmin.css';

const HeaderAdmin = () => {
  // const [active, setActive] = useState(0);

  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      alert("Error",error);
    }
  };
  return (
    <>
      <Container className="m-0 px-2 fixed-top overflow-hidden" style={{ backgroundImage: "linear-gradient(to bottom, #6fb3b8, #82bec4, #95c9d0, #a7d4dc, #badfe7)" }}>
        <Navbar expand={false} className="p-0">

          <Navbar.Toggle className="px-2" style={{ color: "#388087" }} aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
            style={{ width: "300px" }}
          >
            <Offcanvas.Header style={{ background: "#C2EDCE" }} closeButton>
              <Offcanvas.Title className="fs-3 m-2" id={`offcanvasNavbarLabel-expand-${false}`}>
                Admin
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ backgroundImage: "linear-gradient(to right, #6fb3b8, #82bec4, #95c9d0, #a7d4dc, #badfe7)" }}>
              <Nav className="justify-content-end flex-grow-1">
                <NavLink
                  exact
                  className={(navData) => (navData.isActive ? 'navbar__link--active m-2 fs-4 ' : 'navbar__link m-2 fs-4 ')}
                  to="/admindash"
                >Admin Dashboard
                </NavLink>

                <NavLink exact
                  className={(navData) => (navData.isActive ? 'navbar__link--active m-2 fs-4 ' : 'navbar__link m-2 fs-4 ')} 
                  to="/adminaddproduct" 
                  >Add Product</NavLink>

                <NavLink exact
                  className={(navData) => (navData.isActive ? 'navbar__link--active m-2 fs-4 ' : 'navbar__link m-2 fs-4 ')} 
                  to="/admindisplayproduct" 
                  >Display Product</NavLink>

                <NavLink exact
                  className={(navData) => (navData.isActive ? 'navbar__link--active m-2 fs-4 ' : 'navbar__link m-2 fs-4 ')} 
                  to="/admincustomcakeorder" 
                  >Order Custom Cake</NavLink>

                <NavLink exact
                  className={(navData) => (navData.isActive ? 'navbar__link--active m-2 fs-4 ' : 'navbar__link m-2 fs-4 ')} 
                  to="/admindisplayorder" 
                  >display order</NavLink>

                <NavLink exact
                  className={(navData) => (navData.isActive ? 'navbar__link--active m-2 fs-4 ' : 'navbar__link m-2 fs-4 ')} 
                  to="/adminfeedback" 
                  >FeedBack</NavLink>

                <NavLink exact
                  className={(navData) => (navData.isActive ? 'navbar__link--active m-2 fs-4 ' : 'navbar__link m-2 fs-4 ')} 
                  to="/adminuserdetails" 
                  >Customer Detail</NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Brand className=" p-0 m-0" href="#">
            <Image style={{ width: "140px", height: "55px", }} className=" border-0 m-0 rounded-pill p-0" src={qiuLogo} />

          </Navbar.Brand>
          <Button style={{ background: "#388087", border: "none" }} className="mx-2 my-0 px-2 py-1 fw-bold" onClick={handleLogout}><FiLogOut className="fs-4" /></Button>

        </Navbar>
      </Container>
    </>
  )
}

export default HeaderAdmin;