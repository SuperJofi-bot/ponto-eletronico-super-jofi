
import React from 'react';
import { 
  FileText, 
  BarChart, 
  Users, 
  Clock, 
  Download, 
  Calendar,
  Share2
} from 'lucide-react';

const ReportCard: React.FC<{
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, desc, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all group">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
    <p className="text-sm text-slate-500 mb-6">{desc}</p>
    
    <div className="flex items-center gap-2">
      <button className="flex-1 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
        <Download size={14} /> PDF
      </button>
      <button className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
        <FileText size={14} /> XLSX
      </button>
    </div>
  </div>
);

const Relatorios: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Exportação de Relatórios</h2>
          <p className="text-slate-500">Documentos fiscais e operacionais prontos para exportação.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600">
            <Calendar size={20} />
          </button>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard 
          title="Espelho de Ponto"
          desc="Relatório completo de entradas e saídas por funcionário para conferência mensal."
          icon={<Clock className="text-indigo-600" size={24} />}
          color="bg-indigo-50"
        />
        <ReportCard 
          title="Saldo Banco de Horas"
          desc="Consolidado de horas extras e débitos de todos os colaboradores do período."
          icon={<BarChart className="text-emerald-600" size={24} />}
          color="bg-emerald-50"
        />
        <ReportCard 
          title="Justificativas"
          desc="Listagem de todas as solicitações aprovadas, rejeitadas e seus anexos."
          icon={<FileText className="text-amber-600" size={24} />}
          color="bg-amber-50"
        />
        <ReportCard 
          title="Lista de Colaboradores"
          desc="Dados cadastrais, status e perfil de acesso de toda a base ativa."
          icon={<Users className="text-blue-600" size={24} />}
          color="bg-blue-50"
        />
        <ReportCard 
          title="Log de Auditoria"
          desc="Histórico de ações administrativas e alterações críticas no sistema."
          icon={<Clock className="text-purple-600" size={24} />}
          color="bg-purple-50"
        />
      </div>

      <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-2xl font-bold mb-3">Agendamento de Relatórios</h3>
          <p className="text-indigo-100 mb-6">Receba automaticamente o fechamento mensal no seu e-mail corporativo todo dia 1º de cada mês.</p>
          <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
            Configurar Automação
          </button>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-800/50 flex items-center justify-center opacity-30 md:opacity-100">
          <Calendar size={120} />
        </div>
      </div>
    </div>
  );
};

export default Relatorios;
