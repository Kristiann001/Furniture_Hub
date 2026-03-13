import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { useAdmin } from "./context/AdminContext";
import { Toaster } from "react-hot-toast";

// Customer pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Help from "./pages/Help";

// Admin pages
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import SoldItems from "./admin/SoldItems";
import AdminReviews from "./admin/AdminReviews";

// Theme + Floating Button
import { ThemeProvider } from "./context/ThemeContext";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

import "./assets/css/style.css";

// Guard wrapper for admin routes
const AdminRoute = ({ children }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <Router>
        <Toaster position="top-center" />
        <Routes>
          {/* ── Public / Customer routes ── */}
          <Route path="/" element={<><Home /><FloatingWhatsApp /></>} />
          <Route path="/products" element={<><Products /><FloatingWhatsApp /></>} />
          <Route path="/about" element={<><About /><FloatingWhatsApp /></>} />
          <Route path="/contact" element={<><Contact /><FloatingWhatsApp /></>} />
          <Route path="/help" element={<><Help /><FloatingWhatsApp /></>} />
          <Route path="/product/:id" element={<><ProductDetail /><FloatingWhatsApp /></>} />

          {/* ── Admin routes (password-protected) ── */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="sold-items" element={<SoldItems />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AdminProvider>
  </ThemeProvider>
  );
}

export default App;
