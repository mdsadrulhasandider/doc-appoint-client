import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiUser, FiPhone, FiAlertCircle } from 'react-icons/fi';

const BookingModal = ({ doctor, onClose, onBookingSuccess }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Set up form state with realistic pre-fills or empty fields
    const [patientName, setPatientName] = useState(user?.name || '');
    const [gender, setGender] = useState('Male');
    const [phone, setPhone] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState(doctor.availability?.[0] || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!appointmentDate) {
            toast.error('Please select an appointment date');
            return;
        }
        if (!phone) {
            toast.error('Please provide a valid contact number');
            return;
        }

        setLoading(true);

        const bookingData = {
            userEmail: user.email,
            doctorName: doctor.name,
            doctorId: doctor.id || doctor._id,
            specialty: doctor.specialty,
            fee: doctor.fee,
            patientName,
            gender,
            phone,
            appointmentDate,
            appointmentTime,
            status: 'Pending',
            createdAt: new Date()
        };

        try {
            const response = await axios.post('/bookings', bookingData);
            if (response.data.success) {
                toast.success('Appointment booked successfully!');
                if (onBookingSuccess) onBookingSuccess();
                onClose();
                navigate('/dashboard/my-bookings'); // Redirect instantly to My Bookings dashboard page!
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to book appointment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-base-100 rounded-2xl w-full max-w-lg shadow-2xl border border-base-content/10 overflow-hidden transform transition-all duration-300 scale-95 animate-scale-up">
                
                {/* Modal Header */}
                <div className="bg-primary p-6 text-white relative">
                    <h3 className="text-xl font-bold font-sans tracking-tight">Book an Appointment</h3>
                    <p className="text-sm opacity-90 mt-1">Consultation with {doctor.name}</p>
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 btn btn-xs btn-circle btn-ghost"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Read-Only Information */}
                    <div className="grid grid-cols-2 gap-4 bg-base-200 p-4 rounded-xl text-xs font-semibold text-slate-500">
                        <div>
                            <span className="block text-[10px] uppercase text-slate-400">Consultant</span>
                            <span className="text-base-content text-sm">{doctor.name} ({doctor.specialty})</span>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase text-slate-400">Account Email</span>
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
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                className="input input-bordered w-full pl-10 text-sm focus:input-primary" 
                                placeholder="Patient Full Name"
                                required
                            />
                        </div>
                    </div>

                    {/* Gender and Phone Number in Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs">Gender</span>
                            </label>
                            <select 
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
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
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="input input-bordered w-full pl-10 text-sm focus:input-primary" 
                                    placeholder="Phone number"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date and Time slots */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs">Appointment Date</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                    <FiCalendar className="h-4 w-4" />
                                </span>
                                <input 
                                    type="date" 
                                    value={appointmentDate}
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                    className="input input-bordered w-full pl-10 text-sm focus:input-primary" 
                                    min={new Date().toISOString().split('T')[0]} // Block previous dates
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs">Time Slot</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                    <FiClock className="h-4 w-4" />
                                </span>
                                <select 
                                    value={appointmentTime}
                                    onChange={(e) => setAppointmentTime(e.target.value)}
                                    className="select select-bordered w-full pl-10 text-sm focus:select-primary"
                                    required
                                >
                                    {doctor.availability?.map((slot, index) => (
                                        <option key={index} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="btn btn-ghost rounded-xl text-sm font-semibold"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className={`btn bg-indigo-600 hover:bg-indigo-700 border-none rounded-xl text-sm font-semibold text-white px-6 shadow-lg shadow-indigo-600/10 ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Booking...' : `Confirm - ৳${doctor.fee}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
