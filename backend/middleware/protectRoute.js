import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
      return res.status(401).json({
        success: true,
        message: 'Unauthorized - No Token provided',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).json({
        success: true,
        message: 'Unauthorized - Invalid Token',
      })
    }
    console.log(decoded)
    console.log(decoded.iat)
    const user = await User.findOne({_id: decoded.userId})
    console.log(user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default protectRoute
