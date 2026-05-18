import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiImage, FiLock, FiAlertCircle, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const { registerUser, socialLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Inline validation error state
    const [validationError, setValidationError] = useState('');

    const validatePassword = (pass) => {
        const hasUppercase = /[A-Z]/.test(pass);
        const hasLowercase = /[a-z]/.test(pass);
        const isLongEnough = pass.length >= 6;

        if (!isLongEnough) {
            return 'Password must be at least 6 characters long.';
        }
        if (!hasUppercase) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!hasLowercase) {
            return 'Password must contain at least one lowercase letter.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        // Perform password validation rules
        const errorMsg = validatePassword(password);
        if (errorMsg) {
            setValidationError(errorMsg);
            toast.error(errorMsg);
            return;
        }

        setLoading(true);

        try {
            const result = await registerUser(name, email, photoURL, password);
            if (result.success) {
                toast.success('Registration successful! Redirecting to login page...');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (error) {
            toast.error(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            const result = await socialLogin(provider);
            if (result.success) {
                toast.success(`Logged in with ${provider.toUpperCase()} successfully!`);
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message || 'Social authentication failed');
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-6 md:px-12 bg-gradient-to-tr from-primary/5 via-base-100 to-primary/5 transition-all duration-300">
            <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl border border-base-content/10 shadow-2xl space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-extrabold font-sans text-base-content tracking-tight">
                        Register
                    </h2>
                    <p className="text-sm text-slate-500">
                        Create an account for DocAppoint
                    </p>
                </div>

                {/* Validation Error Alert Box */}
                {validationError && (
                    <div className="alert alert-error bg-red-500/10 border-red-500/20 text-red-500 text-xs p-3 rounded-xl flex items-start gap-2">
                        <FiAlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <span>{validationError}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full pl-10 text-sm focus:input-primary rounded-xl" 
                                placeholder="Your Name"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text font-bold text-xs">Email Address</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <FiMail className="h-4 w-4" />
                            </span>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full pl-10 text-sm focus:input-primary rounded-xl" 
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Photo URL */}
                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text font-bold text-xs">Photo URL</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <FiImage className="h-4 w-4" />
                            </span>
                            <input 
                                type="url" 
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="input input-bordered w-full pl-10 text-sm focus:input-primary rounded-xl" 
                                placeholder="https://image-link.com/photo.jpg"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text font-bold text-xs">Password</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <FiLock className="h-4 w-4" />
                            </span>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (validationError) setValidationError('');
                                }}
                                className="input input-bordered w-full pl-10 text-sm focus:input-primary rounded-xl" 
                                placeholder="Min 6 chars, 1 upper, 1 lower"
                                required
                            />
                        </div>
                        <label className="label py-0.5">
                            <span className="label-text-alt text-[9px] text-slate-400 font-bold uppercase">
                                Required: 6+ chars, 1 uppercase, 1 lowercase
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className={`btn btn-block bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl font-semibold shadow-lg shadow-indigo-600/10 mt-2 ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                {/* Divider */}
                <div className="divider text-xs text-slate-400 font-semibold uppercase tracking-wider my-4">Or Sign Up with</div>

                {/* Social logins */}
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => handleSocialLogin('google')}
                        className="btn btn-outline border-base-content/10 hover:bg-base-200 hover:text-base-content rounded-xl flex items-center justify-center gap-2"
                    >
                        <FcGoogle className="h-5 w-5" />
                        <span className="text-xs font-bold font-sans">Google</span>
                    </button>
                    <button 
                        onClick={() => handleSocialLogin('github')}
                        className="btn btn-outline border-base-content/10 hover:bg-base-200 hover:text-base-content rounded-xl flex items-center justify-center gap-2"
                    >
                        <FiGithub className="h-5 w-5" />
                        <span className="text-xs font-bold font-sans">GitHub</span>
                    </button>
                </div>

                {/* Footer link */}
                <div className="text-center text-xs text-slate-500 font-semibold pt-2">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Register;
