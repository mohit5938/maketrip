import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { ToastContainer} from 'react-toastify';
import Trips from "./pages/Trips.jsx";
import TripDetails from "./pages/TripDetails.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import MyTrips from "./pages/MyTrip.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthModal from "./components/AuthModal.jsx"
import Profile from "./pages/Profile.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import BecomeHost from "./components/host/BecomeHost.jsx";
import AdminProtectedRoute from "./components/OnlyAdminAllowed.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import { PendingTrips } from "./pages/admin/PendingTrips.jsx";
import User from "./pages/admin/User.jsx";
import JoinTrip from "./pages/JoinTrip.jsx";
import {PendingHosts} from "./pages/admin/PendingHosts.jsx";
import PaymentPage from "./pages/payment/PaymentPage.jsx"
import HostDashboard from "./pages/host/HostDashboard.jsx";
import Booking from "./pages/admin/Booking.jsx";
import Payments from "./pages/admin/Payments.jsx";
import Settings from "./pages/admin/Settings.jsx";
import Wishlist from "./pages/Wishlist.jsx";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route
          path="/become-host"
          element={
            <ProtectedRoute>
              <BecomeHost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/host/dashboard"
          element={
            <ProtectedRoute>
              <HostDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join-trip/:tripId"
          element={
            <ProtectedRoute>
              <JoinTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-trips"
          element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:bookingId"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
        >
          <Route index element={<Dashboard />} />
          <Route path="pending-trips" element={<PendingTrips />} />
          <Route path="pending-hosts" element={<PendingHosts />} />
          <Route path="users" element={<User />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
      </Route>

          </Routes>
      < AuthModal/>
    </BrowserRouter>
  );
}

export default App;