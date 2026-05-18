import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FiUser, FiImage, FiMail, FiEdit, FiClock } from 'react-icons/fi';

const MyProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);

    // Profile Edit Modal State
    const [isOpen, setIsOpen] = useState(false);
    const [editName, setEditName] = useState(user?.name || '');
    const [editPhotoURL, setEditPhotoURL] = useState(user?.photoURL || '');
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => {
        setEditName(user?.name || '');
        setEditPhotoURL(user?.photoURL || '');
        setIsOpen(true);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!editName.trim()) {
            toast.error("Name is required");
            return;
        }
        if (!editPhotoURL.trim()) {
            toast.error("Photo URL is required");
            return;
        }

        setLoading(true);

        try {
            // Calls AuthContext which updates backend database & syncs React state instantly
            const result = await updateUserProfile(editName, editPhotoURL);
            if (result.success) {
                toast.success("Profile updated successfully!");
                setIsOpen(false);
            }
        } catch (error) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            
            {/* Title Section */}
            <div className="border-b border-base-200 pb-4">
                <h2 className="text-2xl font-extrabold font-sans text-base-content tracking-tight">My Profile</h2>
                <p className="text-xs text-slate-400 mt-1">View and update your personal details and account credentials.</p>
            </div>

            {/* Profile Detail Card */}
            {user && (
                <div className="card bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden shadow-sm max-w-xl mx-auto md:mx-0">
                    <div className="bg-primary h-24 w-full relative"></div>
                    <div className="p-6 relative flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                        
                        {/* Avatar block overlapping top banner */}
                        <div className="relative -mt-16 mb-2">
                            <div className="avatar">
                                <div className="w-24 h-24 rounded-full border-4 border-base-100 shadow-lg bg-slate-100">
                                    <img 
                                        src={user.photoURL} 
                                        alt={user.name} 
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Profile Info Details */}
                        <div className="space-y-4 w-full">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-extrabold text-base-content font-sans">{user.name}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Patient Account</p>
                            </div>

                            <div className="space-y-3 pt-2 text-sm border-t border-base-200">
                                <div className="flex items-center space-x-3 text-slate-500 font-semibold">
                                    <FiMail className="h-5 w-5 text-primary shrink-0" />
                                    <div>
                                        <span className="block text-[9px] text-slate-400 uppercase font-bold">Email Address</span>
                                        <span className="text-base-content">{user.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 text-slate-500 font-semibold">
                                    <FiClock className="h-5 w-5 text-indigo-500 shrink-0" />
                                    <div>
                                        <span className="block text-[9px] text-slate-400 uppercase font-bold">Account Status</span>
                                        <span className="badge badge-success badge-sm font-bold text-white py-1.5 px-2 mt-0.5">Verified Profile</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <div className="w-full pt-4 flex justify-end">
                            <button 
                                onClick={handleOpenModal}
                                className="btn btn-primary rounded-xl text-white font-semibold flex items-center gap-2 px-6 shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300"
                            >
                                <FiEdit className="h-4 w-4" /> Update Profile
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* ================= EDIT PROFILE MODAL ================= */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-base-100 rounded-2xl w-full max-w-md shadow-2xl border border-base-content/10 overflow-hidden transform transition-all duration-300 scale-95 animate-scale-up">
                        
                        {/* Modal Header */}
                        <div className="bg-primary p-6 text-white relative">
                            <h3 className="text-xl font-bold font-sans tracking-tight">Update Personal Details</h3>
                            <p className="text-sm opacity-90 mt-1">Modify your name and avatar photo link</p>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 btn btn-xs btn-circle btn-ghost"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                            {/* Profile Name */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-xs">Full Name</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <FiUser className="h-4 w-4" />
                                    </span>
                                    <input 
                                        type="text" 
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="input input-bordered w-full pl-10 text-sm focus:input-primary rounded-xl"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Profile Image URL */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-xs">Profile Photo URL</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <FiImage className="h-4 w-4" />
                                    </span>
                                    <input 
                                        type="url" 
                                        value={editPhotoURL}
                                        onChange={(e) => setEditPhotoURL(e.target.value)}
                                        className="input input-bordered w-full pl-10 text-sm focus:input-primary rounded-xl"
                                        placeholder="https://image-link.com/avatar.jpg"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setIsOpen(false)} 
                                    className="btn btn-ghost rounded-xl text-sm font-semibold"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className={`btn btn-primary rounded-xl text-sm font-semibold text-white px-6 shadow-md shadow-primary/20 ${loading ? 'loading' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Saving Changes...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
};

export default MyProfile;
