import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Favorites() {

  const [favorites,
    setFavorites] =
    useState([])

  const API =
    "https://netflix-backend-xp9g.onrender.com/api/movies/api/movies"

  useEffect(() => {

    fetchFavorites()

  }, [])

  const fetchFavorites =
    async () => {
      try {

        const res =
          await axios.get(
            API
          )

        const favMovies =
          res.data.filter(
            (movie) =>
              movie.favorite
          )

        setFavorites(
          favMovies
        )

      } catch (error) {
        console.log(
          error
        )
      }
    }

  return (
    <div
      className="container"
      style={{
        padding:
          "40px"
      }}
    >

      <h1
        style={{
          marginBottom:
            "40px"
        }}
      >
        ❤️ My List
      </h1>

      <Link
        to="/"
        style={{
          color:
            "red",
          textDecoration:
            "none",
          fontSize:
            "20px"
        }}
      >
        ← Back Home
      </Link>

      <div
        className="movie-row"
        style={{
          marginTop:
            "40px"
        }}
      >

        {favorites.length >
        0 ? (

          favorites.map(
            (movie) => (
              <div
                key={
                  movie._id
                }
                className="movie-card"
              >

                <img
                  src={
                    movie.image
                  }
                  alt={
                    movie.title
                  }
                />

                <div className="movie-info">

                  <h2>
                    {
                      movie.title
                    }
                  </h2>

                  <p>
                    ⭐{" "}
                    {
                      movie.rating
                    }
                  </p>

                  <button
                    className="play-btn"
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
          )

        ) : (

          <h2>
            No Favorite
            Movies Yet
          </h2>

        )}

      </div>

    </div>
  )
}

export default Favorites