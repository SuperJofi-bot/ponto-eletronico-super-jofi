
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../../pages/Dashboard';
import Funcionarios from '../../pages/Funcionarios';
import RegistrosPonto from '../../pages/RegistrosPonto';
import BancoHorasPage from '../../pages/BancoHoras';
import Solicitacoes from '../../pages/Solicitacoes';
import Relatorios from '../../pages/Relatorios';
import Configuracoes from '../../pages/Configuracoes';
import Logs from '../../pages/Logs';
import { User } from '../../types';

interface DashboardLayoutProps {
  currentPath: string;
  userData: User | null;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ currentPath, userData, onLogout }) => {
  const renderContent = () => {
    switch (currentPath) {
      case '#dashboard': return <Dashboard />;
      case '#funcionarios': return <Funcionarios />;
      case '#pontos': return <RegistrosPonto />;
      case '#banco-horas': return <BancoHorasPage />;
      case '#solicitacoes': return <Solicitacoes />;
      case '#relatorios': return <Relatorios />;
      case '#configuracoes': return <Configuracoes />;
      case '#logs': return <Logs />;
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const map: Record<string, string> = {
      '#dashboard': 'Visão Geral',
      '#funcionarios': 'Gestão de Funcionários',
      '#pontos': 'Registros de Ponto',
      '#banco-horas': 'Banco de Horas',
      '#solicitacoes': 'Solicitações e Justificativas',
      '#relatorios': 'Relatórios e Exportação',
      '#configuracoes': 'Configurações do Sistema',
      '#logs': 'Logs e Auditoria',
    };
    return map[currentPath] || 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar currentPath={currentPath} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          userData={userData} 
          onLogout={onLogout} 
          title={getPageTitle()}
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
