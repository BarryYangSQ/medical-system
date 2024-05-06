import asyncHandler from 'express-async-handler'
import User from '../models/usersModel.js'
import Waitinglist from '../models/waitingListModel.js'
import generateToken from '../utils/generateToken.js'
import Staff from '../models/staffModel.js'


//@desc    注册一个新用户到等待名单
//@route   POST /api/users/waitinglist
//@access  公开
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dateOfBirth, gender, address, postalCode } = req.body

  // 检查用户是否已存在于用户列表或等待名单中
  const userExists = await User.findOne({ email })
  const waitingUserExists = await Waitinglist.findOne({ email })

  if (userExists) {
    res.status(400).json({ message: '用户已注册' })
    return
  }

  if (waitingUserExists) {
    res.status(400).json({ message: '用户已在等候名单中' })
    return
  }

  // 在等待名单中创建新用户
  const user = await Waitinglist.create({
    name,
    email,
    password,
    dateOfBirth,
    gender,
    address,
    postalCode
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: '用户已添加到等待名单'
    })
  } else {
    res.status(400).json({ message: '无法创建用户' })
  }
})




//@desc    用户身份验证 & 获取Token
//@route   POST/api/users/login
//@access  公开
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const staff = await Staff.findOne({ email })


  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else if (staff && (await staff.matchPassword(password))) { // Use else if to separate the checks
    res.json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      position: staff.position,
      department: staff.department,
      token: generateToken(staff._id),
    })
  } else {
    res.status(401).json({ message: '邮箱或者密码无效' }) // Send a 401 response only if both checks fail
  }





}

)


//@desc    获取登录成功的用户详情
//@route   GET/api/users/profile
//@access  私密
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     })
//   } else {
//     res.status(404)
//     throw new Error('用户不存在')
//   }
// })


//@desc    更新用户个人资料
//@route   PUT/api/users/profile
//@access  私密
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   //获取更新后的资料
//   if (user) {
//     user.name = req.body.name || user.name
//     user.email = req.body.email || user.email
//     if (req.body.password) {
//       user.password = req.body.password
//     }
//     const updateUser = await user.save()
//     //返回更新后的用户信息
//     res.json({
//       _id: updateUser._id,
//       name: updateUser.name,
//       email: updateUser.email,
//       isAdmin: updateUser.isAdmin,
//       token: generateToken(updateUser._id),
//     })
//   } else {
//     res.status(404)
//     throw new Error('用户不存在')
//   }
// })



//@desc    获取所有注册用户
//@route   GET/api/users
//@access  私密(仅限管理员)
// const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({})
//   res.json(users)
// })


//@desc    删除注册用户
//@route   DELETE/api/users/:id
//@access  私密(仅限管理员)
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)
//   if (user) {
//     await User.findByIdAndDelete(req.params.id)
//     res.json({ message: '用户已删除' })
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

//@desc    获取单个用户信息
//@route   GET/api/users/:id
//@access  私密(仅限管理员)
// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select('-password')
//   if (user) {
//     res.json(user)
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

//@desc    更新单个用户信息
//@route   PUT/api/users/:id
//@access  私密(仅限管理员)
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)
//   //获取更新后的资料
//   if (user) {
//     user.name = req.body.name || user.name
//     user.email = req.body.email || user.email
//     user.isAdmin = req.body.isAdmin
//     const updateUser = await user.save()
//     //返回更新后的用户信息
//     res.json({
//       _id: updateUser._id,
//       name: updateUser.name,
//       email: updateUser.email,
//       isAdmin: updateUser.isAdmin,
//     })
//   } else {
//     res.status(404)
//     throw new Error('用户不存在')
//   }
// })
export {
  registerUser,
  authUser,
  // getUserProfile,
  //updateUserProfile,
  // getUsers,
  // deleteUser,
  // getUserById,
  // updateUser,
}

