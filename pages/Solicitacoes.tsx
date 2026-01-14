
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Solicitacao } from '../types';
import { Check, X, Eye, FileText, Clock } from 'lucide-react';

const Solicitacoes: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const fetchSolicitacoes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('solicitacoes')
      .select('*, usuarios(nome)')
      .order('criado_em', { ascending: false });
    
    if (error) console.error('Error fetching requests:', error);
    else setSolicitacoes(data.map((s: any) => ({ ...s, usuario_nome: s.usuarios?.nome })) || []);
    setLoading(false);
  };

  const handleAction = async (id: string, action: 'aprovado' | 'rejeitado') => {
    // Nota: aprovado_por deve vir do ID do admin atual da sessão
    const { data: { session } } = await supabase.auth.getSession();
    
    const { error } = await supabase
      .from('solicitacoes')
      .update({ 
        status: action,
        aprovado_por: session?.user.id,
        aprovado_em: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) alert('Erro ao processar: ' + error.message);
    else fetchSolicitacoes();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Solicitações e Justificativas</h2>
        <p className="text-slate-500">Analise os pedidos registrados na tabela 'solicitacoes'.</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => <div key={i} className="h-24 bg-white border border-slate-200 rounded-2xl animate-pulse"></div>)
        ) : solicitacoes.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <Check className="mx-auto text-emerald-500 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-800">Tudo em dia!</h3>
            <p className="text-slate-500">Não há solicitações pendentes.</p>
          </div>
        ) : solicitacoes.map((sol) => (
          <div key={sol.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    sol.status === 'pendente' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {sol.motivo}
                  </span>
                  <span className="text-sm text-slate-400 font-medium flex items-center gap-1">
                    <Clock size={14} /> Inicio: {new Date(sol.data_inicio).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">{sol.usuario_nome}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{sol.justificativa}</p>
                
                <div className="mt-4 flex gap-4">
                  <button className="flex items-center gap-2 text-indigo-600 text-xs font-bold hover:underline">
                    <FileText size={16} />
                    Ver Anexos
                  </button>
                </div>
              </div>

              {sol.status === 'pendente' && (
                <div className="flex flex-row md:flex-col items-center justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6">
                  <button 
                    onClick={() => handleAction(sol.id, 'aprovado')}
                    className="flex-1 md:w-32 py-2.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={18} /> Aprovar
                  </button>
                  <button 
                    onClick={() => handleAction(sol.id, 'rejeitado')}
                    className="flex-1 md:w-32 py-2.5 bg-white border border-rose-200 text-rose-600 font-bold rounded-xl hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Rejeitar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solicitacoes;
