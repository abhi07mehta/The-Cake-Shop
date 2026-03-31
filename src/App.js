import React, { lazy, Suspense, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";

// Public pages — loaded eagerly (small, landing pages)
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

// Admin pages — lazy loaded (only downloaded when admin navigates)
const AdminDash = lazy(() => import("./pages/AdminDash"));
const AdminAddProduct = lazy(() => import("./pages/AdminAddProduct"));
const AdminDisplayProduct = lazy(() => import("./pages/AdminDisplayProduct"));
const AdminDisplayOrder = lazy(() => import("./pages/AdminDIsplayOrder"));
const AdminCustomCakeOrder = lazy(() => import("./pages/AdminCustomCakeOrder"));
const AdminFeedback = lazy(() => import("./pages/AdminFeedback"));
const AdminUserDetails = lazy(() => import("./pages/AdminUserDetails"));
const AdminPromoCodes = lazy(() => import("./pages/AdminPromoCodes"));

// User pages — lazy loaded (only downloaded when user navigates)
const UserDash = lazy(() => import("./pages/UserDash"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const UserCart = lazy(() => import("./pages/UserCart"));
const UserCustomCake = lazy(() => import("./pages/UserCustomCake"));
const UserDisplayProduct = lazy(() => import("./pages/UserDisplayProduct"));
const UserFeedback = lazy(() => import("./pages/UserFeedback"));
const UserWishlist = lazy(() => import("./pages/UserWishlist"));
const UserOrderTracking = lazy(() => import("./pages/UserOrderTracking"));
const Terms = lazy(() => import("./pages/Terms"));

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <Container fluid style={{backgroundColor: "var(--background)", minHeight: "100vh"}} className="p-0 overflow-hidden">
      <UserAuthContextProvider>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      {/* Admin Routes */}
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
      <Route path="/adminpromocodes" element={
        <ProtectedRoute>
          <AdminPromoCodes />
        </ProtectedRoute>} />

      {/* User Routes */}
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
      <Route path="/userwishlist" element={
        <ProtectedRoute>
          <UserWishlist />
        </ProtectedRoute>
      } />
      <Route path="/userordertracking" element={
        <ProtectedRoute>
          <UserOrderTracking />
        </ProtectedRoute>
      } />
      <Route path="/terms" element={
        <ProtectedRoute>
          <Terms />
        </ProtectedRoute>
      } />
      </Routes>
      </Suspense>
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
