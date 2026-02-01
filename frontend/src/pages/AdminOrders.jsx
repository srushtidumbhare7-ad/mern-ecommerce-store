import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Orders</h2>

      {orders.map(o => (
        <div key={o._id}>
          {o.user.email} — ₹{o.totalPrice} — {o.status}
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
