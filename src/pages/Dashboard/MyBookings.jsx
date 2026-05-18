import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiPhone, FiUser, FiEdit, FiTrash2, FiAlertCircle } from 'react-icons/fi';

const MyBookings = () => {
    const { user } = useContext(AuthContext);

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit Modal State
    const [activeEditBooking, setActiveEditBooking] = useState(null);
    const [editPatientName, setEditPatientName] = useState('');
    const [editGender, setEditGender] = useState('Male');
    const [editPhone, setEditPhone] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editTime, setEditTime] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching user bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    // ================= DELETE APPOINTMENT =================
    const handleDelete = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this doctor appointment?")) {
            return;
        }

        try {
            const response = await axios.delete(`/bookings/${bookingId}`);
            if (response.data.success) {
                // Instantly update UI by filtering out the deleted booking from React state (No refresh!)
                setBookings(prevBookings => prevBookings.filter(b => b._id !== bookingId));
                toast.success("Appointment deleted successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to cancel appointment");
        }
    };

    // ================= UPDATE APPOINTMENT (OPEN MODAL) =================
    const openEditModal = (booking) => {
        setActiveEditBooking(booking);
        setEditPatientName(booking.patientName);
        setEditGender(booking.gender || 'Male');
        setEditPhone(booking.phone || '');
        setEditDate(booking.appointmentDate || '');
        setEditTime(booking.appointmentTime || '');
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!editDate) {
            toast.error("Please select a date");
            return;
        }
        if (!editPhone) {
            toast.error("Phone number is required");
            return;
        }

        setUpdating(true);

        const updatedData = {
            patientName: editPatientName,
            gender: editGender,
            phone: editPhone,
            appointmentDate: editDate,
            appointmentTime: editTime
        };

        try {
            const response = await axios.put(`/bookings/${activeEditBooking._id}`, updatedData);
            if (response.data.success) {
                // Instantly update UI by mapping the active booking edits to state (No refresh!)
                setBookings(prevBookings => prevBookings.map(b => {
                    if (b._id === activeEditBooking._id) {
                        return { ...b, ...updatedData };
                    }
                    return b;
                }));

                toast.success("Appointment updated successfully!");
                setActiveEditBooking(null); // Close modal
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update appointment");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-6">
            
            {/* Title Section */}
            <div className="border-b border-base-200 pb-4">
                <h2 className="text-2xl font-extrabold font-sans text-base-content tracking-tight">My Bookings</h2>
                <p className="text-xs text-slate-400 mt-1">Manage and track your active consultations and clinical checkups.</p>
            </div>

            {/* Empty State */}
            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-base-200 rounded-2xl text-center space-y-4 border border-base-content/5">
                    <div className="p-4 bg-primary/10 rounded-full text-primary">
                        <FiAlertCircle className="h-8 w-8" />
                    </div>
                    <div>
                        <h4 className="font-extrabold text-base-content font-sans">No Appointments Scheduled</h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                            You don't have any booked appointments yet. Find your specialty and schedule a session!
                        </p>
                    </div>
                    <a href="/appointments" className="btn btn-primary btn-sm rounded-xl text-white font-semibold shadow shadow-primary/20">
                        Browse Doctors
                    </a>
                </div>
            ) : (
                /* Bookings List (Responsive Table / Mobile Card stack) */
                <div className="overflow-x-auto w-full">
                    
                    {/* Desktop/Tablet Table View */}
                    <table className="table table-zebra w-full hidden md:table border border-base-content/5 rounded-2xl overflow-hidden shadow-sm bg-base-100">
                        <thead className="bg-base-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th>Consultant</th>
                                <th>Patient Name</th>
                                <th>Schedule</th>
                                <th>Contact</th>
                                <th className="text-right">Consultation Fee</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-base-200/50 transition-colors">
                                    <td>
                                        <div className="font-bold text-base-content font-sans">{booking.doctorName}</div>
                                        <span className="badge badge-primary badge-outline badge-xs font-semibold py-1.5 px-2 mt-0.5">{booking.specialty}</span>
                                    </td>
                                    <td>
                                        <div className="font-semibold text-slate-700 dark:text-slate-300">{booking.patientName}</div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{booking.gender}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-600 dark:text-slate-400">
                                            <FiCalendar className="h-3.5 w-3.5 text-primary" /> {booking.appointmentDate}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold mt-0.5">
                                            <FiClock className="h-3 w-3 text-indigo-500" /> {booking.appointmentTime}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                                            <FiPhone className="h-3.5 w-3.5" /> {booking.phone}
                                        </div>
                                    </td>
                                    <td className="text-right font-extrabold text-primary">
                                        ৳{booking.fee || 800}
                                    </td>
                                    <td className="text-center">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => openEditModal(booking)}
                                                className="btn btn-ghost btn-xs text-indigo-600 hover:bg-indigo-600/10 p-1.5 rounded-lg"
                                                title="Reschedule Appointment"
                                            >
                                                <FiEdit className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(booking._id)}
                                                className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg"
                                                title="Cancel Appointment"
                                            >
                                                <FiTrash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile Stacked Card View */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="p-5 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-extrabold text-base-content font-sans">{booking.doctorName}</h4>
                                        <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded mt-1 inline-block">
                                            {booking.specialty}
                                        </span>
                                    </div>
                                    <span className="font-extrabold text-primary text-sm">৳{booking.fee || 800}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-base-200 py-3 text-slate-500 font-semibold">
                                    <div>
                                        <span className="block text-[10px] uppercase text-slate-400 font-bold">Patient</span>
                                        <span className="text-base-content">{booking.patientName} ({booking.gender})</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase text-slate-400 font-bold">Contact</span>
                                        <span className="text-base-content truncate block">{booking.phone}</span>
                                    </div>
                                    <div className="col-span-2 flex items-center gap-4 text-[11px] pt-1">
                                        <span className="flex items-center gap-1"><FiCalendar className="text-primary" /> {booking.appointmentDate}</span>
                                        <span className="flex items-center gap-1"><FiClock className="text-indigo-500" /> {booking.appointmentTime}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-1">
                                    <button 
                                        onClick={() => openEditModal(booking)}
                                        className="btn btn-outline border-indigo-600/20 text-indigo-600 hover:bg-indigo-600 hover:text-white btn-sm rounded-xl flex items-center gap-1 font-bold text-xs px-4"
                                    >
                                        <FiEdit /> Reschedule
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(booking._id)}
                                        className="btn btn-outline border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white btn-sm rounded-xl flex items-center gap-1 font-bold text-xs px-4"
                                    >
                                        <FiTrash2 /> Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}

            {/* ================= RESCHEDULE UPDATE MODAL ================= */}
            {activeEditBooking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-base-100 rounded-2xl w-full max-w-lg shadow-2xl border border-base-content/10 overflow-hidden transform transition-all duration-300 scale-95 animate-scale-up">
                        
                        <div className="bg-indigo-600 p-6 text-white relative">
                            <h3 className="text-xl font-bold font-sans tracking-tight">Update Appointment</h3>
                            <p className="text-sm opacity-90 mt-1">Reschedule consultation with {activeEditBooking.doctorName}</p>
                            <button 
                                onClick={() => setActiveEditBooking(null)} 
                                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 btn btn-xs btn-circle btn-ghost"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
                            {/* Read-Only Safety Fields */}
                            <div className="grid grid-cols-2 gap-4 bg-base-200 p-4 rounded-xl text-xs font-semibold text-slate-500">
                                <div>
                                    <span className="block text-[10px] uppercase text-slate-400">Consultant (Read-Only)</span>
                                    <span className="text-base-content text-sm">{activeEditBooking.doctorName}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase text-slate-400">User Account (Read-Only)</span>
                                    <span className="text-base-content text-sm truncate block">{user?.email}</span>
                                </div>
                            </div>

                            {/* Patient Name */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-xs">Patient Name</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <FiUser className="h-4 w-4" />
                                    </span>
                                    <input 
                                        type="text" 
                                        value={editPatientName}
                                        onChange={(e) => setEditPatientName(e.target.value)}
                                        className="input input-bordered w-full pl-10 text-sm focus:input-primary" 
                                        required
                                    />
                                </div>
                            </div>

                            {/* Gender and Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-xs">Gender</span>
                                    </label>
                                    <select 
                                        value={editGender}
                                        onChange={(e) => setEditGender(e.target.value)}
                                        className="select select-bordered w-full text-sm focus:select-primary"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-xs">Contact Phone</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                            <FiPhone className="h-4 w-4" />
                                        </span>
                                        <input 
                                            type="tel" 
                                            value={editPhone}
                                            onChange={(e) => setEditPhone(e.target.value)}
                                            className="input input-bordered w-full pl-10 text-sm focus:input-primary" 
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Date & Time Slots */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-xs">Select New Date</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                            <FiCalendar className="h-4 w-4" />
                                        </span>
                                        <input 
                                            type="date" 
                                            value={editDate}
                                            onChange={(e) => setEditDate(e.target.value)}
                                            className="input input-bordered w-full pl-10 text-sm focus:input-primary" 
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-xs">Select New Time Slot</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                            <FiClock className="h-4 w-4" />
                                        </span>
                                        <select 
                                            value={editTime}
                                            onChange={(e) => setEditTime(e.target.value)}
                                            className="select select-bordered w-full pl-10 text-sm focus:select-primary"
                                            required
                                        >
                                            {/* Standard availability slots */}
                                            <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                                            <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                                            <option value="11:00 AM - 02:00 PM">11:00 AM - 02:00 PM</option>
                                            <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                                            <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                                            <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM</option>
                                            <option value="05:00 PM - 08:00 PM">05:00 PM - 08:00 PM</option>
                                            <option value="06:00 PM - 09:00 PM">06:00 PM - 09:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setActiveEditBooking(null)} 
                                    className="btn btn-ghost rounded-xl text-sm font-semibold"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className={`btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-none rounded-xl text-sm font-semibold text-white px-6 ${updating ? 'loading' : ''}`}
                                    disabled={updating}
                                >
                                    {updating ? 'Saving Changes...' : 'Save Reschedule'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyBookings;
