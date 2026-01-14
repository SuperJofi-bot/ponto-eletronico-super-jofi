
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CalendarClock, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  ShieldCheck 
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
}

const NavItem: React.FC<{ 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  active: boolean 
}> = ({ href, icon, label, active }) => (
  <a
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-indigo-600 text-white shadow-md' 
        : 'text-slate-400 hover:bg-slate-100 hover:text-indigo-600'
    }`}
  >
    <span className="shrink-0">{icon}</span>
    <span className="font-medium">{label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Clock className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
            Ponto Pro
          </span>
        </div>

        <nav className="space-y-1">
          <NavItem 
            href="#dashboard" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={currentPath === '#dashboard' || currentPath === ''} 
          />
          <NavItem 
            href="#funcionarios" 
            icon={<Users size={20} />} 
            label="Funcionários" 
            active={currentPath === '#funcionarios'} 
          />
          <NavItem 
            href="#pontos" 
            icon={<Clock size={20} />} 
            label="Registros de Ponto" 
            active={currentPath === '#pontos'} 
          />
          <NavItem 
            href="#banco-horas" 
            icon={<CalendarClock size={20} />} 
            label="Banco de Horas" 
            active={currentPath === '#banco-horas'} 
          />
          <NavItem 
            href="#solicitacoes" 
            icon={<ClipboardList size={20} />} 
            label="Solicitações" 
            active={currentPath === '#solicitacoes'} 
          />
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Administração</p>
          </div>
          <NavItem 
            href="#relatorios" 
            icon={<BarChart3 size={20} />} 
            label="Relatórios" 
            active={currentPath === '#relatorios'} 
          />
          <NavItem 
            href="#configuracoes" 
            icon={<Settings size={20} />} 
            label="Configurações" 
            active={currentPath === '#configuracoes'} 
          />
          <NavItem 
            href="#logs" 
            icon={<ShieldCheck size={20} />} 
            label="Logs de Auditoria" 
            active={currentPath === '#logs'} 
          />
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="text-xs text-indigo-700 font-medium mb-1">Dúvidas?</p>
          <p className="text-xs text-indigo-600/70 mb-3">Acesse nossa central de ajuda oficial.</p>
          <button className="w-full py-2 bg-white border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
            Suporte
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
