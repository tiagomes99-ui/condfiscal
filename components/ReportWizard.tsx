
import React, { useState, useRef } from 'react';
import { ReportData, ReportCategory, TargetRole, Attachment } from '../types';
import { submitReport } from '../services/geminiService';

interface ReportWizardProps {
  onSuccess: (result: any) => void;
}

const ReportWizard: React.FC<ReportWizardProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ReportData>({
    userName: '',
    userEmail: '',
    userPhone: '',
    userAddress: '',
    isAnonymous: false,
    wantsSpecialistGuidance: true,
    targetName: '',
    targetRole: TargetRole.SINDICO,
    category: ReportCategory.PROTESTO,
    description: '',
    possibleViolation: '',
    dateOfIncident: new Date().toISOString().split('T')[0],
    attachments: [],
  });

  const handleChange = (field: keyof ReportData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: Attachment[] = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'pdf'
      }));
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await submitReport(formData);
      onSuccess(result);
    } catch (error) {
      alert("Erro ao processar o envio. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-slate-800">1. Seus Dados (Morador CABV)</h2>
        <p className="text-sm text-slate-500">
          Suas informações são mantidas sob sigilo pela ouvidoria independente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
            disabled={formData.isAnonymous}
            placeholder={formData.isAnonymous ? "Anônimo" : "João da Silva"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
          <input
            type="tel"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.userPhone}
            onChange={(e) => handleChange('userPhone', e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.userEmail}
            onChange={(e) => handleChange('userEmail', e.target.value)}
            placeholder="joao@exemplo.com"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Endereço / Unidade (Quadra/Lote)</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.userAddress}
            onChange={(e) => handleChange('userAddress', e.target.value)}
            placeholder="Ex: Quadra A, Lote 10"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <input
            type="checkbox"
            id="anon"
            className="h-5 w-5 text-blue-600 rounded"
            checked={formData.isAnonymous}
            onChange={(e) => handleChange('isAnonymous', e.target.checked)}
          />
          <label htmlFor="anon" className="ml-3 text-sm text-slate-700 font-medium cursor-pointer">
            Desejo manter minha identidade anônima para a diretoria.
          </label>
        </div>

        <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <input
            type="checkbox"
            id="specialist"
            className="h-5 w-5 text-blue-600 rounded"
            checked={formData.wantsSpecialistGuidance}
            onChange={(e) => handleChange('wantsSpecialistGuidance', e.target.checked)}
          />
          <label htmlFor="specialist" className="ml-3 text-sm text-slate-700 font-medium cursor-pointer">
            Desejo receber orientações de um especialista sobre este caso.
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-slate-800">2. Detalhes do Relato</h2>
        <p className="text-sm text-slate-500">
          Descreva quem cometeu a irregularidade e o que aconteceu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Relato</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {Object.values(ReportCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Data do Ocorrido</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.dateOfIncident}
            onChange={(e) => handleChange('dateOfIncident', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Envolvido (Diretoria/Staff)</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: Sr. Fulano"
            value={formData.targetName}
            onChange={(e) => handleChange('targetName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cargo / Função</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            value={formData.targetRole}
            onChange={(e) => handleChange('targetRole', e.target.value)}
          >
            {Object.values(TargetRole).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Descrição Detalhada</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
          placeholder="Descreva o que aconteceu, onde e como..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Norma ou Lei Violada (Opcional)</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
          placeholder="Se souber, cite o artigo da convenção, regimento interno ou lei federal..."
          value={formData.possibleViolation || ''}
          onChange={(e) => handleChange('possibleViolation', e.target.value)}
        />
        <p className="text-xs text-slate-400 mt-1">
          Informe se souber qual regra do CABV ou lei foi infringida.
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-slate-800">3. Evidências</h2>
        <p className="text-sm text-slate-500">
          Anexe fotos, vídeos ou PDFs que comprovem o relato.
        </p>
      </div>

      <div 
        className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef} 
          accept="image/*,application/pdf,video/*"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center">
          <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-slate-600 font-medium">Clique para selecionar arquivos</span>
          <span className="text-xs text-slate-400 mt-1">Fotos, Vídeos e PDF suportados</span>
        </div>
      </div>

      {formData.attachments.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-700">Arquivos anexados:</h3>
          {formData.attachments.map((att, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-white border rounded shadow-sm">
              <div className="flex items-center space-x-3">
                {att.type === 'image' && <img src={att.preview} alt="preview" className="h-10 w-10 object-cover rounded" />}
                {att.type === 'pdf' && <div className="h-10 w-10 bg-red-100 flex items-center justify-center rounded text-red-600 font-bold text-xs">PDF</div>}
                {att.type === 'video' && <div className="h-10 w-10 bg-blue-100 flex items-center justify-center rounded text-blue-600 font-bold text-xs">VID</div>}
                <span className="text-sm text-slate-600 truncate max-w-[150px]">{att.file.name}</span>
              </div>
              <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="space-y-2">
          <p className="text-sm text-blue-800">
            <strong>Atenção:</strong> Seu relato será encaminhado para um especialista que entrará em contato para informar sobre possíveis medidas, administrativas ou judiciais, que podem ser adotadas para resolver sua questão.
          </p>
          <p className="text-sm text-blue-800">
            <strong>Observação:</strong> Qualquer medida judicial ou extrajudicial somente será tomada após autorização expressa do usuário.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl mx-auto border border-slate-200">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex space-x-2">
           <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
           <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
           <div className={`h-2 w-12 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
        </div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Passo {step} de 3</span>
      </div>

      <div className="p-6 md:p-8 min-h-[400px]">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-slate-800">Salvando na Nuvem...</h3>
            <p className="text-slate-500 text-center max-w-md mt-2">
              Estamos criptografando seus dados e realizando o upload seguro para a conta administrativa.
            </p>
          </div>
        ) : (
          <>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </>
        )}
      </div>

      {!loading && (
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`px-6 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-200 transition ${step === 1 ? 'invisible' : ''}`}
          >
            Voltar
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(prev => Math.min(3, prev + 1))}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-sm flex items-center space-x-2"
            >
              <span>Enviar {formData.category}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportWizard;
