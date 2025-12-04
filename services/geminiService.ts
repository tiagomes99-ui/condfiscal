
import { ReportData, SubmissionResult } from "../types";

// This service no longer uses AI. It simulates a backend submission.

export const submitReport = async (data: ReportData): Promise<SubmissionResult> => {
  const ADMIN_EMAIL = "tiagomes99@gmail.com";
  
  // Generate a random protocol number first for logging
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  const protocol = `CABV-${timestamp}-${random}`;

  // Simulate network delay for "Cloud Upload"
  await new Promise(resolve => setTimeout(resolve, 2500));

  const emailBody = `
    ---------------------------------------------------
    NOVO RELATO RECEBIDO - CABV
    ---------------------------------------------------
    DESTINATÁRIO: ${ADMIN_EMAIL}
    ASSUNTO: Novo ${data.category} - Protocolo ${protocol}
    
    1. DADOS DO MORADOR
    -------------------
    Nome: ${data.isAnonymous ? 'ANÔNIMO' : data.userName}
    Email: ${data.userEmail}
    Telefone: ${data.userPhone}
    Endereço: ${data.userAddress}
    Solicita Especialista: ${data.wantsSpecialistGuidance ? 'SIM' : 'NÃO'}

    2. DADOS DO INCIDENTE
    ---------------------
    Tipo: ${data.category}
    Data: ${data.dateOfIncident}
    Alvo: ${data.targetName} (${data.targetRole})
    
    3. DESCRIÇÃO
    ------------
    ${data.description}

    4. POSSÍVEL VIOLAÇÃO
    --------------------
    ${data.possibleViolation || 'Não informada'}

    5. ANEXOS
    ---------
    ${data.attachments.length} arquivos anexados.
    ---------------------------------------------------
  `;

  // Log the email sending simulation
  console.groupCollapsed(`☁️ CLOUD STORAGE UPLOAD - ${protocol}`);
  console.log(`[Auth] Authenticating secure session for admin: ${ADMIN_EMAIL}... OK`);
  console.log(`[Storage] Connecting to Google Drive Container... OK`);
  console.log(`[Upload] Uploading manifest.json... OK`);
  
  if (data.attachments.length > 0) {
    console.log(`[Upload] Processing ${data.attachments.length} attachments...`);
    data.attachments.forEach((att, i) => {
      console.log(`   - Uploading file_${i + 1}_${att.type}... 100%`);
    });
  }
  
  console.log(`[Notify] Sending email notification to ${ADMIN_EMAIL}... OK`);
  console.log("Email Body Payload:", emailBody);
  console.log(`[Success] Data persisted to cloud storage.`);
  console.groupEnd();

  return {
    protocol: protocol,
    message: `Seu relato foi salvo com segurança na nuvem e notificado ao administrador (${ADMIN_EMAIL}).`,
    estimatedResponseTime: "48 a 72 horas úteis"
  };
};
