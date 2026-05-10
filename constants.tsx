
import React from 'react';
import { 
  Zap, 
  Target, 
  Activity, 
  MessageSquare, 
  Droplet, 
  AlertTriangle, 
  Apple, 
  BookOpen,
  Info
} from 'lucide-react-native';

export const COLORS = {
  navy: '#0A192F',
  blue: '#007AFF',
  purple: '#AF52DE',
  red: '#FF453A',
  yellow: '#FFD60A',
  green: '#32D74B'
};

export const QUICK_ACTIONS = [
  {
    id: 'sos',
    title: 'S.O.S',
    subtitle: 'Sintomas agudos',
    icon: <AlertTriangle color="#EF4444" size={32} />,
    color: 'rgba(239, 68, 68, 0.1)',
    tag: 'Emergência'
  },
  {
    id: 'carbs',
    title: 'Check de Carbs',
    subtitle: 'Contagem e doses',
    icon: <Apple color="#EAB308" size={32} />,
    color: 'rgba(234, 179, 8, 0.1)',
    tag: 'Alimentação'
  },
  {
    id: 'physiology',
    title: 'O Sistema',
    subtitle: 'Fisiologia básica',
    icon: <Activity color="#22C55E" size={32} />,
    color: 'rgba(34, 197, 94, 0.1)',
    tag: 'Educação'
  },
  {
    id: 'chatbot',
    title: 'EducaBot',
    subtitle: 'Tire suas dúvidas',
    icon: <MessageSquare color="#A855F7" size={32} />,
    color: 'rgba(168, 85, 247, 0.1)',
    tag: 'AI'
  }
];

export const APP_ZONES = [
  { label: 'Braços', speed: 'Rápida', color: 'bg-blue-500', pos: 'top-1/4' },
  { label: 'Abdome', speed: 'Muito Rápida', color: 'bg-red-500', pos: 'top-1/3 mt-8' },
  { label: 'Coxas', speed: 'Lenta', color: 'bg-yellow-500', pos: 'bottom-1/4' },
  { label: 'Glúteos', speed: 'Média/Lenta', color: 'bg-green-500', pos: 'bottom-1/3' }
];
