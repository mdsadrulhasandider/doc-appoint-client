import React, { useContext } from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    // If exactly hitting '/dashboard', redirect to '/dashboard/my-bookings'
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
        return <Navigate to="/dashboard/my-bookings" replace />;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* ================= SIDEBAR NAVIGATION ================= */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Card */}
                    <div className="bg-base-100 border border-base-content/10 rounded-2xl p-6 shadow-sm text-center lg:text-left space-y-4">
                        <div className="avatar flex justify-center lg:justify-start">
                            <div className="w-16 h-16 rounded-full border-2 border-primary bg-slate-100">
                                <img 
                                    src={user?.photoURL} 
                                    alt={user?.name} 
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100";
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-extrabold text-base-content font-sans truncate">{user?.name}</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{user?.email}</p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="bg-base-100 border border-base-content/10 rounded-2xl p-4 shadow-sm">
                        <ul className="menu w-full p-0 gap-2">
                            <li>
                                <NavLink 
                                    to="/dashboard/my-bookings"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 font-semibold text-sm rounded-xl py-3 px-4 transition-all ${isActive ? 'bg-primary text-white shadow' : 'hover:bg-base-200 text-slate-500 hover:text-base-content'}`
                                    }
                                >
                                    <FiCalendar className="h-5 w-5 shrink-0" />
                                    <span>My Bookings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/profile"
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 font-semibold text-sm rounded-xl py-3 px-4 transition-all ${isActive ? 'bg-primary text-white shadow' : 'hover:bg-base-200 text-slate-500 hover:text-base-content'}`
                                    }
                                >
                                    <FiUser className="h-5 w-5 shrink-0" />
                                    <span>My Profile</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Link back to Doctors */}
                    <div className="text-center lg:text-left">
                        <NavLink to="/appointments" className="btn btn-ghost btn-sm rounded-xl text-primary font-bold text-xs flex items-center gap-1.5 justify-center lg:justify-start hover:bg-primary/5">
                            <FiArrowLeft /> Back to Doctors
                        </NavLink>
                    </div>
                </div>

                {/* ================= SUBPAGE DYNAMIC CONTENT ================= */}
                <div className="lg:col-span-3 bg-base-100 border border-base-content/10 rounded-2xl p-6 md:p-8 shadow-sm min-h-[400px]">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
