const Movie = require("../models/movie")

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// Add movie
exports.addMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body)
        res.status(201).json(movie)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// Toggle Favorite
exports.toggleFavorite = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            })
        }

        movie.favorite = !movie.favorite

        await movie.save()

        res.status(200).json(movie)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// DELETE MOVIE
exports.deleteMovie =
  async (req, res) => {
    try {

      await Movie.findByIdAndDelete(
        req.params.id
      )

      res.status(200).json({
        message:
          "Movie deleted"
      })

    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
  // UPDATE MOVIE
exports.updateMovie =
  async (req, res) => {
    try {

      const movie =
        await Movie.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )

      res.status(200).json(
        movie
      )

    } catch (error) {
      console.log(error)
      res.status(500).json(
        error
      )
    }
  }