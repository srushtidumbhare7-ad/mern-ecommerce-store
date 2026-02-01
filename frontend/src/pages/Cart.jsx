import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div key={item._id} style={styles.item}>
          <img
            src={item.image}
            alt={item.name}
            style={styles.img}
          />

          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>

          <div style={styles.qty}>
            <button onClick={() => decreaseQty(item._id)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => increaseQty(item._id)}>+</button>
          </div>

          <button
            style={styles.remove}
            onClick={() => removeItem(item._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h3 style={{ marginTop: "20px" }}>
        Total: ₹{totalPrice}
      </h3>

      <button
        style={styles.checkout}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    gap: "10px"
  },
  img: {
    width: "80px",
    height: "80px",
    objectFit: "contain"
  },
  qty: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  remove: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  checkout: {
    marginTop: "20px",
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Cart;
