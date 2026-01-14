
export type UserRole = 'admin' | 'funcionario';

export interface User {
  id: string;
  nome: string;
  login: string;
  perfil: UserRole;
  ativo: boolean;
  criado_em: string;
}

export interface RegistroPonto {
  id: string;
  usuario_id: string;
  empresa_id: string;
  usuario_nome?: string;
  tipo: 'entrada' | 'pausa' | 'retorno' | 'saida';
  data_hora: string;
  latitude?: number;
  longitude?: number;
  ip?: string;
  criado_em: string;
}

export interface Solicitacao {
  id: string;
  usuario_id: string;
  empresa_id: string;
  usuario_nome?: string;
  motivo: string;
  data_inicio: string;
  data_fim?: string;
  justificativa: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  aprovado_por?: string;
  aprovado_em?: string;
  criado_em: string;
}

export interface DashboardData {
  totalFuncionarios: number;
  pontosHoje: number;
  ausentesHoje: number;
  horasExtrasMes: number;
  horasNegativasMes: number;
  solicitacoesPendentes: number;
}

export interface BancoHoras {
  id: string;
  usuario_id: string;
  empresa_id: string;
  data: string;
  horas_trabalhadas: string; // intervalo do postgres
  horas_esperadas: string;
  saldo: string;
  usuario_nome?: string;
  criado_em: string;
}

export interface LogAuditoria {
  id: string;
  usuario_id: string;
  admin_nome?: string;
  acao: string;
  detalhes: string;
  ip?: string;
  criado_em: string;
}

export interface EmpresaConfig {
  id: string;
  empresa_id: string;
  carga_horaria_diaria: string; // interval
  tolerancia_minutos: number;
  permite_banco_horas: boolean;
  criado_em: string;
}
