import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {

  const navigate =
    useNavigate()

  const [email,
    setEmail] =
    useState("")

  const [password,
    setPassword] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  const handleLogin =
    async () => {

      if (
        !email ||
        !password
      ) {
        alert(
          "Please fill all fields"
        )
        return
      }

      try {

        setLoading(true)

        const res =
          await axios.post(
            "https://netflix-backend-xp9g.onrender.com/api/auth/login",
            {
              email,
              password
            }
          )

        localStorage.setItem(
          "token",
          res.data.token
        )

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        )

        alert(
          "Login Successful ✅"
        )

        window.location.href =
          "/"

      } catch (error) {

        alert(
          error.response
            ?.data
            ?.message ||
          "Login Failed ❌"
        )

      } finally {

        setLoading(false)
      }
    }

  return (
    <div className="login-page">

      {/* NAVBAR */}

      <div className="login-navbar">

        <h1 className="netflix-logo">
          NETFLIX
        </h1>

        <button
          className="signin-btn"
        >
          Sign In
        </button>

      </div>

      {/* LOGIN BOX */}

      <div className="overlay">

        <div className="login-box">

         

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            onClick={
              handleLogin
            }
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

          <p>
            New to Netflix?{" "}

            <span
              onClick={() =>
                navigate(
                  "/signup"
                )
              }
            >
              Sign up now
            </span>
          </p>

        </div>

      </div>

  

    </div>
  )
}

export default Login