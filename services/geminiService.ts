
import { GoogleGenAI } from "@google/genai";

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
  // Always initialize GoogleGenAI with the API_KEY from process.env and restore history in the chat session.
  async sendMessage(history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não configurada.");
    }
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: history,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  }
}
