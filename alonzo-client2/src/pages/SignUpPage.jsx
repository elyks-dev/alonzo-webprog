import Button from "../components/Button";
import { NavLink } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Start your reading journey.
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-white"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-white"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-white"
          />

          <Button to="/" variant="primary" className="w-full">
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
