import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import BookingModal from '../components/BookingModal';
import { FiStar, FiCalendar, FiMapPin, FiCompass, FiShield, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const DoctorDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Review states (Dynamic local reviews per doctor)
    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`/doctors/${id}`);
                setDoctor(response.data);
            } catch (error) {
                console.error("Error fetching doctor:", error);
                toast.error("Failed to load doctor profile");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    // Load and seed reviews from localStorage on mount
    useEffect(() => {
        const storedReviews = localStorage.getItem(`reviews_${id}`);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        } else {
            // Seed a couple of high-quality default reviews to show the feature off immediately
            const seedReviews = [
                {
                    author: "Mustafizur Rahman",
                    rating: 5,
                    comment: "Excellent experience. The doctor was very patient, listened carefully to my symptoms, and prescribed highly effective medicine. Strongly recommended!",
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
                },
                {
                    author: "Sabrina Yasmin",
                    rating: 4,
                    comment: "Very professional and friendly. The waiting time was a bit longer but the consultation was top-tier. Clean hospital facilities.",
                    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toLocaleDateString()
                }
            ];
            setReviews(seedReviews);
            localStorage.setItem(`reviews_${id}`, JSON.stringify(seedReviews));
        }
    }, [id]);

    const handleAddReview = (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            toast.error("Please type a comment before submitting");
            return;
        }

        const newReviewObj = {
            author: user?.name || "Anonymous Patient",
            rating: Number(newRating),
            comment: newComment,
            date: new Date().toLocaleDateString()
        };

        const updatedReviews = [newReviewObj, ...reviews];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
        
        toast.success("Review submitted successfully!");
        setNewComment('');
        setNewRating(5);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <LoadingSpinner />
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-lg font-bold text-slate-500">Doctor Profile Not Found</p>
                <Link to="/appointments" className="btn btn-primary rounded-xl text-white">Back to Doctors</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-12 transition-all duration-300">
            
            {/* Top Back Link */}
            <div>
                <Link to="/appointments" className="text-sm font-bold text-primary hover:underline">
                    &larr; Back to all doctors
                </Link>
            </div>

            {/* ================= DOCTOR DETAILED CARD ================= */}
            <div className="card lg:card-side bg-base-100 border border-base-content/10 shadow-sm rounded-2xl overflow-hidden">
                <figure className="lg:w-1/3 bg-slate-100 relative min-h-[350px]">
                    <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-full object-cover object-top"
                    />
                </figure>
                
                <div className="card-body lg:w-2/3 p-8 justify-between space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded">
                                {doctor.specialty}
                            </span>
                            <h1 className="text-3xl font-extrabold font-sans text-base-content tracking-tight mt-2">
                                {doctor.name}
                            </h1>
                            <p className="text-sm text-slate-500 font-semibold flex items-center gap-1">
                                <FiStar className="text-amber-400 fill-current" /> {doctor.rating || '4.9'} ({reviews.length} Patient Reviews)
                            </p>
                        </div>

                        <p className="text-sm text-slate-500 leading-relaxed">
                            {doctor.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-500 pt-2">
                            <div className="flex items-center space-x-2 bg-base-200 p-3 rounded-xl">
                                <FiShield className="h-5 w-5 text-primary" />
                                <div>
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Affiliated Hospital</span>
                                    <span className="text-base-content">{doctor.hospital}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-base-200 p-3 rounded-xl">
                                <FiMapPin className="h-5 w-5 text-indigo-500" />
                                <div>
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Chamber Location</span>
                                    <span className="text-base-content">{doctor.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-base-200 p-3 rounded-xl">
                                <FiCompass className="h-5 w-5 text-green-500" />
                                <div>
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Clinical Experience</span>
                                    <span className="text-base-content">{doctor.experience}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-base-200 p-3 rounded-xl">
                                <FiCalendar className="h-5 w-5 text-amber-500" />
                                <div>
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Availability</span>
                                    <span className="text-base-content truncate block">
                                        {(doctor.availability && doctor.availability.length > 0) ? doctor.availability.join(', ') : '09:00 AM - 12:00 PM, 04:00 PM - 07:00 PM'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-base-200">
                        <div className="text-center sm:text-left">
                            <span className="block text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Consultation Fee</span>
                            <span className="text-3xl font-extrabold text-primary font-sans">৳{doctor.fee}</span>
                        </div>
                        <button 
                            onClick={() => {
                                if (!user) {
                                    toast.error('Please login first to book an appointment!', { icon: '🔒' });
                                    navigate('/login', { state: { from: { pathname: `/doctor/${id}` } } });
                                } else {
                                    setIsModalOpen(true);
                                }
                            }}
                            className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white font-semibold rounded-xl px-12 shadow-lg shadow-indigo-600/10 w-full sm:w-auto"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= REVIEWS SECTION (CHALLENGE FEATURE) ================= */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Review Form (Left column on large screens) */}
                <div className="lg:col-span-1 bg-base-100 p-6 rounded-2xl border border-base-content/10 shadow-sm h-fit">
                    <h3 className="text-lg font-bold font-sans text-base-content mb-4">Add a Patient Review</h3>
                    <form onSubmit={handleAddReview} className="space-y-4">
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs">Rating Score</span>
                            </label>
                            <select 
                                value={newRating}
                                onChange={(e) => setNewRating(Number(e.target.value))}
                                className="select select-bordered w-full text-sm focus:select-primary"
                            >
                                <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                                <option value="4">⭐⭐⭐⭐ Good (4/5)</option>
                                <option value="3">⭐⭐⭐ Average (3/5)</option>
                                <option value="2">⭐⭐ Fair (2/5)</option>
                                <option value="1">⭐ Poor (1/5)</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs">Write Feedback</span>
                            </label>
                            <textarea 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="textarea textarea-bordered w-full text-sm focus:textarea-primary h-28 leading-relaxed"
                                placeholder="Describe your consultation experience..."
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                            Submit Review <FiSend />
                        </button>
                    </form>
                </div>

                {/* Reviews Feed (Right columns on large screens) */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold font-sans text-base-content flex items-center gap-2">
                        Patient Feedback <span className="badge badge-primary text-white font-bold">{reviews.length}</span>
                    </h3>
                    
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {reviews.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">No reviews submitted yet for this doctor.</p>
                        ) : (
                            reviews.map((rev, index) => (
                                <div key={index} className="p-5 rounded-2xl bg-base-200 border border-base-content/5 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-base-content text-sm">{rev.author}</h4>
                                            <p className="text-[10px] text-slate-400 font-semibold">{rev.date}</p>
                                        </div>
                                        <div className="flex text-amber-400 text-xs">
                                            {Array.from({ length: rev.rating }).map((_, i) => (
                                                <FiStar key={i} className="fill-current" />
                                            ))}
                                            {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                                                <FiStar key={i} className="text-slate-300" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        "{rev.comment}"
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </section>

            {/* ================= APPOINTMENT BOOKING MODAL ================= */}
            {isModalOpen && (
                <BookingModal 
                    doctor={doctor} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}

        </div>
    );
};

export default DoctorDetails;
