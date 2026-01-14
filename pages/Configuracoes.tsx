
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { EmpresaConfig } from '../types';
import { Save, Shield, Clock } from 'lucide-react';

const Configuracoes: React.FC = () => {
  const [config, setConfig] = useState<EmpresaConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('configuracoes_empresa')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (error) console.error('Error fetching config:', error);
    else if (data) setConfig(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Regras de Negócio</h2>
        <p className="text-slate-500">Configurações globais extraídas da tabela 'configuracoes_empresa'.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <Clock size={16} className="text-indigo-600" />
              Carga Horária Padrão (Interval)
            </label>
            <input 
              type="text" 
              defaultValue={config?.carga_horaria_diaria || '08:00:00'}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
            />
            <p className="mt-2 text-xs text-slate-400 italic">Exemplo: '08:00:00' para 8 horas diárias.</p>
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <Shield size={16} className="text-indigo-600" />
              Tolerância de Ponto (Minutos)
            </label>
            <input 
              type="number" 
              defaultValue={config?.tolerancia_minutos || 10}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <p className="font-bold text-slate-800">Permitir Banco de Horas</p>
            <p className="text-sm text-slate-500">Compensação automática baseada no saldo diário.</p>
          </div>
          <div className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${config?.permite_banco_horas ? 'bg-indigo-600' : 'bg-slate-300'}`}>
            <div className={`w-6 h-6 bg-white rounded-full transition-transform ${config?.permite_banco_horas ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Save size={20} /> Salvar Regras
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
