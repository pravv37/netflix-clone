const mongoose =
  require("mongoose")

const movieSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },

      genre: {
        type: String,
        required: true
      },

      category: {
        type: String,
        required: true
      },

      rating: {
        type: Number,
        required: true
      },

      image: {
        type: String,
        required: true
      },

      trailer: {
        type: String,
        required: true
      },

      favorite: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true
    }
  )

const Movie =
  mongoose.model(
    "Movie",
    movieSchema
  )

module.exports =
  Movie