
import { ReportData, SubmissionResult } from "../types";

// This service no longer uses AI. It simulates a backend submission.

export const submitReport = async (data: ReportData): Promise<SubmissionResult> => {
  const ADMIN_EMAIL = "tiagomes99@gmail.com";
  
  // Generate a random protocol number first for logging
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  const protocol = `CABV-${timestamp}-${random}`;

  // Simulate network delay for "Excel Generation" and "Cloud Upload"
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Simulate Excel/CSV Row Data
  const csvHeader = "Protocolo;Data;Categoria;Nome;Email;Telefone;Endereço;Alvo;Cargo;Descrição;Violação;Solicita_Especialista;Anexos";
  const csvRow = `${protocol};${data.dateOfIncident};${data.category};${data.isAnonymous ? 'ANONIMO' : data.userName};${data.userEmail};${data.userPhone};${data.userAddress};${data.targetName};${data.targetRole};"${data.description.replace(/\n/g, ' ')}";"${data.possibleViolation || ''}";${data.wantsSpecialistGuidance ? 'SIM' : 'NÃO'};${data.attachments.length}`;
  const fileName = `Relatorio_${protocol}.xlsx`;

  const emailBody = `
    ---------------------------------------------------
    NOVO RELATO RECEBIDO - CABV
    ---------------------------------------------------
    DESTINATÁRIO: ${ADMIN_EMAIL}
    ASSUNTO: Novo ${data.category} - Protocolo ${protocol}
    
    ... (Dados completos disponíveis na planilha anexa) ...
    ---------------------------------------------------
  `;

  // Log the simulation steps
  console.groupCollapsed(`📊 EXCEL GENERATION & CLOUD SYNC - ${protocol}`);
  
  console.log(`[System] Initializing spreadsheet generator engine...`);
  console.log(`[Excel] Creating workbook... OK`);
  console.log(`[Excel] Adding worksheet 'Relatos_2024'... OK`);
  console.log(`[Excel] Appending row data:`);
  console.log(`\x1b[33m${csvHeader}\x1b[0m`);
  console.log(`\x1b[32m${csvRow}\x1b[0m`);
  console.log(`[Excel] Compiling file '${fileName}'... DONE`);

  console.log(`---------------------------------------------------`);

  console.log(`[Auth] Authenticating secure session for admin: ${ADMIN_EMAIL}... OK`);
  console.log(`[Cloud] Connecting to Google Drive Container... OK`);
  
  console.log(`[Upload] Uploading '${fileName}' (${(csvRow.length * 2)} bytes)... 100%`);
  
  if (data.attachments.length > 0) {
    console.log(`[Upload] Processing ${data.attachments.length} evidence attachments...`);
    data.attachments.forEach((att, i) => {
      console.log(`   - Uploading attachment_${i + 1}_${att.type}... 100%`);
    });
  }
  
  console.log(`[Notify] Sending sync confirmation to ${ADMIN_EMAIL}... OK`);
  console.log(`[Success] Data archived successfully.`);
  console.groupEnd();

  return {
    protocol: protocol,
    message: `Relato registrado com sucesso. Planilha Excel gerada.`,
    estimatedResponseTime: "48 a 72 horas úteis"
  };
};