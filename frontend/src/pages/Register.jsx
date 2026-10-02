import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { petImages } from "../data/pets";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const { register, loading } = useAuth();

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register(
                form.name,
                form.email,
                form.password
            );

            navigate("/dashboard", {
                replace: true
            });
        } catch (error) {
            console.error(
                "Registration error:",
                error
            );

            if (error.response) {
                setError(
                    error.response.data?.message ||
                        "Unable to create account."
                );
            } else if (
                error.code === "ERR_NETWORK"
            ) {
                setError(
                    "PetMatch server is not connected. Start the backend on port 5000 and try again."
                );
            } else {
                setError(
                    "Unable to create account. Please try again."
                );
            }
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-visual">
                <img
                    src={petImages.cat2}
                    alt="PetMatch cat"
                />

                <div className="auth-overlay" />

                <div>
                    <span className="eyebrow cream">
                        YOUR NEW CHAPTER
                    </span>

                    <h1>
                        There is a little face
                        waiting for you.
                    </h1>

                    <p>
                        Create an account to
                        save favorites and start
                        adoption applications.
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
                        JOIN THE COMMUNITY
                    </span>

                    <h2>
                        Create your account.
                    </h2>

                    <p>
                        It only takes a minute.
                    </p>
                </div>

                {error && (
                    <div className="error-box">
                        {error}
                    </div>
                )}

                <form onSubmit={submit}>
                    <label>
                        Full name

                        <input
                            required
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value
                                })
                            }
                            placeholder="Your name"
                            autoComplete="name"
                        />
                    </label>

                    <label>
                        Email

                        <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </label>

                    <label>
                        Password

                        <input
                            required
                            minLength={6}
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password:
                                        e.target.value
                                })
                            }
                            placeholder="At least 6 characters"
                            autoComplete="new-password"
                        />
                    </label>

                    <button
                        className="primary-btn wide"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating…"
                            : "Create account"}
                    </button>
                </form>

                <p className="auth-bottom">
                    Already have an account?{" "}
                    <Link to="/login">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}