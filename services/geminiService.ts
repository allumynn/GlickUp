
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
Você é o EducaDM1, um assistente educativo para adolescentes com Diabetes Tipo 1 (DM1).
Seu tom de voz é moderno, descontraído, acolhedor e focado em autonomia.
Você NÃO prescreve doses de insulina, NÃO faz diagnósticos médicos e NÃO substitui o médico endocrinologista.
Sua missão é explicar conceitos como:
- Fisiologia do pâncreas e insulina.
- Contagem de carboidratos (regra dos 15g, leitura de rótulos).
- Protocolo 15-15 para hipoglicemia.
- Hiperglicemia e hidratação.
- Rotação de locais de aplicação (lipodistrofia).

Sempre reforce que em caso de emergência grave ou dúvidas sobre dosagem, o usuário deve consultar seu médico ou um hospital.
Use linguagem acessível para jovens brasileiros (gírias leves ok, sem excesso).
Se pedirem dose de insulina, diga explicitamente: "Eu não posso calcular doses. Isso é algo que você e seu médico definem no seu plano de tratamento."
`;

export class GeminiService {
  async sendMessage(history: ChatMessage[], message: string) {
    // Note: For Vercel/Vite client-side deployment, the key must be prefixed with VITE_
    const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined");
      throw new Error("GEMINI_API_KEY não configurada no ambiente.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Preparar a história: o Gemini exige que comece com 'user' e alterne
    const contents = history.map(m => ({
      role: m.role as 'user' | 'model',
      parts: m.parts.map(p => ({ text: p.text }))
    }));

    // Remover qualquer mensagem inicial do modelo (bot) se não houver um 'user' antes
    while (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    // Adicionar a mensagem atual do usuário
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      if (!response.text) {
        throw new Error("O modelo retornou uma resposta vazia.");
      }

      return response.text;
    } catch (error) {
      console.error("Erro na API Gemini:", error);
      throw error;
    }
  }
}
