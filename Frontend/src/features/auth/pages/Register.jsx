import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";


export default function Register() {

    const navigate = useNavigate();


    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);


    const {
        loading,
        handleRegister
    } = useAuth();


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            await handleRegister({
                username,
                email,
                password
            });


            navigate("/");


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

        }

    };


    if (loading) {

        return (

            <main className="auth-page">

                <div className="form-container">

                    <h1>
                        Creating your account...
                    </h1>

                    <p className="auth-subtitle">
                        Please wait while we set
                        everything up.
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
                        Create your account
                    </h1>

                    <p className="auth-subtitle">
                        Start building personalized
                        interview strategies.
                    </p>

                </div>



                {/* FORM */}

                <form onSubmit={handleSubmit}>


                    {/* USERNAME */}

                    <div className="input_group">

                        <label htmlFor="username">
                            Username
                        </label>


                        <div className="auth-input-wrapper">

                            <span className="auth-input-icon">
                                ◎
                            </span>


                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your username"
                                required
                            />

                        </div>

                    </div>



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
                                placeholder="Create a password"
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
                        Create account
                    </button>

                </form>



                {/* LOGIN */}

                <p className="auth-switch">

                    Already have an account?{" "}

                    <Link to="/login">
                        Sign in
                    </Link>

                </p>


            </div>



            <Footer />

        </main>

    );
}