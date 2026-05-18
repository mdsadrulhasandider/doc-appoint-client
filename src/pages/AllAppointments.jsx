import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiSearch, FiStar, FiChevronDown, FiAlertCircle } from 'react-icons/fi';

const AllAppointments = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Read and write URL search parameters (e.g., /appointments?search=Cardiology)
    const [searchParams, setSearchParams] = useSearchParams();
    const urlSearch = searchParams.get('search') || '';

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // UI input states
    const [searchText, setSearchText] = useState(urlSearch);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                // Hit Express API with search query and sort parameters
                const params = {};
                if (searchText) params.search = searchText;
                if (sortOption) params.sort = sortOption;

                const response = await axios.get('/doctors', { params });
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [searchText, sortOption]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Update URL search parameters
        if (searchText) {
            setSearchParams({ search: searchText });
        } else {
            setSearchParams({});
        }
    };

    const handleViewDetails = (docId) => {
        if (user) {
            navigate(`/doctor/${docId}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-10 min-h-[60vh] transition-all duration-300">
            
            {/* Header Title */}
            <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Available Specialists
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans text-base-content mt-2">
                    Book an <span className="text-primary">Appointment</span>
                </h1>
                <p className="text-sm text-slate-500">
                    Find and book trusted medical practitioners. Filter by specialty, name, or consultation fee.
                </p>
            </div>

            {/* ================= SEARCH & SORT FILTERS (CHALLENGES) ================= */}
            <div className="bg-base-200 p-4 md:p-6 rounded-2xl border border-base-content/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
                
                {/* Search Bar Form */}
                <form onSubmit={handleSearchSubmit} className="w-full md:max-w-md relative flex gap-2">
                    <div className="relative flex-grow">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <FiSearch className="h-5 w-5" />
                        </span>
                        <input 
                            type="text" 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="input input-bordered w-full pl-10 text-sm focus:input-primary rounded-xl bg-base-100 text-base-content"
                            placeholder="Search by doctor name or specialty..."
                        />
                    </div>
                    <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl font-bold text-sm px-6 transition-all shadow-sm">
                        Search
                    </button>
                </form>

                {/* Sort Option Dropdown */}
                <div className="w-full md:w-auto flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:inline">Sort by:</span>
                    <select 
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="select select-bordered w-full md:w-56 text-sm font-semibold focus:select-primary rounded-xl bg-base-100 text-base-content"
                    >
                        <option value="">Default (Featured)</option>
                        <option value="fee-asc">Fee: Low to High</option>
                        <option value="fee-desc">Fee: High to Low</option>
                        <option value="rating-desc">Rating: High to Low</option>
                    </select>
                </div>

            </div>

            {/* ================= DOCTORS GRID ================= */}
            {loading ? (
                <LoadingSpinner />
            ) : doctors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                    <div className="p-4 bg-red-500/10 rounded-full text-red-500">
                        <FiAlertCircle className="h-10 w-10" />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-lg text-base-content font-sans">No Medical Specialists Found</h3>
                        <p className="text-sm text-slate-500 mt-1 max-w-sm">
                            We couldn't find any doctor matching "{searchText}". Try clearing your search parameters.
                        </p>
                    </div>
                    <button 
                        onClick={() => { setSearchText(''); setSearchParams({}); }}
                        className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/5 rounded-xl"
                    >
                        Clear Search & Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doc) => (
                        <div 
                            key={doc.id || doc._id}
                            className="card bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                        >
                            <figure className="relative h-60 overflow-hidden bg-slate-100">
                                <img 
                                    src={doc.image} 
                                    alt={doc.name} 
                                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                />
                                <span className="absolute top-4 right-4 bg-amber-400 text-slate-900 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-md">
                                    <FiStar className="fill-current h-3.5 w-3.5" /> {doc.rating || '4.8'}
                                </span>
                            </figure>
                            
                            <div className="card-body p-6 flex flex-col justify-between flex-grow space-y-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        {doc.specialty}
                                    </span>
                                    <h3 className="card-title font-extrabold font-sans text-lg text-base-content mt-1">
                                        {doc.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                                        🏥 {doc.hospital}
                                    </p>
                                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                                        {doc.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
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
                                            className="btn btn-primary btn-block text-white rounded-xl font-semibold shadow-md shadow-primary/20 transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default AllAppointments;
