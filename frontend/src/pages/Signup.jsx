import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Signup() {

  const navigate =
    useNavigate()

  const [name,
    setName] =
    useState("")

  const [email,
    setEmail] =
    useState("")

  const [password,
    setPassword] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  const handleSignup =
    async () => {

      if (
        !name ||
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

        await axios.post(
          "https://netflix-backend-xp9g.onrender.com/api/auth/signup",
          {
            name,
            email,
            password
          }
        )

        alert(
          "Signup Successful ✅"
        )

        navigate(
          "/login"
        )

      } catch (error) {

        console.log(error)

        alert(
          error.response?.data
            ?.message ||
          "Signup Failed ❌"
        )

      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Signup</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key ===
              "Enter"
            ) {
              handleSignup()
            }
          }}
        />

        <button
          onClick={
            handleSignup
          }
        >
          {loading
            ? "Creating Account..."
            : "Signup"}
        </button>

        <p>
          Already have an
          account?{" "}
          <span
            onClick={() =>
              navigate(
                "/login"
              )
            }
          >
            Login
          </span>
        </p>

      </div>

    </div>
  )
}

export default Signup