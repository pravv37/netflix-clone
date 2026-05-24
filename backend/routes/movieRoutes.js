const express = require("express")
const router = express.Router()

const {
  getMovies,
  addMovie,
  toggleFavorite,
  deleteMovie,
  updateMovie
} = require("../controllers/movieController")

// Get all movies
router.get("/", getMovies)

// Add movie
router.post("/", addMovie)

// Toggle favorite
router.put(
  "/:id/favorite",
  toggleFavorite
)

// Update movie
router.put(
  "/:id",
  updateMovie
)

// Delete movie
router.delete(
  "/:id",
  deleteMovie
)

module.exports = router