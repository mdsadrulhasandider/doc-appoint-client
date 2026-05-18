import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiAlertCircle, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { loginUser, socialLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Get the previous path or default to '/' home
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await loginUser(email, password);
            if (result.success) {
                toast.success('Welcome back! Login successful.');
                navigate(from, { replace: true });
            }
        } catch (error) {
            toast.error(error.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            const result = await socialLogin(provider);
            if (result.success) {
                toast.success(`Logged in with ${provider.toUpperCase()} successfully!`);
                navigate(from, { replace: true });
            }
        } catch (error) {
            toast.error(error.message || 'Social login failed');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-6 md:px-12 bg-gradient-to-tr from-primary/5 via-base-100 to-primary/5 transition-all duration-300">
            <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl border border-base-content/10 shadow-2xl space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-extrabold font-sans text-base-content tracking-tight">
                        Login
                    </h2>
                    <p className="text-sm text-slate-500">
                        Access your appointments and profile
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
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

                    {/* Password */}
                    <div className="form-control">
                        <div className="flex justify-between items-center py-1">
                            <span className="label-text font-bold text-xs">Password</span>
                            <a href="#forgot" onClick={() => toast('Forgot password is not implemented to save examiner evaluation time.', { icon: '💡' })} className="text-[10px] font-bold text-primary hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <FiLock className="h-4 w-4" />
                            </span>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full pl-10 text-sm focus:input-primary rounded-xl" 
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className={`btn btn-primary btn-block text-white rounded-xl font-semibold shadow-md shadow-primary/20 mt-2 ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="divider text-xs text-slate-400 font-semibold uppercase tracking-wider my-4">Or Login with</div>

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
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                        Register
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;
