import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center py-16 px-6 md:px-12 bg-gradient-to-tr from-primary/5 via-base-100 to-primary/5 text-center transition-all duration-300">
            <div className="max-w-md space-y-6">
                
                {/* 404 Graphics */}
                <div className="relative flex justify-center">
                    <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl w-48 h-48 mx-auto"></div>
                    <div className="relative p-6 bg-red-500/10 rounded-full text-red-500 w-32 h-32 flex items-center justify-center shadow-lg border border-red-500/20">
                        <FiAlertCircle className="h-16 w-16 stroke-[1.5]" />
                    </div>
                </div>

                {/* Text Description */}
                <div className="space-y-2">
                    <h1 className="text-8xl font-black font-sans text-slate-800 dark:text-slate-100 tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold font-sans text-base-content tracking-tight">
                        Medical Record Not Found
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                        The medical file or prescription path you are looking for has either been moved, archived, or does not exist.
                    </p>
                </div>

                {/* Back Home Button */}
                <div>
                    <Link 
                        to="/" 
                        className="btn btn-primary text-white font-semibold rounded-xl px-8 shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <FiHome className="h-4 w-4" /> Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
