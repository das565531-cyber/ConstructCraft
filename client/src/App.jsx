import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Builders from "./pages/Builders";
import Calculator from "./pages/Calculator";
import Marketplace from "./pages/Marketplace";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import MaterialRates from "./pages/MaterialRates";
import AIAssistant from "./pages/AIAssistant";
import Reviews from "./pages/Reviews";
import ProjectTracker from "./pages/ProjectTracker";
import Invoice from "./pages/Invoice";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/builders" element={<Builders />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile"element={<ProtectedRoute> <Profile /> </ProtectedRoute>}/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tracker"
          element={
            <ProtectedRoute>
              <ProjectTracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rates" element={<MaterialRates />} />
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/admin-orders" element={<AdminOrders />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;