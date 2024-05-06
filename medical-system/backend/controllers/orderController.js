import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'



//@desc    创建预约订单
//@route   POST/api/orders
//@access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    preAppointmentItems,
    illnessDescription,
  } = req.body

  if (!preAppointmentItems || preAppointmentItems.length === 0) {
    res.status(400)
    throw new Error('没有预约信息。')
  }

  // 映射预约项目以创建订单项
  const appointmentItems = preAppointmentItems.map(item => ({
    staff: item.staff,
    date: item.date,
    slot: item.slot,


  }))

  if (!req.user) {
    res.status(401)
    throw new Error('未授权，未找到用户')
  } else {
    const order = new Order({
      user: req.user._id, // req.user 由身份验证中间件提供
      orderItems: appointmentItems,
      illnessDescription,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})



//@desc    依据订单id获取订单
//@route   GET/api/orders/:id
//@access  私密
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email') // 已存在的填充
    .populate('orderItems.staff', 'name image position department')


  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('查询不到')
  }
})

export { addOrderItems, getOrderById }