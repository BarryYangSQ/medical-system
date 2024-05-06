import asyncHandler from 'express-async-handler'
import Staff from '../models/staffModel.js'

//@desc    请求所有医生
//@route   GET/api/staffs
//@access  公开
const getStaffs = asyncHandler(async (req, res) => {
  const staffs = await Staff.find({})
  res.json(staffs)
})

//@desc    请求单个医生
//@route   GET/api/staffs/:id
//@access  公开
const getStaffById = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id)
  if (staff) {
    res.json(staff)
  } else {
    res.status(404)
    throw new Error('查询不到产品')
  }
})
export { getStaffs, getStaffById }