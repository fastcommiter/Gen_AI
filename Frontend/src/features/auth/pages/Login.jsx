import React, { useState } from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";


export default function Login() {

    const {
        loading,
        handleLogin
    } = useAuth();


    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();


        const success =
            await handleLogin({
                email,
                password
            });


        if (success) {

            navigate("/");

        }
    };


    if (loading) {

        return (

            <main className="auth-page">

                <div className="form-container">

                    <h1>
                        Signing you in...
                    </h1>

                    <p className="auth-subtitle">
                        Please wait while we verify
                        your account.
                    </p>

                </div>

            </main>

        );
    }


    return (

        <main className="auth-page">


            <div className="form-container">


                {/* BRAND */}

                <div className="auth-brand">

                    <div className="auth-brand-icon">
                        ✦
                    </div>

                    <div className="auth-brand-text">

                        <strong>
                            InterviewAI
                        </strong>

                        <span>
                            Smart interview preparation
                        </span>

                    </div>

                </div>



                {/* HEADING */}

                <div>

                    <h1>
                        Welcome back
                    </h1>

                    <p className="auth-subtitle">
                        Sign in to continue your
                        interview preparation.
                    </p>

                </div>



                {/* FORM */}

                <form onSubmit={handleSubmit}>


                    {/* EMAIL */}

                    <div className="input_group">

                        <label htmlFor="email">
                            Email address
                        </label>


                        <div className="auth-input-wrapper">

                            <span className="auth-input-icon">
                                @
                            </span>


                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="you@example.com"
                                required
                            />

                        </div>

                    </div>



                    {/* PASSWORD */}

                    <div className="input_group">

                        <label htmlFor="password">
                            Password
                        </label>


                        <div className="auth-input-wrapper password-wrapper">

                            <span className="auth-input-icon">
                                •
                            </span>


                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your password"
                                required
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>



                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="button primary-button"
                    >
                        Sign in
                    </button>

                </form>



                {/* REGISTER */}

                <p className="auth-switch">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Create an account
                    </Link>

                </p>


            </div>



            <Footer />

        </main>

    );
}