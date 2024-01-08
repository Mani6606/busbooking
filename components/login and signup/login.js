import classes from "./login.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SignUp from "./signup";
import Image from "next/image";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const switchsignin = (event) => {
    event.preventDefault();
    setIsSignUp((prevIsSignup) => !prevIsSignup);
  };
  // const inputType = showPassword ? "text" : "password";

  function setDetails() {
    setEmail("");
    setPassword("");
  }
  useEffect(() => {
    setUserpassword("");
  }, [email, password]);
  async function loginHandler() {
    if (email === "admin@gmail.com" && password === "admin@1234") {
      setLoading(true);
      setUserpassword("");
      const response = await signIn("credentials", {
        redirect: false,
        Email: email,
        Password: password,
      });

      if (response.ok) {
        router.replace("/adminhome");
      } else {
        setUserpassword("Invalid Username or password");
        setTimeout(setDetails, 400);
      }

      setLoading(false);
    } else {
      setLoading(true);
      setUserpassword("");

      const response = await signIn("credentials", {
        redirect: false,
        Email: email,
        Password: password,
      });

      if (!response.error) {
        router.replace("/home");
      } else {
        setUserpassword("Invalid Username or password");
        setTimeout(setDetails, 400);
      }

      setLoading(false);
    }
  }
  // JavaScript to add the class to trigger the animation
  useEffect(() => {
    // Wrap the code in a "DOMContentLoaded" event listener
    document.addEventListener("DOMContentLoaded", function () {
      const signupForm = document.querySelector(".signupform");
      if (signupForm) {
        signupForm.classList.add("animate");
      }
    });
  }, []);

  return (
    <div className={classes.fullpage}>
      <Image
        src="/background.jpg" // Replace with the actual path to your image
        alt="Background Image"
        layout="fill"
        objectFit="cover"
      />
      <div className={classes.header}>
        <h1>Welcome!</h1>
      </div>

      {isSignUp ? (
        <SignUp props={switchsignin} />
      ) : (
        <div className={classes.signupcontainer}>
          <div className={classes.signupform}>
            <h1>Login</h1>

            <form>
              <div>
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
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className={classes.passwordinput}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                  />
                  <button
                    className={classes.visiblebutton}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className={classes.error}>{userpassword}</div>
              </div>
              <center>
                <button
                  type="button"
                  onClick={loginHandler}
                  className={classes.signupbutton}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </center>
            </form>
            <center className={classes.register}>
              <Link href="" onClick={switchsignin}>
                SignUp
              </Link>
            </center>
          </div>
        </div>
      )}
    </div>
  );
}
