import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminCustomCakeOrder from "./pages/AdminCustomCakeOrder";
import AdminDash from "./pages/AdminDash";
import AdminDisplayOrder from "./pages/AdminDIsplayOrder";
import AdminDisplayProduct from "./pages/AdminDisplayProduct";
import AdminFeedback from "./pages/AdminFeedback";
import AdminUserDetails from "./pages/AdminUserDetails";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDash from "./pages/UserDash";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import UserCart from "./pages/UserCart";
import UserCustomCake from "./pages/UserCustomCake";
import UserDisplayProduct from "./pages/UserDisplayProduct"
import UserFeedback from "./pages/UserFeedback";
import Terms from "./pages/Terms";


function App() {
  return (
    <Container fluid style={{background:"#F6F6F2"}} className="p-0 overflow-hidden">
      <UserAuthContextProvider>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/admindash" element={
        <ProtectedRoute>
          <AdminDash />
        </ProtectedRoute>
      } />
      <Route path="/admincustomcakeorder" element={
        <ProtectedRoute>
          <AdminCustomCakeOrder />
        </ProtectedRoute>} />
      <Route path="/admindisplayproduct" element={
        <ProtectedRoute>
          <AdminDisplayProduct />
        </ProtectedRoute>} />
      <Route path="/admindisplayorder" element={
        <ProtectedRoute>
          <AdminDisplayOrder />
        </ProtectedRoute>} />
      <Route path="/adminaddproduct" element={
        <ProtectedRoute>
          <AdminAddProduct />
        </ProtectedRoute>} />
      <Route path="/adminfeedback" element={
        <ProtectedRoute>
          <AdminFeedback />
        </ProtectedRoute>} />
      <Route path="/adminuserdetails" element={
        <ProtectedRoute>
          <AdminUserDetails />
        </ProtectedRoute>} />
      <Route path="/userdash" element={
        <ProtectedRoute>
          <UserDash />
        </ProtectedRoute>
        } />
      <Route path="/userprofile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="/userfeedback" element={
        <ProtectedRoute>
          <UserFeedback />
        </ProtectedRoute>
      } />
      <Route path="/userdisplayproduct" element={
        <ProtectedRoute>
          <UserDisplayProduct />
        </ProtectedRoute>
      } />
      <Route path="/usercart" element={
        <ProtectedRoute>
          <UserCart />
        </ProtectedRoute>
      } />
      <Route path="/usercustomcake" element={
        <ProtectedRoute>
          <UserCustomCake />
        </ProtectedRoute>
      } />
      <Route path="/terms" element={
        <ProtectedRoute>
          <Terms />
        </ProtectedRoute>
      } />
      </Routes>
      
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
