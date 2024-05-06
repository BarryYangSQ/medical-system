import {
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  STAFF_DETAILS_FAIL,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_SUCCESS,
  STAFF_LIST_FAIL,
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS
} from "../contents/staffContents"

//初始状态
const initialState = {
  loading: false,
  orders: [],
  error: null,
}

//获取所有职工（医生、见习医生）的reducer
export const staffListReducer = (state = { staffs: [] }, action) => {
  switch (action.type) {
    case STAFF_LIST_REQUEST:
      return { loading: true, staffs: [] }
    case STAFF_LIST_SUCCESS:
      return { loading: false, staffs: action.payload }
    case STAFF_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


//获取单个医生的reducer
export const staffDetailsReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case STAFF_DETAILS_REQUEST:
      return { loading: true, ...state }
    case STAFF_DETAILS_SUCCESS:
      return { loading: false, staff: action.payload }
    case STAFF_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//获取医生对应的order
export const staffOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload }
    case FETCH_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}