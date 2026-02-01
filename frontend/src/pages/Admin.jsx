import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Fetch all products
  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products"
    );
    setProducts(res.data);
  };

  // 🔹 Add new product
  const addProduct = async () => {
    if (!name || !price || !image) {
      alert("Fill all required fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          name,
          price,
          image,
          category,
          stock
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product added");

      // reset form
      setName("");
      setPrice("");
      setImage("");
      setCategory("");
      setStock("");

      fetchProducts();
    } catch (error) {
      alert("Only admin can add product");
    }
  };

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* ADD PRODUCT FORM */}
      <h2>Add Product</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />

      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <br />

      <button onClick={addProduct} style={{ marginTop: "10px" }}>
        Add Product
      </button>

      <hr />

      {/* PRODUCT LIST */}
      <h2>All Products</h2>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button onClick={() => deleteProduct(product._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
