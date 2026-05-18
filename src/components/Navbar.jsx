import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success('Successfully logged out!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Logout failed');
        }
    };

    const navLinks = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `font-medium tracking-wide text-sm transition-all duration-300 ${isActive ? 'text-primary bg-primary/10 font-bold' : 'hover:text-primary hover:bg-primary/5'}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/appointments" 
                    className={({ isActive }) => 
                        `font-medium tracking-wide text-sm transition-all duration-300 ${isActive ? 'text-primary bg-primary/10 font-bold' : 'hover:text-primary hover:bg-primary/5'}`
                    }
                >
                    All Appointments
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink 
                        to="/dashboard" 
                        className={({ isActive }) => 
                            `font-medium tracking-wide text-sm transition-all duration-300 ${isActive ? 'text-primary bg-primary/10 font-bold' : 'hover:text-primary hover:bg-primary/5'}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-base-100/80 border-b border-base-content/10 transition-all duration-300">
            <div className="navbar max-w-7xl mx-auto px-4 md:px-8">
                {/* Mobile Burger Menu & Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden mr-2 p-1">
                            <FiMenu className="h-6 w-6" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-content/10">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center space-x-2 text-primary">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <FiHeart className="h-6 w-6 stroke-[2.5]" />
                        </div>
                        <span className="font-extrabold text-xl md:text-2xl font-sans tracking-tight text-base-content">
                            Doc<span className="text-primary">Appoint</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {navLinks}
                    </ul>
                </div>

                {/* Navbar End Controls */}
                <div className="navbar-end gap-3 md:gap-4">
                    {/* Theme Toggle Button */}
                    <button 
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-circle text-base-content transition-all duration-300 hover:bg-base-200"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? (
                            <FiSun className="h-5 w-5 text-amber-500 animate-spin-slow" />
                        ) : (
                            <FiMoon className="h-5 w-5 text-indigo-600" />
                        )}
                    </button>

                    {/* Authentication Status Buttons */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                                    <div className="w-10 rounded-full border-2 border-primary">
                                        <img 
                                            src={user.photoURL} 
                                            alt={user.name} 
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100";
                                            }}
                                        />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content mt-3 z-[50] p-4 shadow-xl bg-base-100 rounded-2xl w-60 border border-base-content/10 space-y-2">
                                    <div className="px-2 pb-2 border-b border-base-200 mb-1">
                                        <p className="font-extrabold text-base-content text-sm font-sans">{user.name}</p>
                                        <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{user.email}</p>
                                    </div>
                                    <li>
                                        <Link to="/dashboard/profile" className="block py-2 px-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">My Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/my-bookings" className="block py-2 px-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">My Bookings</Link>
                                    </li>
                                    <div className="pt-2 border-t border-base-200">
                                        <button onClick={handleLogout} className="w-full text-center py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                                            Logout
                                        </button>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="btn btn-ghost btn-sm md:btn-md font-semibold text-sm rounded-xl">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm md:btn-md text-white font-semibold text-sm rounded-xl shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
