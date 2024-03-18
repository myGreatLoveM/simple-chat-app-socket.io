import User from '../models/user.model.js'

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password')

    return res.status(200).json({
      success: true,
      data: filteredUsers,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
