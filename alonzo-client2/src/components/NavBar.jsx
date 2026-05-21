import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { fetchUsers } from "../services/UserService";

const links = [
  { label: "Home", to: "/" },
  { label: "Articles", to: "/articles" },
  { label: "About", to: "/about" },
];

const getUserFromToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [fullName, setFullName] = useState("");

  const accountRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const loadLoggedInUser = async () => {
    if (!token) {
      setFullName("");
      return;
    }

    try {
      const decoded = getUserFromToken(token);
      const { data } = await fetchUsers();

      const user = data.users.find(
        (item) => item._id === decoded?.id || item.email === decoded?.email
      );

      if (user) {
        setFullName(`${user.firstName} ${user.lastName}`);
      } else {
        setFullName(localStorage.getItem("firstName") || "Account");
      }
    } catch (error) {
      console.error("Failed to load logged in user:", error);
      setFullName(localStorage.getItem("firstName") || "Account");
    }
  };

  useEffect(() => {
    loadLoggedInUser();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("type");

    setFullName("");
    setMenuOpen(false);
    setAccountOpen(false);
    navigate("/");
  };

  const goDashboard = () => {
    setMenuOpen(false);
    setAccountOpen(false);
    navigate("/dashboard");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="Alonzo Creative"
            className="h-10 w-10 object-contain transition group-hover:opacity-80"
          />

          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-white">
              AlonzoTech
            </span>

          </div>
        </NavLink>

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

        <div className="hidden items-center gap-2 md:flex">
          {token ? (
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="rounded-full border border-violet-400/40 bg-violet-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200 transition hover:bg-violet-400/20 hover:text-white"
              >
                {fullName || "Account"}
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-zinc-800 bg-[#18181b] p-2 shadow-2xl shadow-black/40">
                  <button
                    onClick={goDashboard}
                    className="w-full rounded-xl px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300 transition hover:bg-violet-400/10 hover:text-white"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full rounded-xl px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-all ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />

          <span
            className={`block h-0.5 w-5 bg-white transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`block h-0.5 w-5 bg-white transition-all ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

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

            <div className="mt-3 flex flex-col gap-2 border-t border-zinc-800 pt-3">
              {token ? (
                <>
                  <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 px-4 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-300">
                      Signed In As
                    </p>

                    <p className="mt-1 text-sm font-bold text-zinc-100">
                      {fullName || "Account"}
                    </p>
                  </div>

                  <button
                    onClick={goDashboard}
                    className="rounded-xl px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="rounded-xl px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
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
                    className="rounded-xl bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-900 hover:bg-zinc-200"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;