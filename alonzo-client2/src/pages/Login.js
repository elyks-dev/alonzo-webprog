import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/UserService";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await loginUser({
                email,
                password,
            });

            console.log("Login successful", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "firstName",
                data.firstName
            );
            localStorage.setItem("type", data.type);

            navigate("/dashboard");
        } catch (error) {
            console.error(
                "Login failed:",
                error.response?.data?.message ||
                    error.message
            );

            setError(
                error.response?.data?.message ||
                    "Login failed. Please try again."
            );
        }
    };

    return (
        <div>
            <h2>Login</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>

            <Link to="/register">
                No account yet? Register here.
            </Link>
        </div>
    );
}

export default Login;