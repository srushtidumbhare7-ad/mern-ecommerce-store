import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data));
  }, []);

  if (orders.length === 0)
    return <h2 style={{ padding: 30 }}>No orders found</h2>;

  return (
    <div style={{ padding: 30 }}>
      <h2>My Orders</h2>

      {orders.map(o => (
        <div key={o._id} style={styles.card}>
          <p>Status: {o.status}</p>
          <p>Total: ₹{o.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
  }
};

export default MyOrders;
