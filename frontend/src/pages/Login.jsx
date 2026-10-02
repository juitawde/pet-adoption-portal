import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Eye,
    EyeOff,
    Heart,
    ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { petImages } from "../data/pets";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

    const { login, loading } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(
                email,
                password
            );

            const from =
                location.state?.from;

            if (from) {
                navigate(from, {
                    replace: true
                });
            } else if (
                data.user.role === "admin"
            ) {
                navigate("/admin", {
                    replace: true
                });
            } else {
                navigate("/dashboard", {
                    replace: true
                });
            }
        } catch (error) {
            console.error(
                "Login error:",
                error
            );

            if (error.response) {
                setError(
                    error.response.data?.message ||
                        "Unable to sign in."
                );
            } else if (
                error.code === "ERR_NETWORK"
            ) {
                setError(
                    "PetMatch server is not connected. Start the backend on port 5000 and try again."
                );
            } else {
                setError(
                    "Unable to sign in. Please try again."
                );
            }
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-visual">
                <img
                    src={petImages.dog}
                    alt="PetMatch dog"
                />

                <div className="auth-overlay" />

                <div>
                    <span className="eyebrow cream">
                        WELCOME BACK
                    </span>

                    <h1>
                        Good things are waiting
                        at the shelter.
                    </h1>

                    <p>
                        Sign in to save pets,
                        apply for adoption and
                        follow your journey.
                    </p>
                </div>
            </div>

            <div className="auth-card">
                <Link
                    className="auth-brand"
                    to="/"
                >
                    <Heart fill="currentColor" />
                    PetMatch
                </Link>

                <div className="auth-head">
                    <span className="eyebrow">
                        YOUR PETMATCH ACCOUNT
                    </span>

                    <h2>
                        Welcome back.
                    </h2>

                    <p>
                        Sign in and keep the
                        adoption journey moving.
                    </p>
                </div>

                {error && (
                    <div className="error-box">
                        {error}
                    </div>
                )}

                <form onSubmit={submit}>
                    <label>
                        Email

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </label>

                    <label>
                        Password

                        <div className="password-input">
                            <input
                                type={
                                    show
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShow(!show)
                                }
                                aria-label={
                                    show
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {show ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </label>

                    <button
                        className="primary-btn wide"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in…"
                            : "Sign in"}
                    </button>
                </form>

                <div className="demo-box">
                    <strong>
                        Demo accounts
                    </strong>

                    <span>
                        Admin:
                        admin@petmatch.com /
                        Admin@123
                    </span>

                    <span>
                        User:
                        user@petmatch.com /
                        User@123
                    </span>
                </div>

                <p className="auth-bottom">
                    New to PetMatch?{" "}
                    <Link to="/register">
                        Create an account
                    </Link>
                </p>

                <div className="secure-note">
                    <ShieldCheck size={16} />
                    JWT protected ·
                    Firebase-ready authentication
                </div>
            </div>
        </main>
    );
}