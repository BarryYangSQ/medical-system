import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo, message: waitMessage } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.message) // 使用 userInfo 中的 message 更新本地状态
      // 如果需要的话，可以在这里弹出 alert
      alert(userInfo.message)
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('密码不匹配')
    } else {
      // 确保所有字段都传递到 register action

      dispatch(register(name, email, password, dateOfBirth, gender, address, postalCode))
    }
  }



  return (
    <FormContainer>
      <h1>注册</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>姓名：</Form.Label>
          <Form.Control
            type='name'
            placeholder='请输入姓名'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>邮箱地址：</Form.Label>
          <Form.Control
            type='email'
            placeholder='请输入邮箱'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>密码：</Form.Label>
          <Form.Control
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>确认密码：</Form.Label>
          <Form.Control
            type='password'
            placeholder='请确认密码'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='dateOfBirth'>
          <Form.Label>出生日期：</Form.Label>
          <Form.Control
            type='date' // 注意这里使用了 date 类型
            placeholder='请选择日期'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='gender'>
          <Form.Label>性别：</Form.Label>
          <Form.Control
            as='select' // 下拉选择框
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value=''>选择性别</option>
            <option value='male'>男</option>
            <option value='female'>女</option>
            <option value='other'>其他</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label>地址：</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入地址'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>邮政编码：</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入邮政编码'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          注册
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          已有账户？
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            去登录
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen