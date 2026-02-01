import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load products"));
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  // 🔍 FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || p.category === category;

    return matchesSearch && matchesCategory;
  });

  // 🏷️ UNIQUE CATEGORIES
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category))
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Products</h2>

      {/* SEARCH + FILTER BAR */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div style={styles.grid}>
        {filteredProducts.map((p) => (
          <div
            key={p._id}
            style={styles.card}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img
              src={p.image}
              alt={p.name}
              style={styles.img}
            />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button
              style={styles.btn}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No products found
        </p>
      )}
    </div>
  );
}

const styles = {
  filterBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px"
  },
  input: {
    padding: "8px",
    width: "250px"
  },
  select: {
    padding: "8px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px"
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
    background: "#fff"
  },
  img: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
    marginBottom: "10px"
  },
  btn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Home;
