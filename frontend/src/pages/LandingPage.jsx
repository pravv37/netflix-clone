import { useNavigate } from "react-router-dom"
import "./LandingPage.css"

function LandingPage() {

  const navigate =
    useNavigate()

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="landing-navbar">

        <h1>
          NETFLIX
        </h1>

        <button
          className="signin-btn"
          onClick={() =>
            navigate("/login")
          }
        >
          Sign In
        </button>

      </nav>

      {/* HERO */}
      <div className="landing-overlay">

        <div className="landing-content">

          <h1>
            Unlimited movies,
            <br />
            TV shows and more
          </h1>

          <h2>
            Starts at ₹149.
            Cancel anytime.
          </h2>

          <p>
            Ready to watch?
            Sign in to enjoy
            Netflix Clone.
          </p>

          <button
            className="get-started-btn"
            onClick={() =>
              navigate(
                "/signup"
              )
            }
          >
            Get Started →
          </button>

        </div>

      </div>

    </div>
  )
}

export default LandingPage