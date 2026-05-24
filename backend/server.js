const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const movieRoutes =
  require(
    "./routes/movieRoutes"
  )

const authRoutes =
  require(
    "./routes/authRoutes"
  )

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use(
  "/api/movies",
  movieRoutes
)

app.use(
  "/api/auth",
  authRoutes
)

app.get("/", (req, res) => {
  res.send(
    "Netflix Backend Running"
  )
})

// MongoDB Connection
const connectDB =
  async () => {
    try {

      await mongoose.connect(
        process.env.MONGO_URI
      )

      console.log(
        "MongoDB Connected"
      )

      const PORT =
        process.env.PORT ||
        5000

      app.listen(
        PORT,
        () => {
          console.log(
            `Server Running on Port ${PORT}`
          )
        }
      )

    } catch (error) {
      console.log(
        "MongoDB Error:",
        error.message
      )
    }
  }

connectDB()