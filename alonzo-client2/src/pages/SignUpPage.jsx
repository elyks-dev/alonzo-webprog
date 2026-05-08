import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { createUser } from "../services/UserService";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "18",
    gender: "Male",
    contactNumber: "N/A",
    email: "",
    type: "viewer",
    username: "",
    password: "",
    address: "N/A",
    isActive: true,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      type: "viewer",
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUser({
        ...formData,
        type: "viewer",
      });

      navigate("/signin");
    } catch (error) {
      setError(
        error.response?.data?.message || "Sign up failed. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Start your reading journey.
        </p>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-white"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-white"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-white"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-white"
            required
          />

          <Button type="submit" variant="primary" className="w-full">
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-sm text-zinc-400">
          Already have an account?{" "}
          <NavLink to="/signin" className="text-white underline">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;