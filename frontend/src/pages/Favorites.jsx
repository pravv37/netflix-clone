import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Favorites() {

  const [favorites, setFavorites] =
    useState([])

  // Backend API
  const API =
    "https://netflix-backend-xp9g.onrender.com/api/movies"

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites =
    async () => {
      try {

        const res =
          await axios.get(API)

        // Only favorite movies
        const favMovies =
          res.data.filter(
            (movie) =>
              movie.favorite === true
          )

        setFavorites(favMovies)

      } catch (error) {
        console.log(
          "Error fetching favorites:",
          error
        )
      }
    }

  return (
    <div
      className="container"
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "black",
        color: "white"
      }}
    >

      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        ❤️ My List
      </h1>

      <Link
        to="/"
        style={{
          color: "red",
          textDecoration: "none",
          fontSize: "20px"
        }}
      >
        ← Back Home
      </Link>

      <div
        className="movie-row"
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >

        {favorites.length > 0 ? (

          favorites.map(
            (movie) => (

              <div
                key={movie._id}
                className="movie-card"
                style={{
                  width: "220px",
                  background: "#111",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "0.3s"
                }}
              >

                <img
                  src={movie.image}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover"
                  }}
                />

                <div
                  className="movie-info"
                  style={{
                    padding: "15px"
                  }}
                >

                  <h2
                    style={{
                      fontSize: "20px",
                      marginBottom: "10px"
                    }}
                  >
                    {movie.title}
                  </h2>

                  <p>
                    ⭐ {movie.rating}
                  </p>

                  <button
                    className="play-btn"
                    onClick={() =>
                      window.open(
                        movie.trailer,
                        "_blank"
                      )
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "10px"
                    }}
                  >
                    ▶ Play
                  </button>

                </div>

              </div>
            )
          )

        ) : (

          <h2>
            No Favorite Movies Yet
          </h2>

        )}

      </div>

    </div>
  )
}

export default Favorites