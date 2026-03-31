import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import HeaderUser from "../components/HeaderUser";
import FooterHome from "../components/FooterHome";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";

const UserWishlist = () => {
  const { user } = useUserAuth();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      // Get user document to read wishlist array
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const wishlistIds = data.wishlist || [];

        // Fetch each product document
        const products = [];
        for (const productId of wishlistIds) {
          try {
            const productDoc = await getDoc(doc(db, "Products", productId));
            if (productDoc.exists()) {
              products.push({ id: productDoc.id, value: productDoc.data(), available: true });
            } else {
              // Product was deleted by admin — show as unavailable
              products.push({ id: productId, value: { title: "Product Unavailable", price: 0, imgUrl: "", category: "N/A" }, available: false });
            }
          } catch (e) {
            console.log("Error fetching product:", e);
          }
        }
        setWishlistProducts(products);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) fetchWishlist();
  }, [user]);

  const removeFromWishlist = async (productId) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        wishlist: arrayRemove(productId),
      });
      setWishlistProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = (product) => {
    dispatch(
      cartActions.addItemToCart({
        category: product.value.category,
        title: product.value.title,
        price: product.value.price,
        typeOfProduct: product.value.typeOfProduct,
        flavor: product.value.flavor,
        mfgDate: product.value.mfgDate,
        expDate: product.value.expDate,
        description: product.value.description,
        urlId: product.value.urlId,
        id: product.id,
        url: product.value.imgUrl,
        quantity: product.value.quantity,
      })
    );
    alert("Added to Cart!");
  };

  return (
    <div className="page-wrapper">
      <HeaderUser />
      <Container style={{ paddingTop: "90px", paddingBottom: "2rem" }}>
        <div className="text-center mb-5 pb-3">
          <span className="section-subtitle">Saved Items</span>
          <h2 className="section-title">My Wishlist</h2>
          <p style={{ color: "var(--text-light)", maxWidth: "500px", margin: "0 auto" }}>
            Products you've saved for later. Add them to your cart when you're ready!
          </p>
          <div className="section-divider mt-3"></div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "var(--primary)" }} />
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
              <FiHeart style={{ color: "var(--text-muted)" }} />
            </div>
            <h4 style={{ color: "var(--text-main)" }}>Your Wishlist is Empty</h4>
            <p style={{ color: "var(--text-light)" }}>
              Browse products and click the heart icon to save your favorites here.
            </p>
          </div>
        ) : (
          <Row className="g-4">
            {wishlistProducts.map((product) => (
              <Col md={6} lg={4} key={product.id}>
                <div className="card-premium d-flex flex-column" style={{ opacity: product.available ? 1 : 0.5 }}>
                  {product.value.imgUrl ? (
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={product.value.imgUrl}
                        alt={product.value.title}
                        style={{ width: "100%", height: "220px", objectFit: "cover", transition: "transform 0.8s ease" }}
                        className="card-img-top"
                      />
                    </div>
                  ) : (
                    <div style={{
                      height: "220px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--surface-2)",
                      color: "var(--text-muted)",
                      fontSize: "3rem",
                    }}>
                      🎂
                    </div>
                  )}

                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    {!product.available && (
                      <span style={{
                        display: "inline-block",
                        background: "var(--danger)",
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "0.75rem",
                        width: "fit-content",
                      }}>
                        Unavailable
                      </span>
                    )}
                    <h4 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "0.25rem" }}>
                      {product.value.title}
                    </h4>
                    {product.available && (
                      <p style={{ color: "var(--primary)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                        ₹{product.value.price}
                      </p>
                    )}
                    {product.value.flavor && (
                      <p style={{ color: "var(--text-light)", fontSize: "0.85rem", marginBottom: "1rem" }}>
                        {product.value.flavor} • {product.value.category}
                      </p>
                    )}

                    <div className="d-flex gap-2 mt-auto">
                      {product.available && product.value.quantity > 0 && (
                        <Button className="btn-premium flex-grow-1 d-flex align-items-center justify-content-center gap-2" onClick={() => addToCart(product)}>
                          <FiShoppingCart /> Add to Cart
                        </Button>
                      )}
                      <Button
                        className="btn-outline-premium d-flex align-items-center justify-content-center"
                        style={{ color: "var(--danger)", borderColor: "var(--danger)" }}
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </div>
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

export default UserWishlist;
