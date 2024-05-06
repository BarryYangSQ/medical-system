import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  // USER_DETAILS_FAIL,
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_SUCCESS,
} from '../contents/userContents'
import axios from 'axios'

//用户登录Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })


    //设置传递的数据类型是jason类型
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    //本地存储信息
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//用户退出的action
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

// 用户注册 Action
export const register = (name, email, password, dateOfBirth, gender, address, postalCode) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = {
      name,
      email,
      password,
      dateOfBirth,
      gender,
      address,
      postalCode,
    }

    const { data } = await axios.post('/api/users', body, config)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
