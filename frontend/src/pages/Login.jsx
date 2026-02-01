import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim(),
          password
        }
      );

      console.log("Login response:", res.data);

      if (!res.data.token) {
        throw new Error("Token not received");
      }

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Login failed. Check email/password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "350px", margin: "120px auto" }}>
      <h2 style={{ marginBottom: "15px" }}>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />

        <button
          type="submit"
          style={{ width: "100%", padding: "10px" }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
  Don’t have an account? <Link to="/register">Register</Link>
</p>

      </form>
    </div>
  );
}

export default Login;
