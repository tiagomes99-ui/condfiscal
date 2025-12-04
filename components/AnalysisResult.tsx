
import React from 'react';
import { SubmissionResult } from '../types';

interface Props {
  data: SubmissionResult;
  onClose: () => void;
}

const AnalysisResult: React.FC<Props> = ({ data, onClose }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
      <div className="bg-green-600 p-8 text-white text-center">
        <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2">Recebemos seu Relato</h2>
        <p className="text-green-100 text-lg px-4">
          {data.message}
        </p>
      </div>

      <div className="p-8 space-y-8">
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Número do Protocolo</span>
          <div className="text-3xl font-mono font-bold text-slate-800 mt-2 select-all">
            {data.protocol}
          </div>
          <p className="text-xs text-slate-400 mt-2">Guarde este número para consultas futuras.</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-b pb-2">Próximos Passos</h3>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
            <div>
              <h4 className="font-semibold text-slate-800">Triagem Inicial</h4>
              <p className="text-slate-600 text-sm mt-1">
                A comissão independente fará a conferência das informações e evidências enviadas.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
            <div>
              <h4 className="font-semibold text-slate-800">Análise Jurídica</h4>
              <p className="text-slate-600 text-sm mt-1">
                Um <strong>especialista em Direito Condominial</strong> analisará o caso para verificar infrações à convenção ou legislação vigente.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">3</div>
            <div>
              <h4 className="font-semibold text-slate-800">Retorno Formal</h4>
              <p className="text-slate-600 text-sm mt-1">
                Você receberá uma resposta formal com orientações e parecer técnico no prazo estimado de <strong>{data.estimatedResponseTime}</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex justify-center">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition shadow-lg"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
