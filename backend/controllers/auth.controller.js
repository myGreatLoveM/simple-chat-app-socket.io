import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generatejwt.js'

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        success: false,
        mesaage: 'Please provide all required information',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        mesaage: 'Password must be at least 6 characters',
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        mesaage: 'Passwords do not match',
      })
    }

    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({
        success: false,
        mesaage: 'Username already exist',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const passhash = await bcrypt.hash(password, salt)

    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`

    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      gender,
      password: passhash,
      profilePic: gender === 'male' ? maleAvatar : femaleAvatar,
    })

    if (newUser) {
      await newUser.save()

      console.log(newUser._id)
      generateTokenAndSetCookie(newUser._id, res)
      const currentUser = {
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
      }

      return res.status(201).json({
        success: true,
        mesaage: 'User created successfully',
        data: currentUser,
      })
    } else {
      return res.status(400).json({
        success: false,
        mesaage: 'Something went wrong',
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      mesaage: 'Internal Server Error',
    })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        mesaage: 'Please provide all required information',
      })
    }

    const userExist = await User.findOne({ username })

    if (!userExist) {
      return res.status(404).json({
        success: false,
        mesaage: 'Invalid credentials',
      })
    } else {
      const passwordVerify = await bcrypt.compare(password, userExist.password)

      if (!passwordVerify) {
        return res.status(404).json({
          success: false,
          mesaage: 'Invalid credentials',
        })
      } else {
        generateTokenAndSetCookie(userExist._id, res)

        const currentUser = {
          _id: userExist._id,
          fullName: userExist.fullName,
          username: userExist.username,
          gender: userExist.gender,
        }
        return res.status(200).json({
          success: true,
          message: 'User logged in successfully',
          data: currentUser,
        })
      }
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      mesaage: 'Internal Server Error',
    })
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie('token', '', {maxAge: 0})
    return res.status(200).json({
      success: true,
      mesaage: 'Logged Out successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      mesaage: 'Internal Server Error',
    })
  }
}
