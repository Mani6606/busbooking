import React, { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import classes from "./signup.module.css";

function Header(props) {
  return (
    <>
      <div className={classes.header}>
        <h1>Welcome!</h1>
      </div>
      {props.children}
    </>
  );
}
export default function SignUp({ props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimpassword, setConfrimpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordcon, setShowPasswordcon] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [tooltippass, setTooltippass] = useState(false);
  const tooltiponoff = () => {
    setTooltip((prevTooltip) => !prevTooltip);
  };
  const tooltiponoffpass = () => {
    setTooltippass((prevTooltip) => !prevTooltip);
  };
  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilitycon = (event) => {
    event.preventDefault();
    setShowPasswordcon(!showPasswordcon);
  };
  // const inputTypecon = showPasswordcon ? "text" : "password";
  // const inputType = showPassword ? "text" : "password";

  function Email() {
    setEmail("");
  }
  function Password() {
    setPassword("");
    setConfrimpassword("");
  }
  useEffect(() => {
    setEmailError(""), setPasswordError(""), setPasswordcheck("");
  }, [email, password, confrimpassword]);
  function isValidEmail(email) {
    const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function isMatching(password, confrimpassword) {
    return password === confrimpassword;
  }

  async function handleSignUp() {
    setEmailError("");
    setPasswordError("");
    setPasswordcheck("");
    setLoading(true);

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address");

      setTimeout(Email, 1500);
    }

    if (!isValidPassword(password)) {
      setPasswordError("Invalid password");

      setTimeout(Password, 1500);
    }

    if (!isMatching(password, confrimpassword)) {
      setPasswordcheck("password Mismatch");
      setTimeout(Password, 1500);
    }

    if (
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      !isMatching(password, confrimpassword)
    ) {
      setLoading(false);
      return;
    } else {
      const responce = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const jsonData = await responce.json();
      if (responce.ok) {
        const response = await signIn("credentials", {
          redirect: false,
          Email: email,
          Password: password,
        });
        console.log(response);
        router.replace("/home");
      } else {
        alert("The email is already used");
        setEmail("");
        setPassword("");
        setConfrimpassword("");
        setLoading(false);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      const signupForm = document.querySelector(".signupform");
      if (signupForm) {
        signupForm.classList.add("animate");
      }
    });
  }, []);
  return (
    <div className={classes.signupcontainer}>
      <div className={classes.tooltip} onClick={tooltiponoff}>
        <div className={classes.icon}>i</div>
        <div className={classes.tooltiptext}>Email Requirements</div>
      </div>
      <div className={classes.tooltippass} onClick={tooltiponoffpass}>
        <div className={classes.icon}>i</div>
        <div className={classes.tooltiptext}>Password Requirements</div>
      </div>
      {(emailError || tooltip) && (
        <div className={classes.legendemail}>
          <p> Rules for a valid email address:</p>
          <p>1. Must start with a lowercase letter. </p>
          <p>
            2. Can be followed by zero or more lowercase letters, digits, dots
            ('.'), underscores ('_'), percent signs ('%'), plus signs ('+'), or
            hyphens ('-').{" "}
          </p>
          <p> 3. Must have '@' symbol.</p>
          <p>
            {" "}
            4. Must be followed by one or more lowercase letters, digits, dots
            ('.'), or hyphens ('-').
          </p>
          <p> 5. Must have a dot('.').</p>
          <p> 6. Must be followed by two or more lowercase letters.</p>
        </div>
      )}
      {(passwordError || tooltippass) && (
        <div className={classes.legendpassword}>
          <p> Rules for a valid password:</p>
          <p>1. Must contain at least one lowercase letter. </p>
          <p>2. Must contain at least one uppercase letter.</p>
          <p> 3. Must contain at least one digit (number).</p>
          <p>4. Must contain at least one special character among @$!%*#?&.</p>
          <p>5. Must be at least 8 characters long.</p>
        </div>
      )}
      <div className={classes.signupform}>
        <h1>Sign Up</h1>

        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email id "
            onChange={(e) => setEmail(e.target.value)}
            required
            className={classes.signupinput}
          />
          <div className={classes.error}>{emailError}</div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="password"
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
            <label htmlFor="password">Confrim Password</label>
            <input
              type={showPasswordcon ? "text" : "password"}
              id="confrimpassword"
              value={confrimpassword}
              placeholder="confrim password"
              onChange={(e) => setConfrimpassword(e.target.value)}
              required
              className={classes.signupinput}
            />
            <button
              className={classes.visiblebutton}
              onClick={togglePasswordVisibilitycon}
            >
              {showPasswordcon ? <FiEye /> : <FiEyeOff />}
            </button>
            <div className={classes.error}>{passwordcheck}</div>
          </div>

          <center>
            <button
              type="button"
              onClick={handleSignUp}
              className={classes.signupbutton}
            >
              {loading ? "Signing in..." : "Sign Up"}
            </button>
          </center>
          <div className={classes.loginoption}>
            <h4>Already having an account </h4>
            <Link href="" onClick={props}>
              SignIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
