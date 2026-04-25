'use client';

import { useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    mensagem: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const { nome, telefone, mensagem } = formData;
    const finalMensagem = mensagem.trim() || 'Olá, gostaria de fazer um orçamento';
    const apiUrl = '/api/contact';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          telefone,
          mensagem: finalMensagem,
          origem: 'Formulário de Orçamento - Marcos Montador'
        }),
      });

      if (!response.ok) throw new Error('Falha ao enviar');

      sendGAEvent({ event: 'generate_lead', value: 'contact_form' });

      setStatus('success');
      setFormData({ nome: '', telefone: '', mensagem: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-12 text-primary shadow-2xl rounded-3xl">
      <h3 className="text-2xl font-black font-heading mb-2">Solicitar Orçamento</h3>
      <p className="text-gray-500 mb-8 text-sm">Em breve entraremos em contato com você.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="text" 
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Seu Nome" 
          required
          disabled={status === 'loading'}
          className="w-full p-4 bg-gray-50 border-2 border-gray-100 focus:border-accent outline-none transition-colors rounded-xl" 
        />
        <input 
          type="tel" 
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="Seu Telefone" 
          required
          disabled={status === 'loading'}
          className="w-full p-4 bg-gray-50 border-2 border-gray-100 focus:border-accent outline-none transition-colors rounded-xl" 
        />
        <textarea 
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          placeholder="Diga mais sobre o orçamento que deseja" 
          rows={4} 
          disabled={status === 'loading'}
          className="w-full p-4 bg-gray-50 border-2 border-gray-100 focus:border-accent outline-none transition-colors rounded-xl" 
        />
        <button 
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-5 bg-accent text-primary font-black text-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 rounded-full shadow-lg"
        >
          {status === 'loading' ? 'ENVIANDO...' : 'ENVIAR AGORA'}
        </button>
        
        {status === 'success' && (
          <p className="text-green-600 font-bold text-center animate-bounce">✓ Enviado com sucesso!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 font-bold text-center">✕ Erro ao enviar. Tente novamente.</p>
        )}
      </form>
    </div>
  );
}
