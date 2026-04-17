import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="Alonzo Creative"
            className="h-10 w-10 object-contain transition group-hover:opacity-80"
          />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-white">
              Alonzo
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-400 uppercase">
              Creatives
            </span>
          </div>
        </NavLink>

        {/* Center Nav Pills */}
        <nav className="hidden items-center rounded-full border border-zinc-800 bg-zinc-900 px-1.5 py-1.5 gap-0.5 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-full px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200",
                  isActive
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-400 hover:text-white",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink
            to="/signin"
            className="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition"
          >
            Sign In
          </NavLink>

          <NavLink
            to="/signup"
            className="rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-900 hover:bg-zinc-200 transition"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-xl px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition",
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Auth Buttons (Mobile) */}
            <div className="mt-3 border-t border-zinc-800 pt-3 flex flex-col gap-1">
              <NavLink
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                Sign In
              </NavLink>

              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] bg-white text-zinc-900 hover:bg-zinc-200"
              >
                Sign Up
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
