import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🛒 E-Commerce Store</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
        <Link to="/cart" style={styles.cart}>
          <FaShoppingCart />
          <span style={styles.badge}>{cart.length}</span>
        </Link>

        <Link to="/admin" style={styles.link}>Admin</Link>

        {token && (
          <button onClick={logoutHandler} style={styles.logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#0f172a",
    color: "#fff",
    alignItems: "center"
  },
  logo: { margin: 0 },
  links: { display: "flex", alignItems: "center", gap: "20px" },
  link: { color: "#fff", textDecoration: "none" },
  cart: { color: "#fff", position: "relative", fontSize: "20px" },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    background: "red",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px"
  },
  logout: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Navbar;
