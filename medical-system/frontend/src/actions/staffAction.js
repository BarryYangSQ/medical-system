import axios from 'axios'
import {
  STAFF_DETAILS_FAIL,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_SUCCESS,
  STAFF_LIST_FAIL,
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS
} from '../contents/staffContents'

//获取所有医生的action
export const listStaffs = () => async (dispatch) => {
  try {
    dispatch({ type: STAFF_LIST_REQUEST })
    const { data } = await axios.get('/api/staffs')

    dispatch({ type: STAFF_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: STAFF_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//获取单个医生的action
export const listStaffDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/staffs/${id}`)

    dispatch({ type: STAFF_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: STAFF_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}