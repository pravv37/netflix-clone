import {
  useEffect,
  useState
} from "react"

import axios from "axios"

import {
  Search,
  Home,
  Tv,
  Plus,
  Play,
  TrendingUp,
  LogOut
} from "lucide-react"

import "./App.css"

function App() {

  const [movies,
    setMovies] =
    useState([])

  const [featured,
    setFeatured] =
    useState(null)

  const [search,
    setSearch] =
    useState("")

  const [category,
    setCategory] =
    useState("All")

  const API =
    "https://netflix-backend-xp9g.onrender.com/api/movies/api/movies"

  // LOGIN CHECK
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      )

    if (!token) {
      window.location.href =
        "/login"
    }

  }, [])

  // LOGOUT
  const handleLogout =
    () => {

      localStorage.clear()

      window.location.href =
        "/login"
    }

  // FETCH MOVIES
  useEffect(() => {

    const fetchMovies =
      async () => {

        try {

          const res =
            await axios.get(API)

          setMovies(res.data)

          if (res.data.length) {
            setFeatured(
              res.data[0]
            )
          }

        } catch (error) {
          console.log(error)
        }
      }

    fetchMovies()

  }, [])

  // FILTER MOVIES
  const filteredMovies =
    movies.filter(
      (movie) => {

        const matchSearch =
          movie.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        const matchCategory =
          category ===
            "All" ||
          movie.genre ===
            category

        return (
          matchSearch &&
          matchCategory
        )
      }
    )

  const categories =
    [
      "All",
      "Action",
      "Comedy",
      "Fantasy",
      "Drama",
      "Thriller"
    ]

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div className="logo">
          N
        </div>

        <Search />
        <Home />
        <Tv />
        <TrendingUp />
        <Plus />

        <div
          className="logout-icon"
          onClick={
            handleLogout
          }
        >
          <LogOut />
        </div>

      </div>

      {/* MAIN */}
      <div className="main-content">

        {/* HERO */}
        {featured && (
          <div
            className="hero-section"
            style={{
              backgroundImage:
                `linear-gradient(
                  rgba(0,0,0,0.75),
                  rgba(0,0,0,0.85)
                ),
                url(${featured.image})`
            }}
          >

            <div className="hero-overlay">

              <p className="netflix-series">
                NETFLIX SERIES
              </p>

              <h1>
                {featured.title}
              </h1>

              <div className="movie-meta">

                <span>
                  ⭐ {featured.rating}/10
                </span>

                <span>
                  {featured.genre}
                </span>

              </div>

              <div className="hero-buttons">

                <button
                  className="play-btn"
                >
                  <Play size={18} />
                  Play
                </button>

                <button
                  className="watch-btn"
                  onClick={() =>
                    window.open(
                      featured.trailer,
                      "_blank"
                    )
                  }
                >
                  Watch Trailer
                </button>

              </div>

            </div>

          </div>
        )}

        {/* SEARCH */}
        <div className="search-section">

          <input
            type="text"
            placeholder="Search Movies..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="search-input"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="category-filter"
          >

            {categories.map(
              (cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              )
            )}

          </select>

        </div>

        {/* MOVIES */}
        <div className="section">

          <h2>
            🔥 Trending Now
          </h2>

          <div className="movie-grid">

            {filteredMovies.map(
              (movie) => (

                <div
                  className="movie-card"
                  key={movie._id}
                >

                  <img
                    src={movie.image}
                    alt={movie.title}
                  />

                  <div className="card-overlay">

                    <h3>
                      {movie.title}
                    </h3>

                    <p>
                      ⭐ {movie.rating}
                    </p>

                    <button
                      className="card-play-btn"
                      onClick={() =>
                        window.open(
                          movie.trailer,
                          "_blank"
                        )
                      }
                    >
                      ▶ Play
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* MORE REASONS */}
        <div className="reasons-section">

          <h2>
            More reasons to join
          </h2>

          <div className="reasons-grid">

            <div className="reason-card">
              <h3>
                Enjoy on your TV
              </h3>

              <p>
                Watch on Smart TVs,
                Playstation, Xbox,
                Chromecast,
                Apple TV and more.
              </p>
            </div>

            <div className="reason-card">
              <h3>
                Download shows
                offline
              </h3>

              <p>
                Save favourites
                easily and watch
                anytime.
              </p>
            </div>

            <div className="reason-card">
              <h3>
                Watch everywhere
              </h3>

              <p>
                Stream unlimited
                movies on mobile,
                laptop and TV.
              </p>
            </div>

            <div className="reason-card">
              <h3>
                Kids profiles
              </h3>

              <p>
                Create profiles
                for kids with
                safe content.
              </p>
            </div>

          </div>

        </div>

        {/* FAQ */}
        <div className="faq-section">

          <h2>
            Frequently Asked Questions
          </h2>

          {[
            "What is Netflix?",
            "How much does Netflix cost?",
            "Where can I watch?",
            "How do I cancel?",
            "What can I watch on Netflix?",
            "Is Netflix good for kids?"
          ].map((item) => (

            <div
              className="faq-box"
              key={item}
            >
              <span>
                {item}
              </span>

              <span>
                +
              </span>
            </div>

          ))}

        </div>

        {/* FOOTER */}
        <div className="footer-section">

          <p className="footer-call">
            Questions? Call{" "}
            <span>
              000-800-919-1743
            </span>
          </p>

          <div className="footer-grid">

            <div className="footer-column">
              <a href="#">
                FAQ
              </a>
              <a href="#">
                Investor Relations
              </a>
              <a href="#">
                Privacy
              </a>
              <a href="#">
                Speed Test
              </a>
            </div>

            <div className="footer-column">
              <a href="#">
                Help Centre
              </a>
              <a href="#">
                Jobs
              </a>
              <a href="#">
                Cookie Preferences
              </a>
              <a href="#">
                Legal Notices
              </a>
            </div>

            <div className="footer-column">
              <a href="#">
                Account
              </a>
              <a href="#">
                Ways to Watch
              </a>
              <a href="#">
                Corporate Information
              </a>
              <a href="#">
                Only on Netflix
              </a>
            </div>

            <div className="footer-column">
              <a href="#">
                Media Centre
              </a>
              <a href="#">
                Terms of Use
              </a>
              <a href="#">
                Contact Us
              </a>
            </div>

          </div>

          <select className="language-select">
            <option>
              English
            </option>
            <option>
              हिन्दी
            </option>
          </select>

          <p className="footer-country">
            Netflix India
          </p>

          <p className="footer-captcha">
            This page is protected
            by Google reCAPTCHA
            to ensure you're
            not a bot.
          </p>

        </div>

      </div>

    </div>
  )
}

export default App