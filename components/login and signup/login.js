import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SignUp from "./signup";
import Image from "next/image";
import classes from "./login.module.css";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    userpassword: "",
    loading: false,
  });
  const [showPassword, setShowPassword] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const switchSignIn = (event) => {
    event.preventDefault();
    setIsSignUp((prevIsSignup) => !prevIsSignup);
  };

  const setDetails = () => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      email: "",
      password: "",
    }));
  };

  useEffect(() => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      userpassword: "",
    }));
  }, [formState.email, formState.password]);

  const adminCredentials = {
    email: "admin@gmail.com",
    password: "Admin@1234",
  };

  const loginHandler = async () => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      loading: true,
      userpassword: "",
    }));

    const response = await signIn("credentials", {
      redirect: false,
      Email: formState.email,
      Password: formState.password,
    });

    if (
      (formState.email === adminCredentials.email &&
        formState.password === adminCredentials.password) ||
      (!response.error && !formState.email.startsWith("admin"))
    ) {
      router.replace(
        formState.email === adminCredentials.email ? "/adminhome" : "/home"
      );
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        userpassword: "Invalid Username or password",
      }));
      setTimeout(setDetails, 400);
    }

    setFormState((prevFormState) => ({
      ...prevFormState,
      loading: false,
    }));
  };

  useEffect(() => {
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
        src="/background.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
      />
      <div className={classes.header}>
        <h1>Welcome!</h1>
      </div>

      {isSignUp ? (
        <SignUp props={switchSignIn} />
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
                  value={formState.email}
                  placeholder="Email id"
                  onChange={(e) =>
                    setFormState((prevFormState) => ({
                      ...prevFormState,
                      email: e.target.value,
                    }))
                  }
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
                    value={formState.password}
                    onChange={(e) =>
                      setFormState((prevFormState) => ({
                        ...prevFormState,
                        password: e.target.value,
                      }))
                    }
                    placeholder="password"
                    className={classes.signupinput}
                    required
                  />

                  <button
                    className={classes.visiblebutton}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className={classes.error}>{formState.userpassword}</div>
              </div>
              <center>
                <button
                  onClick={loginHandler}
                  type="button"
                  className={classes["btn-23"]}
                >
                  <span className={classes.text}>
                    {formState.loading ? "Logging in..." : "Login"}
                  </span>
                  <span aria-hidden="" className={classes.marquee}>
                    {formState.loading ? "Logging in... " : "Login"}
                  </span>
                </button>
              </center>
            </form>
            <center className={classes.register}>
              <Link href="" onClick={switchSignIn}>
                SignUp
              </Link>
            </center>
          </div>
        </div>
      )}
    </div>
  );
}
