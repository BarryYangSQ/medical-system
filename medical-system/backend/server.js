import express from 'express'//引入express框架 创建服务器
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import colors from 'colors'
import connectDB from './config/db.js'
import staffRoutes from './routes/staffRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('server is running ...')
})
app.use('/api/staffs', staffRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server is running under ${process.env.NODE_ENV} model${PORT}pot`.yellow.bold
  )
)