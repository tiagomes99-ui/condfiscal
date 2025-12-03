
export enum ReportCategory {
  PROTESTO = 'Protesto',
  RECLAMACAO = 'Reclamação',
  CONSULTA = 'Consulta',
  SUGESTAO = 'Sugestão',
}

export enum TargetRole {
  SINDICO = 'Síndico',
  SUBSINDICO = 'Subsíndico',
  CONSELHEIRO = 'Conselheiro Fiscal',
  ADMINISTRADORA = 'Administradora',
  ZELADOR = 'Zelador/Gerente',
  OUTRO = 'Outro',
}

export interface Attachment {
  file: File;
  preview: string;
  type: 'image' | 'video' | 'pdf';
}

export interface ReportData {
  // User Info
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  isAnonymous: boolean;
  wantsSpecialistGuidance: boolean; 

  // Target Info
  targetName: string;
  targetRole: TargetRole;

  // Incident Info
  category: ReportCategory;
  description: string;
  possibleViolation?: string;
  dateOfIncident: string;
  
  // Files
  attachments: Attachment[];
}

export interface SubmissionResult {
  protocol: string;
  message: string;
  estimatedResponseTime: string;
}
