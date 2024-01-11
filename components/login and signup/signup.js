import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import classes from "./signup.module.css";

function Header({ children }) {
  return (
    <div className={classes.header}>
      <h1>Welcome!</h1>
      {children}
    </div>
  );
}

export default function SignUp({ props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [tooltippass, setTooltippass] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const tooltipOnOff = () => setTooltip((prevTooltip) => !prevTooltip);
  const tooltipOnOffPass = () => setTooltippass((prevTooltip) => !prevTooltip);

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  }, [email, password, confirmPassword]);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isMatching = (password, confirmPassword) =>
    password === confirmPassword;

  const handleSignUp = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setLoading(true);

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
      setTimeout(resetFields, 1500);
    }

    if (!isValidPassword(password)) {
      setPasswordError("Invalid password");
      setTimeout(resetFields, 1500);
    }

    if (!isMatching(password, confirmPassword)) {
      setConfirmPasswordError("Password mismatch");
      setTimeout(resetFields, 1500);
    }

    if (
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      !isMatching(password, confirmPassword)
    ) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        await signIn("credentials", {
          redirect: false,
          Email: email,
          Password: password,
        });

        router.replace("/home");
      } else {
        alert("The email is already used");
        resetFields();
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const signupForm = document.querySelector(".signupform");
    if (signupForm) {
      signupForm.classList.add("animate");
    }
  }, []);

  return (
    <div className={classes.signupcontainer}>
      {/* Tooltips */}
      <div className={classes.tooltip} onClick={tooltipOnOff}>
        <div className={classes.icon}>i</div>
        <div className={classes.tooltiptext}>Email Requirements</div>
      </div>

      <div className={classes.tooltippass} onClick={tooltipOnOffPass}>
        <div className={classes.icon}>i</div>
        <div className={classes.tooltiptext}>Password Requirements</div>
      </div>

      {/* Email Requirements Tooltip */}
      {(emailError || tooltip) && (
        <div className={classes.legendemail}>
          <p>Rules for a valid email address:</p>
          {/* ... (rest of the content) */}
        </div>
      )}

      {/* Password Requirements Tooltip */}
      {(passwordError || tooltippass) && (
        <div className={classes.legendpassword}>
          <p>Rules for a valid password:</p>
          {/* ... (rest of the content) */}
        </div>
      )}

      {/* Signup Form */}
      <div className={classes.signupform}>
        <h1>Sign Up</h1>

        <form>
          {/* Email Input */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email id"
            onChange={(e) => setEmail(e.target.value)}
            required
            className={classes.signupinput}
          />
          <div className={classes.error}>{emailError}</div>

          {/* Password Input */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className={classes.signupinput}
            />
            <button
              className={classes.visiblebutton}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
            <div className={classes.error}>{passwordError}</div>

            {/* Confirm Password Input */}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={classes.signupinput}
            />
            <button
              className={classes.visiblebutton}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
            </button>
            <div className={classes.error}>{confirmPasswordError}</div>
          </div>

          {/* Signup Button */}
          <center>
            <button
              type="button"
              onClick={handleSignUp}
              className={classes.signupbutton}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign Up"}
            </button>
          </center>

          {/* Login Option */}
          <div className={classes.loginoption}>
            <h4>Already have an account</h4>
            <Link href="" onClick={props}>
              SignIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
