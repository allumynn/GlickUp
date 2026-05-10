
export enum Page {
  Home = 'home',
  Physiology = 'physiology',
  Insulin = 'insulin',
  Carbs = 'carbs',
  SOS = 'sos',
  Chatbot = 'chatbot'
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface MythCard {
  title: string;
  description: string;
  isTrue: boolean;
}
