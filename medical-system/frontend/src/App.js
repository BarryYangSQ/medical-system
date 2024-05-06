import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import StaffScreen from "./screens/StaffScreen"
import LoginScreen from "./screens/LoginScreeen"
import RegisterScreen from "./screens/RegisterScreen"
import PreAppointScren from "./screens/PreAppointScreen"
import OrderScreen from "./screens/OrderScreen"
import StaOrderListScreen from "./screens/StaOrderListScreen"



function App () {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path="/staffs/:id" element={<StaffScreen />} />
            <Route path="/preappointment/:id?" element={<PreAppointScren />} />
            <Route path='/orders/:id?' element={<OrderScreen />} />
            <Route path="/staffs/orders/:id" element={<StaOrderListScreen />} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
