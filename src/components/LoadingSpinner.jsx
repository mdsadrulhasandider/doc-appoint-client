import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <span className="loading loading-ring loading-lg text-primary scale-125"></span>
            <p className="text-sm font-semibold text-slate-500 animate-pulse tracking-wide font-sans">
                Fetching medical records...
            </p>
        </div>
    );
};

export default LoadingSpinner;
