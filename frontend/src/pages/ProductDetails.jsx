import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Product not found"));
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
    navigate("/cart");
  };

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.name} style={styles.image} />

      <div style={styles.info}>
        <h1>{product.name}</h1>
        <h2>₹{product.price}</h2>
        <p>Category: {product.category}</p>
        <p>Stock: {product.stock}</p>

        <div>
          <label>Quantity: </label>
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {[...Array(product.stock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>

        <button style={styles.btn} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "40px"
  },
  image: {
    width: "350px",
    objectFit: "contain"
  },
  info: {
    maxWidth: "400px"
  },
  btn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default ProductDetails;
