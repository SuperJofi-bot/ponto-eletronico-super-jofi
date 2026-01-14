
import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { supabase } from '../services/supabase';

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-center">
      <div className="max-w-md">
        <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <ShieldAlert size={48} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Acesso Restrito</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Você não tem permissões administrativas para acessar este painel. Caso acredite que isso seja um erro, entre em contato com o suporte da sua empresa.
        </p>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <ArrowLeft size={20} />
          Voltar e Sair
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
