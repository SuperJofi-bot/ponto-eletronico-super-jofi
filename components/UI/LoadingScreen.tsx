
import React from 'react';
import { Clock } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="relative">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center animate-bounce shadow-xl shadow-indigo-200">
          <Clock className="text-white w-8 h-8" />
        </div>
        <div className="absolute -inset-4 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-8 text-slate-500 font-bold tracking-widest uppercase text-xs">Ponto Pro</p>
      <p className="mt-2 text-slate-400 text-sm">Carregando ambiente seguro...</p>
    </div>
  );
};

export default LoadingScreen;
