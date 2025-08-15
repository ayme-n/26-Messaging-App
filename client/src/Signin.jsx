import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

function Signin() {
    const [username, setUsername] = useState("");
    const [PlainPassword, setPassword] = useState("");
    const [Confirmpassword, setConfirmpassword] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                PlainPassword,
                Confirmpassword
            })
        });

        const res = await response.json();
        console.log(res);
        navigate("/login");
    }

    if (token && token !== "undefined") return <Navigate to="/" />;

    return (
        <div className="Login_container">
            <div className="Login">
                <h1 id="login-title">Sign Up</h1>

                <form id="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <input type="submit" value="Sign Up" id="btn-login" />
                </form>

                <div className="create-acc">
                    <p>
                        Already have an account?
                        <Link to="/login" className="signin-link">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
