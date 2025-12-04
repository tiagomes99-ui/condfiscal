
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
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Análise Especializada</h3>
                <p className="text-slate-600 text-sm">
                  Todos os casos são avaliados por especialistas em direito condominial, garantindo a melhor orientação legal.
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
