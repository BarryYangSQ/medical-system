import express from 'express'
import { getStaffById, getStaffs } from '../controllers/staffController.js'
const router = express.Router()

router.route('/').get(getStaffs)
router.route('/:id').get(getStaffById)


export default router