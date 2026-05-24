const User =
  require("../models/user")

const bcrypt =
  require("bcryptjs")

const jwt =
  require("jsonwebtoken")

// ================= SIGNUP =================

exports.signup =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body

      // CHECK EMPTY
      if (
        !name ||
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            message:
              "All fields are required"
          })
      }

      // CHECK USER
      const existingUser =
        await User.findOne({
          email
        })

      if (
        existingUser
      ) {
        return res
          .status(400)
          .json({
            message:
              "User already exists"
          })
      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        )

      // CREATE USER
      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword
        })

      // TOKEN
      const token =
        jwt.sign(
          {
            id: user._id
          },
          "netflix_secret_key",
          {
            expiresIn:
              "7d"
          }
        )

      res.status(201).json({
        success: true,
        message:
          "Signup Successful",
        token,
        user
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        success: false,
        message:
          "Signup Failed"
      })
    }
  }

// ================= LOGIN =================

exports.login =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body

      // CHECK EMPTY
      if (
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            message:
              "Please fill all fields"
          })
      }

      // FIND USER
      const user =
        await User.findOne({
          email
        })

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User not found"
          })
      }

      // PASSWORD CHECK
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        )

      if (!isMatch) {

        return res
          .status(400)
          .json({
            message:
              "Wrong Password"
          })
      }

      // TOKEN
      const token =
        jwt.sign(
          {
            id:
              user._id
          },
          "netflix_secret_key",
          {
            expiresIn:
              "7d"
          }
        )

      res.status(200).json({
        success: true,
        message:
          "Login Successful",
        token,
        user
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        success: false,
        message:
          "Login Failed"
      })
    }
  }