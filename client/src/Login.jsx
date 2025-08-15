import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Login failed: ${text}`);
      }

      const res = await response.json();

      localStorage.setItem("token", res.token);
      localStorage.setItem("username", username);
      localStorage.setItem("UserID", res.id);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  if (token && token !== "undefined") return <Navigate to="/" />;

  return (
    <div className="Login_container">
      <div className="Login">
        <h1 id="login-title">Login</h1>

        <form id="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />

          <input type="submit" value="Login" id="btn-login" />
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="create-acc">
          <p>
            Create an account? <Link to="/signin" className="signin-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
