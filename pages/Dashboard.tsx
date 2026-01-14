
import React, { useEffect, useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle 
} from 'lucide-react';
import { callEdgeFunction } from '../services/supabase';
import { DashboardData } from '../types';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
}> = ({ title, value, icon, trend, trendUp, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2.5 rounded-xl ${color}`}>
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-bold flex items-center gap-1 ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const { data: edgeData, error } = await callEdgeFunction<DashboardData>('get-dashboard-data');
        
        if (error || !edgeData) {
          // Fallback robusto para demonstração
          setData({
            totalFuncionarios: 124,
            pontosHoje: 118,
            ausentesHoje: 6,
            horasExtrasMes: 342,
            horasNegativasMes: 54,
            solicitacoesPendentes: 12
          });
        } else {
          setData(edgeData);
        }
      } catch (e) {
        console.warn('Falha na chamada da Edge Function. Usando mock.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>)}
      </div>
      <div className="h-96 bg-slate-200 rounded-2xl"></div>
    </div>
  );

  const chartData = [
    { name: 'Seg', horas: 840 }, { name: 'Ter', horas: 860 },
    { name: 'Qua', horas: 830 }, { name: 'Qui', horas: 880 },
    { name: 'Sex', horas: 810 }, { name: 'Sáb', horas: 120 },
    { name: 'Dom', horas: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Colaboradores" value={data?.totalFuncionarios || 0} icon={<Users size={24} className="text-indigo-600" />} color="bg-indigo-50" />
        <StatCard title="Presentes" value={data?.pontosHoje || 0} icon={<CheckCircle2 size={24} className="text-emerald-600" />} color="bg-emerald-50" trend="95%" trendUp />
        <StatCard title="Ausentes" value={data?.ausentesHoje || 0} icon={<AlertCircle size={24} className="text-amber-600" />} color="bg-amber-50" />
        <StatCard title="Extras" value={`${data?.horasExtrasMes || 0}h`} icon={<TrendingUp size={24} className="text-indigo-600" />} color="bg-indigo-50" />
        <StatCard title="Negativas" value={`${data?.horasNegativasMes || 0}h`} icon={<TrendingDown size={24} className="text-rose-600" />} color="bg-rose-50" />
        <StatCard title="Pendências" value={data?.solicitacoesPendentes || 0} icon={<Clock size={24} className="text-indigo-600" />} color="bg-indigo-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-w-0">
          <h3 className="text-lg font-bold text-slate-800 mb-8">Volume de Trabalho Semanal</h3>
          <div className="h-[300px] w-full" style={{ minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorHoras" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="horas" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorHoras)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Status da Equipe</h3>
          <div className="space-y-6">
            <StatusItem label="Presentes" count={118} color="bg-emerald-500" subtext="Em jornada" />
            <StatusItem label="Pausa" count={42} color="bg-indigo-500" subtext="Intervalo" />
            <StatusItem label="Atestados" count={4} color="bg-amber-500" subtext="Justificado" />
            <StatusItem label="Ausentes" count={2} color="bg-rose-500" subtext="Sem registro" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusItem: React.FC<{ label: string, count: number, color: string, subtext: string }> = ({ label, count, color, subtext }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-10 ${color} rounded-full`}></div>
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{subtext}</p>
      </div>
    </div>
    <p className="text-lg font-bold text-slate-800">{count}</p>
  </div>
);

export default Dashboard;
