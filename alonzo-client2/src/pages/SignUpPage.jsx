import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { createUser } from "../services/UserService";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    type: "editor",
    username: "",
    password: "",
    address: "",
    isActive: true,
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      type: "editor",
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUser({
        ...formData,
        type: "editor",
      });

      navigate("/signin");
    } catch (error) {
      setError(
        error.response?.data?.message || "Sign up failed. Please try again."
      );
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111113] px-4 py-10">
      <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="absolute left-4 top-4 z-50 sm:left-6 sm:top-6">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-[#18181b]/80 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur transition hover:border-violet-400/40 hover:text-white"
        >
          <span className="text-base">←</span>
          Back Home
        </NavLink>
      </div>

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#18181b]/95 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.85fr_1.15fr]">
        <div className="hidden flex-col justify-center border-b border-zinc-800 bg-[#151517] p-10 lg:flex lg:border-b-0 lg:border-r">
          <span className="inline-flex w-fit rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
            Create Account
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-[-0.04em] text-zinc-50">
            Join the world of
            <span className="block bg-gradient-to-r from-violet-300 to-zinc-100 bg-clip-text text-transparent">
              tech and digital culture.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
            Create an editor account to access the dashboard and manage site
            content.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {["Programming", "PC Hardware", "Software Tools", "Tech Trends"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-[#1c1c20] px-4 py-4 text-sm font-medium text-zinc-300"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <div className="p-6 pt-20 sm:p-8 sm:pt-20 lg:p-10">
          <h2 className="text-3xl font-black text-zinc-50">
            Create Account
          </h2>

          <p className="mt-2 text-sm leading-7 text-zinc-400">
            Fill in your account details below.
          </p>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="mt-6 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
                required
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
                required
              />

              <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full appearance-none rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 pr-14 text-sm outline-none transition focus:border-violet-400/60 focus:bg-[#16161a] ${
                  formData.gender ? "text-zinc-100" : "text-zinc-500"
                }`}
                required
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300">
                ∨
              </span>
            </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
                required
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
              required
            />

            <Button type="submit" variant="primary" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-sm text-zinc-500">
            Already have an account?{" "}
            <NavLink
              to="/signin"
              className="font-medium text-zinc-100 transition hover:text-violet-300"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;