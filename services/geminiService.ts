
import { ReportData, SubmissionResult } from "../types";

// This service no longer uses AI. It simulates a backend submission.

export const submitReport = async (data: ReportData): Promise<SubmissionResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate a random protocol number
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  const protocol = `CABV-${timestamp}-${random}`;

  return {
    protocol: protocol,
    message: "Seu relato foi registrado com sucesso em nossa base de dados segura.",
    estimatedResponseTime: "48 a 72 horas úteis"
  };
};
