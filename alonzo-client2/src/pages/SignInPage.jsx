import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { loginUser } from "../services/UserService";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginUser({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
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

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#18181b]/95 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden flex-col justify-center border-b border-zinc-800 bg-[#151517] p-10 lg:flex lg:border-b-0 lg:border-r">
          <span className="inline-flex w-fit rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
            Welcome Back
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-[-0.04em] text-zinc-50">
            Continue exploring
            <span className="block bg-gradient-to-r from-violet-300 to-zinc-100 bg-clip-text text-transparent">
              tech and development.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">
            Access articles about programming, web development, PC hardware,
            software tools, and modern technology.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              "Programming",
              "Tech News",
              "Web Development",
              "Digital Culture",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-800 bg-[#1c1c20] px-4 py-4 text-sm font-medium text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center p-6 pt-20 sm:p-8 sm:pt-20 lg:p-10">
          <div className="w-full">
            <h2 className="text-3xl font-black text-zinc-50">Sign In</h2>

            <p className="mt-2 text-sm leading-7 text-zinc-400">
              Continue your reading experience.
            </p>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} className="mt-6 space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-zinc-700 bg-[#111113] px-5 py-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:bg-[#16161a]"
                required
              />

              <Button type="submit" variant="primary" className="w-full">
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-sm text-zinc-500">
              No account yet?{" "}
              <NavLink
                to="/signup"
                className="font-medium text-zinc-100 transition hover:text-violet-300"
              >
                Create one
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;