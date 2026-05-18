import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

// Swiper Slider imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FiArrowRight, FiActivity, FiShield, FiHeart, FiClock, FiStar, FiCalendar } from 'react-icons/fi';

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [topDoctors, setTopDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopDoctors = async () => {
            try {
                const response = await axios.get('/doctors/top');
                setTopDoctors(response.data);
            } catch (error) {
                console.error("Error fetching top doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopDoctors();
    }, []);

    const handleViewDetails = (docId) => {
        if (user) {
            navigate(`/doctor/${docId}`);
        } else {
            navigate('/login');
        }
    };

    const specialties = [
        { name: 'Cardiology', icon: <FiActivity className="h-6 w-6 text-red-500" />, desc: 'Heart and circulatory treatments' },
        { name: 'Neurology', icon: <FiActivity className="h-6 w-6 text-indigo-500" />, desc: 'Brain and nervous system care' },
        { name: 'Pediatrics', icon: <FiActivity className="h-6 w-6 text-amber-500" />, desc: 'Specialized healthcare for kids' },
        { name: 'Orthopedic', icon: <FiActivity className="h-6 w-6 text-green-500" />, desc: 'Bone and joint care specialist' },
        { name: 'Gynecology', icon: <FiActivity className="h-6 w-6 text-pink-500" />, desc: 'Women health and wellness' },
        { name: 'Dermatology', icon: <FiActivity className="h-6 w-6 text-purple-500" />, desc: 'Skincare and anti-aging treatments' }
    ];

    return (
        <div className="space-y-16 pb-16 transition-all duration-300">
            
            {/* ================= HERO BANNER SECTION (WITH SWIPER) ================= */}
            <section className="relative overflow-hidden w-full bg-slate-900 text-white">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    className="w-full min-h-[500px] md:min-h-[600px] flex items-center"
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div 
                            className="w-full min-h-[500px] md:min-h-[600px] bg-cover bg-center flex items-center" 
                            style={{ 
                                backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.3)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200')` 
                            }}
                        >
                            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full space-y-6">
                                <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
                                    🏥 Instant Appointments
                                </span>
                                <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight max-w-2xl leading-[1.1]">
                                    Your Health is Our <span className="text-primary">First Priority</span>
                                </h1>
                                <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed">
                                    Browse experienced medical specialists, view schedules in real time, and book your secure slot in just a few clicks.
                                </p>
                                <div className="flex gap-4 pt-2">
                                    <Link to="/appointments" className="btn btn-primary rounded-xl text-white font-semibold flex items-center gap-2 px-6 shadow-lg shadow-primary/20">
                                        Find Doctors <FiArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide>
                        <div 
                            className="w-full min-h-[500px] md:min-h-[600px] bg-cover bg-center flex items-center" 
                            style={{ 
                                backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.3)), url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200')` 
                            }}
                        >
                            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full space-y-6">
                                <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    🤝 Certified Doctors
                                </span>
                                <h1 className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight max-w-2xl leading-[1.1]">
                                    Consulting with <span className="text-primary">Top Specialists</span>
                                </h1>
                                <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed">
                                    We verify every doctor to ensure premium healthcare for you and your family. Experienced practitioners in cardiology, neurology, and pediatrics.
                                </p>
                                <div className="flex gap-4 pt-2">
                                    <Link to="/appointments" className="btn bg-indigo-600 hover:bg-indigo-700 border-none rounded-xl text-white font-semibold flex items-center gap-2 px-6 shadow-lg shadow-indigo-600/20">
                                        Browse Specialties <FiArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            {/* ================= SPECIALTIES SECTION (CUSTOM SECTION 1) ================= */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-base-content">
                        Explore Medical <span className="text-primary">Specialties</span>
                    </h2>
                    <p className="text-sm text-slate-500">
                        Find experienced professionals categorized by symptoms and healthcare fields.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialties.map((spec, index) => (
                        <div 
                            key={index}
                            className="p-6 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex items-start space-x-4 cursor-pointer"
                            onClick={() => navigate(`/appointments?search=${spec.name}`)}
                        >
                            <div className="p-3 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors duration-300 text-primary">
                                {spec.icon}
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-base-content group-hover:text-primary transition-colors duration-300 font-sans">
                                    {spec.name}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {spec.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= TOP RATED DOCTORS SECTION ================= */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-base-content">
                            Top Rated <span className="text-primary">Medical Specialists</span>
                        </h2>
                        <p className="text-sm text-slate-500">
                            Book appointments with our highest-recommended, certified doctors.
                        </p>
                    </div>
                    <Link to="/appointments" className="btn btn-ghost rounded-xl text-primary font-bold text-sm flex items-center gap-2 hover:bg-primary/5">
                        View All Doctors <FiArrowRight />
                    </Link>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {topDoctors.map((doc) => (
                            <div 
                                key={doc.id || doc._id}
                                className="card bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <figure className="relative h-64 overflow-hidden">
                                    <img 
                                        src={doc.image} 
                                        alt={doc.name} 
                                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                    />
                                    <span className="absolute top-4 right-4 bg-amber-400 text-slate-900 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-md">
                                        <FiStar className="fill-current h-3.5 w-3.5" /> {doc.rating || '4.8'}
                                    </span>
                                </figure>
                                <div className="card-body p-6 space-y-4">
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                                            {doc.specialty}
                                        </span>
                                        <h3 className="card-title font-extrabold font-sans text-lg text-base-content mt-1">
                                            {doc.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-semibold">
                                            🏥 {doc.hospital}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 border-t border-b border-base-200 py-3 text-xs font-semibold text-slate-500">
                                        <div>
                                            <span className="block text-[10px] uppercase text-slate-400 font-bold">Experience</span>
                                            <span className="text-base-content">{doc.experience}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-[10px] uppercase text-slate-400 font-bold">Consultation Fee</span>
                                            <span className="text-primary font-bold text-sm">৳{doc.fee}</span>
                                        </div>
                                    </div>

                                    <div className="card-actions">
                                        <button 
                                            onClick={() => handleViewDetails(doc.id || doc._id)}
                                            className="btn btn-block bg-indigo-600 hover:bg-indigo-700 border-none text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/10 transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ================= INTERACTIVE STATS SECTION (CUSTOM SECTION 2) ================= */}
            <section className="bg-gradient-to-br from-primary/10 via-base-100 to-primary/5 py-16 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column: text */}
                    <div className="space-y-6">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Why Choose DocAppoint</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight text-base-content leading-tight">
                            Providing the Best <span className="text-primary">Medical Experience</span>
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            We bridge the gap between doctor and patient, enabling transparent scheduling, professional ratings, and immediate bookings, ensuring medical treatments are accessible without long wait times.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><FiClock className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-extrabold text-base-content">24/7 Support</h4>
                                    <p className="text-xs text-slate-400">Emergency support anytime</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><FiShield className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-extrabold text-base-content">Secure Data</h4>
                                    <p className="text-xs text-slate-400">Encrypted JWT bookings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Statistics Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-8 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
                            <h3 className="text-4xl font-extrabold text-primary font-sans">15k+</h3>
                            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Happy Patients</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
                            <h3 className="text-4xl font-extrabold text-indigo-600 font-sans">150+</h3>
                            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Certified Doctors</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
                            <h3 className="text-4xl font-extrabold text-amber-500 font-sans">99.8%</h3>
                            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Success Rate</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
                            <h3 className="text-4xl font-extrabold text-green-500 font-sans">10+</h3>
                            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Years Experience</p>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Home;
