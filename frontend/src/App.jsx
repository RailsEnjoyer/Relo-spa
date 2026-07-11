import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

import LandingPage from './pages/landing/LandingPage';
import GuestListingsPage from './pages/listings/GuestListingsPage';
import PlannerPage from './pages/planner/PlannerPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import DashboardPage from './pages/dashboard/DashboardPage';
import MainLayout from './components/MainLayout';
import FeaturedPage from './pages/featured/FeaturedPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<MainLayout/>}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guest/listings" element={<GuestListingsPage /> } />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/planner" element={<PlannerPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/featured" element={<FeaturedPage/>} />
        </Route>

        <Route path="*" element={
          <div className="not-found__default"><h2>404 - This page does not exists</h2></div>
        } />
      </Route>
    </Routes>
  );
}

export default App;
