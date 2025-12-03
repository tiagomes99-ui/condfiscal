
import React, { useState } from 'react';
import Header from './components/Header';
import ReportWizard from './components/ReportWizard';
import AnalysisResult from './components/AnalysisResult';
import { SubmissionResult } from './types';

function App() {
  const [view, setView] = useState<'home' | 'form' | 'result'>('home');
  const [submissionData, setSubmissionData] = useState<SubmissionResult | null>(null);

  const handleStartReport = () => {
    setView('form');
  };

  const handleReportSuccess = (data: SubmissionResult) => {
    setSubmissionData(data);
    setView('result');
  };

  const handleReset = () => {
    setView('home');
    setSubmissionData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {view === 'home' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center py-10">
              <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                Exclusivo para moradores do Condomínio Alto da Boa Vista (CABV)
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Transparência e Ética no CABV
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Um canal seguro e independente para reportar irregularidades, enviar reclamações, sugestões ou esclarecer dúvidas sobre a gestão do nosso condomínio.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={handleStartReport}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition transform"
                >
                  Novo Protesto / Sugestão
                </button>
              </div>

              <p className="mt-6 text-sm text-slate-500 max-w-lg mx-auto">
                <span className="font-bold">Nota:</span> Todos os relatos receberão uma resposta formal de um especialista.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Segurança Total</h3>
                <p className="text-slate-600 text-sm">
                  Opção de envio anônimo. Seus dados são criptografados e acessíveis apenas pela ouvidoria independente.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                   <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Análise Especializada</h3>
                <p className="text-slate-600 text-sm">
                  Receba atendimento personalizado de uma comissão independente e especialistas em direito condominial.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                   <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Resolução Eficaz</h3>
                <p className="text-slate-600 text-sm">
                  Acompanhamento até a resolução final pela associação de moradores ou comissão independente.
                </p>
              </div>
            </div>
          </div>
        )}

        {view === 'form' && (
          <ReportWizard onSuccess={handleReportSuccess} />
        )}

        {view === 'result' && submissionData && (
          <AnalysisResult data={submissionData} onClose={handleReset} />
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 CondoGuardian - Ouvidoria CABV. Todos os direitos reservados.</p>
          <p className="text-xs mt-2">Plataforma independente de gestão de integridade para o Condomínio Alto da Boa Vista.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
