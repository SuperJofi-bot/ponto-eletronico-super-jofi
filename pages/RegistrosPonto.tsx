
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { RegistroPonto } from '../types';
import { Search, Calendar, MapPin, CheckCircle, Download, AlertCircle } from 'lucide-react';

const RegistrosPonto: React.FC = () => {
  const [registros, setRegistros] = useState<RegistroPonto[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    fetchRegistros();
  }, []);

  const fetchRegistros = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pontos')
        .select('*, usuarios(nome)')
        .order('data_hora', { ascending: false });
      
      if (error || !data || data.length === 0) {
        setUsingDemo(true);
        setRegistros([
          { id: '1', usuario_id: '1', usuario_nome: 'Carlos Eduardo', tipo: 'entrada', data_hora: new Date().toISOString(), empresa_id: '1', criado_em: '', ip: '192.168.0.1' },
          { id: '2', usuario_id: '2', usuario_nome: 'Ana Paula', tipo: 'pausa', data_hora: new Date().toISOString(), empresa_id: '1', criado_em: '', ip: '192.168.0.2' },
          { id: '3', usuario_id: '3', usuario_nome: 'Roberto Dias', tipo: 'entrada', data_hora: new Date().toISOString(), empresa_id: '1', criado_em: '', ip: '189.12.33.1' }
        ]);
      } else {
        setRegistros(data.map((r: any) => ({ ...r, usuario_nome: r.usuarios?.nome })));
      }
    } catch (err) {
      setUsingDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (ts: string) => new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const formatDate = (ts: string) => new Date(ts).toLocaleDateString('pt-BR');

  const getTipoLabel = (tipo: string) => {
    const map: Record<string, { label: string, color: string }> = {
      entrada: { label: 'Entrada', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      pausa: { label: 'Pausa Almoço', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      retorno: { label: 'Retorno Almoço', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      saida: { label: 'Saída', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    };
    return map[tipo] || { label: tipo, color: 'bg-slate-100' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Espelho de Ponto</h2>
          <p className="text-slate-500">Visualização de todos os registros em tempo real.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50 shadow-sm">
          <Download size={20} /> Exportar
        </button>
      </div>

      {usingDemo && (
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center gap-2 text-indigo-700 text-xs font-medium">
          <AlertCircle size={16} /> Exibindo registros simulados para demonstração de interface.
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Colaborador</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Horário</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Evento</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">IP/Local</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(3)].map((_, i) => <tr key={i} className="animate-pulse h-16 bg-slate-50/20"></tr>)
              ) : registros.map((reg) => {
                const tipoStyle = getTipoLabel(reg.tipo);
                return (
                  <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{reg.usuario_nome}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{formatDate(reg.data_hora)}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{formatTime(reg.data_hora)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-tight ${tipoStyle.color}`}>
                        {tipoStyle.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-slate-400 font-mono">{reg.ip || '---'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle size={16} />
                        <span className="text-xs font-semibold uppercase">Confirmado</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrosPonto;
