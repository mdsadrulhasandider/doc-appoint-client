import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import AllAppointments from './pages/AllAppointments';
import DoctorDetails from './pages/DoctorDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Dashboard Nested Pages
import Dashboard from './pages/Dashboard/Dashboard';
import MyBookings from './pages/Dashboard/MyBookings';
import MyProfile from './pages/Dashboard/MyProfile';

// Layout Component to render Navbar, Content Outlet, and Footer
const RootLayout = () => {
    const location = useLocation();

    // Challenge Task: Dynamic Page Titles & SEO Metadata
    useEffect(() => {
        const path = location.pathname;
        let title = 'DocAppoint - Doctor Appointment Manager';

        if (path === '/') {
            title = 'DocAppoint - Book Appointments with Premium Specialists';
        } else if (path.startsWith('/appointments')) {
            title = 'Book Appointments | DocAppoint';
        } else if (path.startsWith('/doctor/')) {
            title = 'Doctor Profile & Booking | DocAppoint';
        } else if (path === '/login') {
            title = 'Account Login | DocAppoint';
        } else if (path === '/register') {
            title = 'Register Account | DocAppoint';
        } else if (path.startsWith('/dashboard/my-bookings')) {
            title = 'My Booked Appointments | DocAppoint';
        } else if (path.startsWith('/dashboard/profile')) {
            title = 'My Patient Profile | DocAppoint';
        } else if (path.startsWith('/dashboard')) {
            title = 'Patient Dashboard | DocAppoint';
        } else {
            title = '404 - Record Not Found | DocAppoint';
        }

        document.title = title;
    }, [location]);

    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content transition-all duration-300">
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Root Application Layout */}
                        <Route path="/" element={<RootLayout />}>
                            {/* Public Pages */}
                            <Route index element={<Home />} />
                            <Route path="appointments" element={<AllAppointments />} />
                            
                            {/* Private Doctor Profile (requires login, locks details) */}
                            <Route 
                                path="doctor/:id" 
                                element={
                                    <PrivateRoute>
                                        <DoctorDetails />
                                    </PrivateRoute>
                                } 
                            />
                            
                            {/* Auth Forms */}
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            
                            {/* Private Dashboard Area (Nested Router) */}
                            <Route 
                                path="dashboard" 
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            >
                                <Route path="my-bookings" element={<MyBookings />} />
                                <Route path="profile" element={<MyProfile />} />
                            </Route>

                            {/* Catch-All 404 Medically-Branded Page */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Router>

                {/* Rich Toast Notification Handler */}
                <Toaster 
                    position="top-center" 
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3500,
                        style: {
                            background: '#1e293b',
                            color: '#fff',
                            borderRadius: '12px',
                            fontFamily: 'sans-serif',
                            fontSize: '13px',
                            fontWeight: '600'
                        },
                        success: {
                            theme: {
                                primary: '#0ea5e9'
                            }
                        }
                    }}
                />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
