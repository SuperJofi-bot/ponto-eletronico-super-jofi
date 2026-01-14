
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { BancoHoras } from '../types';
import { TrendingUp, ArrowUpRight, AlertCircle } from 'lucide-react';

const BancoHorasPage: React.FC = () => {
  const [bancos, setBancos] = useState<BancoHoras[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    fetchBanco();
  }, []);

  const fetchBanco = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('banco_horas')
        .select('*, usuarios(nome)');
      
      if (error || !data || data.length === 0) {
        setUsingDemo(true);
        setBancos([
          { id: '1', usuario_id: '1', usuario_nome: 'Marcos André', data: new Date().toISOString(), horas_trabalhadas: '08:45:00', horas_esperadas: '08:00:00', saldo: '00:45:00', empresa_id: '1', criado_em: '' },
          { id: '2', usuario_id: '2', usuario_nome: 'Julia Silva', data: new Date().toISOString(), horas_trabalhadas: '07:30:00', horas_esperadas: '08:00:00', saldo: '-00:30:00', empresa_id: '1', criado_em: '' }
        ]);
      } else {
        setBancos(data.map((b: any) => ({ ...b, usuario_nome: b.usuarios?.nome })));
      }
    } catch (err) {
      setUsingDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const formatInterval = (interval: string) => {
    if (!interval) return '0h 00m';
    const isNegative = interval.includes('-');
    const clean = interval.replace('-', '');
    const parts = clean.split(':');
    if (parts.length < 2) return interval;
    return `${isNegative ? '-' : '+'}${parseInt(parts[0])}h ${parts[1]}m`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Saldos de Banco de Horas</h2>
        <p className="text-slate-500">Acompanhamento de compensações e saldo acumulado.</p>
      </div>

      {usingDemo && (
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center gap-2 text-indigo-700 text-xs font-medium">
          <AlertCircle size={16} /> Exibindo saldos simulados para demonstração de interface.
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Funcionário</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Trabalhadas</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Esperadas</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Saldo</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(3)].map((_, i) => <tr key={i} className="animate-pulse h-16 bg-slate-50/10"></tr>)
              ) : bancos.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{b.usuario_nome}</td>
                  <td className="px-6 py-4 text-sm">{formatInterval(b.horas_trabalhadas)}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{formatInterval(b.horas_esperadas)}</td>
                  <td className={`px-6 py-4 font-bold ${!b.saldo.includes('-') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {formatInterval(b.saldo)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-bold uppercase hover:bg-indigo-100">Detalhes</button>
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

export default BancoHorasPage;
