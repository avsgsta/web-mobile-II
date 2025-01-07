// src/App.js

import './App.scss';
// react router dom
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// pages
import { Home, MealDetails, Error, Category } from "./pages"; 
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminDashboard from './components/login/admin';
import LoginForm from './components/login/login';

// Komponen App utama
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

// Komponen yang menangani routing dan pengecekan Header & Sidebar
function AppRoutes() {
  const location = useLocation();

  // Cek apakah berada di halaman admin, jika ya, sembunyikan Header dan Sidebar
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      {/* Tampilkan Header dan Sidebar hanya jika bukan halaman admin */}
      {!isAdminPage && (
        <>
          <Header />
          <Sidebar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/meal/category/:name" element={<Category />} />
        
        {/* Route untuk Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Route untuk Login */}
        <Route path="/login" element={<LoginForm />} />
        
        {/* Route untuk halaman error */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
