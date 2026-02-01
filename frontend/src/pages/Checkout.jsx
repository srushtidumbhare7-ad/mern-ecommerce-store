import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const token = localStorage.getItem("token");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!address || !city || !country) {
      alert("Please fill shipping details");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cart,
          shippingAddress: { address, city, country },
          totalPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h2>Shipping Details</h2>

        <input
          style={styles.input}
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div style={styles.right}>
        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div key={item._id} style={styles.item}>
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr />

        <h3>Total: ₹{totalPrice}</h3>

        <button
          style={styles.btn}
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    padding: "30px"
  },
  left: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px"
  },
  right: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  btn: {
    marginTop: "15px",
    padding: "12px",
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Checkout;
