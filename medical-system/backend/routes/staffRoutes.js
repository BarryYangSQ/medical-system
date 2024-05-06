import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getOrderByStaffId,
  getStaffById,
  getStaffs
} from '../controllers/staffController.js'
const router = express.Router()

router.route('/').get(getStaffs)
router.route('/:id').get(getStaffById)
router.route('/orders/:id').get(protect, getOrderByStaffId)



export default router