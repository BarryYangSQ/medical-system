import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup, Row, Col, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrdersByStaffId } from '../actions/staffAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const StaOrderListScreen = () => {
  const { id: staffId } = useParams()
  const dispatch = useDispatch()
  const staffOrders = useSelector(state => state.staffOrders)
  const { loading, error, orders } = staffOrders

  useEffect(() => {
    if (staffId) {
      dispatch(fetchOrdersByStaffId(staffId))
    }
  }, [dispatch, staffId])

  const getStatusMessage = (status) => {
    switch (status) {
      case 'Scheduled':
        return { variant: 'info', message: 'Scheduled' }
      case 'Completed':
        return { variant: 'success', message: 'Completed' }
      case 'Cancelled':
        return { variant: 'danger', message: 'Cancelled' }
      case 'No Show':
        return { variant: 'warning', message: 'No Show' }
      default:
        return { variant: 'secondary', message: 'Unknown' }
    }
  }

  return (
    <div>
      <h1 className="text-center">Staff Orders for {staffId}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="justify-content-center">
          <Col md={10}>
            <ListGroup variant="flush">
              {orders.map(order => (
                <ListGroup.Item key={order._id} className="p-3">
                  <Card className="mb-3 shadow">
                    <Card.Header as="h4" className="text-center bg-primary text-white">
                      Order ID: {order._id}
                    </Card.Header>
                    <Card.Body>
                      {order.orderItems.length > 0 ? (
                        order.orderItems.map((item, index) => (
                          <Card className="mb-2" key={index}>
                            <Card.Body>
                              <Row className="align-items-center">
                                <Col md={4}>
                                  <div>
                                    <p><strong>User ID:</strong> {order.user}</p>
                                    <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                    <p><strong>Slot:</strong> {item.slot}</p>
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <p><strong>Illness Description:</strong> {order.illnessDescription}</p>
                                </Col>
                                <Col md={4}>
                                  <Message {...getStatusMessage(item.status)}>
                                    {getStatusMessage(item.status).message}
                                  </Message>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <Message variant="info">No appointment requests found.</Message>
                      )}
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

        </Row>
      )}
    </div>
  )
}

export default StaOrderListScreen
