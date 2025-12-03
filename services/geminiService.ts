
import { ReportData, SubmissionResult } from "../types";

// This service no longer uses AI. It simulates a backend submission.

export const submitReport = async (data: ReportData): Promise<SubmissionResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const ADMIN_EMAIL = "tiagomes99@gmail.com";

  // Formating the email body for the mock console log
  const emailBody = `
    ---------------------------------------------------
    NOVO RELATO RECEBIDO - CABV
    ---------------------------------------------------
    DESTINATÁRIO: ${ADMIN_EMAIL}
    ASSUNTO: Novo ${data.category} - Protocolo Pendente
    
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
  console.group("📧 MOCK EMAIL SERVICE");
  console.log(`Attempting to send email to: ${ADMIN_EMAIL}`);
  console.log("Email Body Preview:", emailBody);
  console.log("Attachments Payload:", data.attachments);
  console.groupEnd();

  // Generate a random protocol number
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  const protocol = `CABV-${timestamp}-${random}`;

  return {
    protocol: protocol,
    message: `Seu relato foi registrado e uma notificação completa foi enviada para o administrador (${ADMIN_EMAIL}).`,
    estimatedResponseTime: "48 a 72 horas úteis"
  };
};
