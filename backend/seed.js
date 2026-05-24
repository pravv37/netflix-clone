const mongoose =
  require("mongoose")

require("dotenv")
  .config()

const Movie =
  require("./models/movie")

const movies =
  require("./data/movies")

async function seedMovies() {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    )

    console.log(
      "MongoDB Connected"
    )

    await Movie.deleteMany(
      {}
    )

    await Movie.insertMany(
      movies
    )

    console.log(
      "Movies Added Successfully"
    )

    process.exit()

  } catch (error) {

    console.log(
      JSON.stringify(
        error,
        null,
        2
      )
    )

    process.exit(1)
  }
}

seedMovies()