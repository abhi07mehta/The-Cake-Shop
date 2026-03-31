import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Badge } from "react-bootstrap";
import HeaderUser from "../components/HeaderUser";
import FooterHome from "../components/FooterHome";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { FiCheckCircle, FiClock, FiTruck, FiPackage, FiXCircle } from "react-icons/fi";

const ORDER_STEPS = [
  { key: "Processing", label: "Order Placed", icon: <FiClock /> },
  { key: "Baking", label: "Baking", icon: <FiPackage /> },
  { key: "Out for Delivery", label: "Out for Delivery", icon: <FiTruck /> },
  { key: "Delivered", label: "Delivered", icon: <FiCheckCircle /> },
];

const getStepIndex = (status) => {
  if (status === "Cancelled") return -1;
  const idx = ORDER_STEPS.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
};

const OrderTimeline = ({ status }) => {
  const currentIndex = getStepIndex(status);
  const isCancelled = status === "Cancelled";

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0, width: "100%", marginTop: "1.5rem" }}>
      {ORDER_STEPS.map((step, i) => {
        const isCompleted = !isCancelled && i <= currentIndex;
        const isActive = !isCancelled && i === currentIndex;

        return (
          <div key={step.key} style={{ flex: 1, textAlign: "center", position: "relative" }}>
            {/* Connector line */}
            {i > 0 && (
              <div style={{
                position: "absolute",
                top: "20px",
                left: "-50%",
                right: "50%",
                height: "3px",
                background: isCompleted
                  ? "linear-gradient(90deg, var(--primary), var(--primary-hover))"
                  : "var(--border)",
                transition: "background 0.5s ease",
                zIndex: 0,
              }} />
            )}

            {/* Step circle */}
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              position: "relative",
              zIndex: 1,
              background: isCompleted
                ? "linear-gradient(135deg, var(--primary), var(--primary-hover))"
                : "var(--surface-2)",
              color: isCompleted ? "#fff" : "var(--text-muted)",
              border: isActive ? "3px solid var(--primary)" : "2px solid var(--border)",
              boxShadow: isActive ? "0 0 0 6px var(--primary-glow)" : "none",
              transition: "all 0.4s ease",
            }}>
              {step.icon}
            </div>

            <p style={{
              marginTop: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: isActive ? 700 : 500,
              color: isCompleted ? "var(--primary)" : "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
              {step.label}
            </p>
          </div>
        );
      })}

      {isCancelled && (
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            background: "var(--danger)",
            color: "#fff",
            border: "3px solid var(--danger)",
            boxShadow: "0 0 0 6px rgba(231, 76, 60, 0.15)",
          }}>
            <FiXCircle />
          </div>
          <p style={{
            marginTop: "0.5rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--danger)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}>
            Cancelled
          </p>
        </div>
      )}
    </div>
  );
};

const UserOrderTracking = () => {
  const { user } = useUserAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orderRv"),
          where("email", "==", user.email)
        );
        const snapshot = await getDocs(q);
        let arr = [];
        snapshot.forEach((doc) => {
          arr.push({ id: doc.id, ...doc.data() });
        });
        setOrders(arr);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchOrders();
  }, [user]);

  const getStatusBadge = (status) => {
    const colors = {
      Processing: { bg: "var(--primary-glow)", color: "var(--primary)" },
      Baking: { bg: "#fff3cd", color: "#856404" },
      "Out for Delivery": { bg: "#cce5ff", color: "#004085" },
      Delivered: { bg: "#d4edda", color: "#155724" },
      Completed: { bg: "#d4edda", color: "#155724" },
      Cancelled: { bg: "#f8d7da", color: "#721c24" },
    };
    const c = colors[status] || colors.Processing;
    return (
      <Badge pill style={{ background: c.bg, color: c.color, fontWeight: 600, fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="page-wrapper">
      <HeaderUser />
      <Container style={{ paddingTop: "90px", paddingBottom: "2rem" }}>
        <div className="text-center mb-5 pb-3">
          <span className="section-subtitle">My Orders</span>
          <h2 className="section-title">Order Tracking</h2>
          <p style={{ color: "var(--text-light)", maxWidth: "500px", margin: "0 auto" }}>
            Track the real-time status of all your orders
          </p>
          <div className="section-divider mt-3"></div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "var(--primary)" }} />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
            <h4 style={{ color: "var(--text-main)" }}>No Orders Yet</h4>
            <p style={{ color: "var(--text-light)" }}>
              You haven't placed any orders. Browse our products and treat yourself!
            </p>
          </div>
        ) : (
          <Row className="g-4">
            {orders.map((order) => (
              <Col xs={12} key={order.id}>
                <div className="dash-card">
                  <Row className="align-items-center mb-3">
                    <Col>
                      <div className="d-flex flex-wrap align-items-center gap-3">
                        <div>
                          <small style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Order ID
                          </small>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem", color: "var(--text-main)", wordBreak: "break-all" }}>
                            {order.id}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs="auto">
                      {getStatusBadge(order.orderStatus)}
                    </Col>
                  </Row>

                  <Row className="g-3">
                    <Col sm={6} md={3}>
                      <small style={{ color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "1px" }}>Product</small>
                      <p style={{ margin: 0, fontWeight: 500, color: "var(--text-main)" }}>{order.title}</p>
                    </Col>
                    <Col sm={6} md={3}>
                      <small style={{ color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "1px" }}>Flavor</small>
                      <p style={{ margin: 0, fontWeight: 500, color: "var(--text-main)" }}>{order.flavor}</p>
                    </Col>
                    <Col sm={6} md={3}>
                      <small style={{ color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "1px" }}>Price</small>
                      <p style={{ margin: 0, fontWeight: 600, color: "var(--primary)" }}>₹{order.price}</p>
                    </Col>
                    <Col sm={6} md={3}>
                      <small style={{ color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "1px" }}>Payment</small>
                      <p style={{ margin: 0, fontWeight: 500, color: "var(--text-main)" }}>{order.typeOfpayment}</p>
                    </Col>
                  </Row>

                  {order.address && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <small style={{ color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "1px" }}>
                        Delivery Address
                      </small>
                      <p style={{ margin: 0, color: "var(--text-light)", fontSize: "0.9rem" }}>{order.address}</p>
                    </div>
                  )}

                  <OrderTimeline status={order.orderStatus} />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <FooterHome />
    </div>
  );
};

export default UserOrderTracking;
