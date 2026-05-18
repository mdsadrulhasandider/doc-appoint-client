import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4 md:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 text-white">
                            <div className="p-2 bg-primary/20 rounded-xl text-primary">
                                <FiHeart className="h-6 w-6 stroke-[2.5]" />
                            </div>
                            <span className="font-extrabold text-2xl font-sans tracking-tight">
                                Doc<span className="text-primary">Appoint</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            Connecting patients with top-rated medical specialists. Book appointments securely and manage your health seamlessly all in one place.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-4">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link></li>
                            <li><Link to="/appointments" className="hover:text-primary transition-colors duration-200">All Doctors</Link></li>
                            <li><Link to="/login" className="hover:text-primary transition-colors duration-200">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Social Medias */}
                    <div>
                        <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-4">Connect with us</h4>
                        <div className="flex space-x-4 mb-4">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
                                <FaFacebook className="h-5 w-5" />
                            </a>
                            {/* Modern X Logo Custom SVG Path */}
                            <a href="https://x.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 rounded-xl hover:bg-primary hover:text-white transition-all duration-300" title="Follow us on X (Twitter)">
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
                                <FaLinkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
                    <p>&copy; {new Date().getFullYear()} DocAppoint. All rights reserved.</p>
                    <p className="flex items-center space-x-1">
                        <span>Built for excellence with</span>
                        <FiHeart className="h-3 w-3 text-red-500 fill-current" />
                        <span>for a healthier life.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
