
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { LogAuditoria } from '../types';
import { ShieldAlert, Terminal, Search } from 'lucide-react';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<LogAuditoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('logs')
      .select('*, usuarios(nome)')
      .order('criado_em', { ascending: false });
    
    if (error) {
      console.error('Error fetching logs:', error);
    } else {
      setLogs(data.map((l: any) => ({ ...l, admin_nome: l.usuarios?.nome })) || []);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Logs de Auditoria</h2>
          <p className="text-slate-500">Histórico detalhado da tabela 'logs'.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold border border-rose-100">
             <ShieldAlert size={14} /> Somente Leitura
           </span>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Terminal className="text-emerald-500" size={20} />
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
            <input 
              type="text" 
              placeholder="Pesquisar logs..." 
              className="w-full pl-10 pr-4 py-1.5 bg-slate-800 border-none rounded-lg text-slate-300 text-sm focus:ring-1 focus:ring-emerald-500 outline-none font-mono"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-800/50 text-slate-500 border-b border-slate-800">
                <th className="px-6 py-3 font-medium uppercase">Timestamp</th>
                <th className="px-6 py-3 font-medium uppercase">Usuário</th>
                <th className="px-6 py-3 font-medium uppercase">Ação</th>
                <th className="px-6 py-3 font-medium uppercase">Detalhes</th>
                <th className="px-6 py-3 font-medium uppercase">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                [...Array(3)].map((_, i) => <tr key={i} className="animate-pulse h-12 bg-slate-800/20"></tr>)
              ) : logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {new Date(log.criado_em).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-emerald-400">
                    {log.admin_nome || 'Sistema'}
                  </td>
                  <td className="px-6 py-4 text-indigo-400 font-bold">
                    {log.acao}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {log.detalhes}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {log.ip || '---'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Logs;
