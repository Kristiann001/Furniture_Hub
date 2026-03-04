import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { useAdmin } from "./context/AdminContext";

// Customer pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

// Admin pages
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";

import "./assets/css/style.css";

// Guard wrapper for admin routes
const AdminRoute = ({ children }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          {/* ── Public / Customer routes ── */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />

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
          </Route>

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
