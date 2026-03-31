import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner, Table, Badge } from "react-bootstrap";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FiPlus, FiTrash2, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const AdminPromoCodes = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPromo, setNewPromo] = useState({
    code: "",
    type: "percentage", // 'percentage' or 'fixed'
    value: "",
    active: true,
  });

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "promos"));
      let arr = [];
      snapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setPromos(arr);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleCreatePromo = async () => {
    if (!newPromo.code || !newPromo.value) {
      alert("Please fill in all fields.");
      return;
    }
    // Prevent duplicate codes
    const duplicate = promos.find(
      (p) => p.code.toUpperCase() === newPromo.code.toUpperCase()
    );
    if (duplicate) {
      alert("A promo code with this name already exists.");
      return;
    }

    try {
      await addDoc(collection(db, "promos"), {
        code: newPromo.code.toUpperCase(),
        type: newPromo.type,
        value: parseFloat(newPromo.value),
        active: true,
      });
      setShowModal(false);
      setNewPromo({ code: "", type: "percentage", value: "", active: true });
      fetchPromos();
    } catch (e) {
      console.log(e);
      alert("Error creating promo code.");
    }
  };

  const togglePromo = async (promo) => {
    try {
      await updateDoc(doc(db, "promos", promo.id), {
        active: !promo.active,
      });
      fetchPromos();
    } catch (e) {
      console.log(e);
    }
  };

  const deletePromo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this promo code?")) return;
    try {
      await deleteDoc(doc(db, "promos", id));
      fetchPromos();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="page-wrapper">
      <HeaderAdmin />
      <Container style={{ paddingTop: "90px", paddingBottom: "2rem" }}>
        <div className="text-center mb-5 pb-2">
          <span className="section-subtitle">Sales</span>
          <h2 className="section-title">Promo Codes</h2>
          <div className="section-divider"></div>
        </div>

        <div className="d-flex justify-content-end mb-4">
          <Button className="btn-premium d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
            <FiPlus /> Create Promo Code
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "var(--primary)" }} />
          </div>
        ) : promos.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏷️</div>
            <h4 style={{ color: "var(--text-main)" }}>No Promo Codes Yet</h4>
            <p style={{ color: "var(--text-light)" }}>Create your first discount code to boost sales.</p>
          </div>
        ) : (
          <div className="dash-card" style={{ padding: "0", overflow: "hidden" }}>
            <Table responsive style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th style={{ padding: "1rem 1.5rem" }}>Code</th>
                  <th style={{ padding: "1rem" }}>Type</th>
                  <th style={{ padding: "1rem" }}>Value</th>
                  <th style={{ padding: "1rem" }}>Status</th>
                  <th style={{ padding: "1rem 1.5rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {promos.map((promo) => (
                  <tr key={promo.id}>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: 700, letterSpacing: "1px", fontFamily: "'Outfit', monospace" }}>
                      {promo.code}
                    </td>
                    <td style={{ padding: "1rem", textTransform: "capitalize" }}>{promo.type}</td>
                    <td style={{ padding: "1rem", fontWeight: 600, color: "var(--primary)" }}>
                      {promo.type === "percentage" ? `${promo.value}%` : `₹${promo.value}`}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <Badge
                        pill
                        style={{
                          background: promo.active ? "#d4edda" : "#f8d7da",
                          color: promo.active ? "#155724" : "#721c24",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          padding: "0.35rem 0.85rem",
                        }}
                      >
                        {promo.active ? "Active" : "Disabled"}
                      </Badge>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                      <div className="d-flex gap-2 justify-content-end">
                        <Button
                          size="sm"
                          className="btn-outline-premium d-flex align-items-center gap-1"
                          onClick={() => togglePromo(promo)}
                          style={{ fontSize: "0.85rem" }}
                        >
                          {promo.active ? <FiToggleRight /> : <FiToggleLeft />}
                          {promo.active ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          size="sm"
                          className="btn-outline-premium d-flex align-items-center"
                          style={{ color: "var(--danger)", borderColor: "var(--danger)", fontSize: "0.85rem" }}
                          onClick={() => deletePromo(promo.id)}
                        >
                          <FiTrash2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>

      {/* Create Promo Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName=""
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <Modal.Header
          closeButton
          style={{ background: "var(--surface)", borderColor: "var(--border-light)", borderBottom: "1px solid var(--border)" }}
        >
          <Modal.Title style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-main)" }}>
            Create Promo Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--surface)", padding: "1.5rem" }}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-premium">Code Name</Form.Label>
            <Form.Control
              className="form-control-premium"
              type="text"
              placeholder="e.g. YUMMY20"
              value={newPromo.code}
              onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
              style={{ textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600 }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label-premium">Discount Type</Form.Label>
            <Form.Select
              className="form-control-premium"
              value={newPromo.type}
              onChange={(e) => setNewPromo({ ...newPromo, type: e.target.value })}
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₹)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label-premium">
              Value {newPromo.type === "percentage" ? "(%)" : "(₹)"}
            </Form.Label>
            <Form.Control
              className="form-control-premium"
              type="number"
              min="1"
              placeholder={newPromo.type === "percentage" ? "e.g. 20" : "e.g. 100"}
              value={newPromo.value}
              onChange={(e) => setNewPromo({ ...newPromo, value: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ background: "var(--surface)", borderColor: "var(--border-light)" }}>
          <Button className="btn-outline-premium" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className="btn-premium" onClick={handleCreatePromo}>
            Create Code
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default AdminPromoCodes;
