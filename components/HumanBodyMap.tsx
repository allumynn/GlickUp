import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { Target, Zap, RotateCw, BookOpen, Check, Compass, ShieldAlert } from 'lucide-react';

export interface ZoneData {
  id: string;
  name: string;
  officialName: string;
  viewSide: 'frente' | 'costas';
  speed: string;
  speedLevel: 'muito_rapida' | 'rapida' | 'media' | 'lenta';
  color: string;
  tagColor: string;
  bgRgba: string;
  locationShort: string;
  idealForShort: string;
  rotationShort: string;
}

export const MS_APPLICATION_ZONES: ZoneData[] = [
  {
    id: 'abdomen',
    name: 'Abdômen',
    officialName: 'Região Abdominal',
    viewSide: 'frente',
    speed: 'Muito Rápida',
    speedLevel: 'muito_rapida',
    color: '#EF4444',
    tagColor: '#F87171',
    bgRgba: 'rgba(239, 68, 68, 0.16)',
    locationShort: 'Laterais da barriga, respeitando 3 cm (2-3 dedos) do umbigo.',
    idealForShort: 'Insulina Rápida e Ultrarrápida (bolus das refeições).',
    rotationShort: 'Alterne os 4 quadrantes a cada aplicação (distância mínima de 1 cm).'
  },
  {
    id: 'coxas',
    name: 'Coxas',
    officialName: 'Face Externa da Coxa',
    viewSide: 'frente',
    speed: 'Lenta',
    speedLevel: 'lenta',
    color: '#EAB308',
    tagColor: '#FACC15',
    bgRgba: 'rgba(234, 179, 8, 0.16)',
    locationShort: 'Frente e lateral externa da coxa (faixa intermediária).',
    idealForShort: 'Insulina Basal / Lenta (NPH, Glargina, Degludeca).',
    rotationShort: 'Varie os pontos em linha ou zigue-zague ao longo da lateral.'
  },
  {
    id: 'bracos',
    name: 'Braços',
    officialName: 'Face Posterior do Braço',
    viewSide: 'costas',
    speed: 'Rápida',
    speedLevel: 'rapida',
    color: '#3B82F6',
    tagColor: '#60A5FA',
    bgRgba: 'rgba(59, 130, 246, 0.16)',
    locationShort: 'Atrás do braço, 3 a 4 dedos abaixo do ombro e acima do cotovelo.',
    idealForShort: 'Insulinas Rápidas / Bolus intermediários.',
    rotationShort: 'Alterne entre o braço direito e o esquerdo.'
  },
  {
    id: 'nadegas',
    name: 'Nádegas',
    officialName: 'Quadrante Superior Externo',
    viewSide: 'costas',
    speed: 'Média a Lenta',
    speedLevel: 'media',
    color: '#10B981',
    tagColor: '#34D399',
    bgRgba: 'rgba(16, 185, 129, 0.16)',
    locationShort: 'Parte superior e lateral dos glúteos (flancos).',
    idealForShort: 'Insulina Basal / Noturna (menor sensibilidade e dor).',
    rotationShort: 'Excelente para descansar o abdômen e evitar nódulos.'
  }
];

interface HumanBodyMapProps {
  onSelectZone?: (zone: ZoneData | null) => void;
}

export const HumanBodyMap: React.FC<HumanBodyMapProps> = ({ onSelectZone }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('abdomen');
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'frente' | 'costas'>('frente');

  const activeZone = MS_APPLICATION_ZONES.find(z => z.id === (hoveredZoneId || selectedZoneId)) || MS_APPLICATION_ZONES[0];

  const handleZoneSelect = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    const z = MS_APPLICATION_ZONES.find(item => item.id === zoneId) || null;
    if (z) {
      if (z.viewSide !== currentView) {
        setCurrentView(z.viewSide);
      }
    }
    if (onSelectZone) onSelectZone(z);
  };

  const isZoneActive = (zoneId: string) => (hoveredZoneId === zoneId || selectedZoneId === zoneId);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.msBadge}>
          <BookOpen size={13} color="#38BDF8" style={{ marginRight: 6 }} />
          <Text style={styles.msBadgeText}>Locais Oficiais de Aplicação (SBD/MS)</Text>
        </View>

        <View style={styles.viewToggleGroup}>
          <TouchableOpacity
            style={[styles.viewToggleBtn, currentView === 'frente' && styles.viewToggleBtnActive]}
            onPress={() => {
              setCurrentView('frente');
              if (selectedZoneId === 'nadegas' || selectedZoneId === 'bracos') {
                setSelectedZoneId('abdomen');
              }
            }}
          >
            <Text style={[styles.viewToggleText, currentView === 'frente' && styles.viewToggleTextActive]}>
              Frente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.viewToggleBtn, currentView === 'costas' && styles.viewToggleBtnActive]}
            onPress={() => {
              setCurrentView('costas');
              if (selectedZoneId === 'abdomen' || selectedZoneId === 'coxas') {
                setSelectedZoneId('nadegas');
              }
            }}
          >
            <Text style={[styles.viewToggleText, currentView === 'costas' && styles.viewToggleTextActive]}>
              Costas
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Layout */}
      <View style={styles.layoutRow}>
        {/* Left: Anatomical Human Vector Display */}
        <View style={styles.humanStage}>
          <View style={styles.svgWrapper}>
            <svg 
              viewBox="0 0 320 460" 
              style={{ width: '100%', height: 'auto', maxHeight: '430px', overflow: 'visible' }}
            >
              <defs>
                <filter id="zoneGlowDark" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <linearGradient id="bodyDarkBase" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="60%" stopColor="#0F172A" />
                  <stop offset="100%" stopColor="#090D16" />
                </linearGradient>

                <linearGradient id="bodyOutlineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#64748B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Guide center line */}
              <line x1="160" y1="20" x2="160" y2="440" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.5" />

              {/* =================================================== */}
              {/* 1. FRONT VIEW */}
              {/* =================================================== */}
              {currentView === 'frente' && (
                <g id="frontBodyGroup">
                  {/* Head */}
                  <path
                    d="M 160 22
                       C 174 22, 182 32, 182 46
                       C 182 60, 174 70, 168 76
                       C 165 78, 163 79, 160 79
                       C 157 79, 155 78, 152 76
                       C 146 70, 138 60, 138 46
                       C 138 32, 146 22, 160 22 Z"
                    fill="url(#bodyDarkBase)"
                    stroke="url(#bodyOutlineGrad)"
                    strokeWidth="1.5"
                  />
                  <path d="M 138 44 C 137 30, 146 19, 160 19 C 174 19, 183 30, 182 44 C 176 33, 168 28, 160 28 C 152 28, 144 33, 138 44 Z" fill="#334155" />
                  <path d="M 138 42 C 135 42, 135 50, 138 52" stroke="#475569" strokeWidth="1.2" fill="none" />
                  <path d="M 182 42 C 185 42, 185 50, 182 52" stroke="#475569" strokeWidth="1.2" fill="none" />

                  {/* Body Silhouette */}
                  <path
                    d="M 152 76
                       L 152 88
                       C 142 90, 126 96, 116 104
                       L 78 136
                       C 68 146, 54 162, 42 180
                       C 38 186, 40 194, 48 194
                       C 56 194, 62 186, 68 174
                       L 98 146
                       C 106 138, 112 130, 116 122
                       C 118 136, 122 152, 124 168
                       C 125 178, 124 188, 122 202
                       C 120 216, 118 230, 118 244
                       C 118 268, 122 296, 123 326
                       C 124 350, 122 384, 120 418
                       C 118 428, 122 436, 132 436
                       C 142 436, 146 428, 144 418
                       C 142 384, 145 350, 146 326
                       C 147 296, 152 268, 156 244
                       C 158 234, 160 228, 160 224
                       C 160 228, 162 234, 164 244
                       C 168 268, 173 296, 174 326
                       C 175 350, 178 384, 176 418
                       C 174 428, 178 436, 188 436
                       C 198 436, 202 428, 200 418
                       C 198 384, 196 350, 197 326
                       C 198 296, 202 268, 202 244
                       C 202 230, 200 216, 198 202
                       C 196 188, 195 178, 196 168
                       C 198 152, 202 136, 204 122
                       C 208 130, 214 138, 222 146
                       L 252 174
                       C 258 186, 264 194, 272 194
                       C 280 194, 282 186, 278 180
                       C 266 162, 252 146, 242 136
                       L 204 104
                       C 194 96, 178 90, 168 88
                       L 168 76
                       Z"
                    fill="url(#bodyDarkBase)"
                    stroke="url(#bodyOutlineGrad)"
                    strokeWidth="1.5"
                  />

                  {/* Contours */}
                  <path d="M 142 98 Q 160 102 178 98" stroke="#475569" strokeWidth="1.2" fill="none" opacity="0.6" />
                  <path d="M 130 122 Q 145 128 158 124" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.5" />
                  <path d="M 190 122 Q 175 128 162 124" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.5" />

                  {/* Umbigo */}
                  <circle cx="160" cy="178" r="2.5" fill="#64748B" />
                  <circle cx="160" cy="178" r="9" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" fill="none" opacity="0.7" />

                  {/* 1. ABDOMEN GRID */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneSelect('abdomen')}
                    onMouseEnter={() => setHoveredZoneId('abdomen')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    <rect 
                      x="126" 
                      y="166" 
                      width="24" 
                      height="24" 
                      rx="4"
                      fill={isZoneActive('abdomen') ? 'rgba(239, 68, 68, 0.45)' : 'rgba(239, 68, 68, 0.18)'}
                      stroke="#EF4444" 
                      strokeWidth={isZoneActive('abdomen') ? '2' : '1.2'}
                      filter={isZoneActive('abdomen') ? 'url(#zoneGlowDark)' : undefined}
                    />
                    <line x1="138" y1="166" x2="138" y2="190" stroke="#EF4444" strokeWidth="0.9" />
                    <line x1="126" y1="178" x2="150" y2="178" stroke="#EF4444" strokeWidth="0.9" />

                    <rect 
                      x="170" 
                      y="166" 
                      width="24" 
                      height="24" 
                      rx="4"
                      fill={isZoneActive('abdomen') ? 'rgba(239, 68, 68, 0.45)' : 'rgba(239, 68, 68, 0.18)'}
                      stroke="#EF4444" 
                      strokeWidth={isZoneActive('abdomen') ? '2' : '1.2'}
                      filter={isZoneActive('abdomen') ? 'url(#zoneGlowDark)' : undefined}
                    />
                    <line x1="182" y1="166" x2="182" y2="190" stroke="#EF4444" strokeWidth="0.9" />
                    <line x1="170" y1="178" x2="194" y2="178" stroke="#EF4444" strokeWidth="0.9" />

                    <circle cx="138" cy="178" r="3.5" fill="#EF4444" stroke="#FFF" strokeWidth="1.2" />
                    <circle cx="182" cy="178" r="3.5" fill="#EF4444" stroke="#FFF" strokeWidth="1.2" />

                    {/* Tag Label */}
                    <line x1="194" y1="178" x2="232" y2="178" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3,2" />
                    <circle cx="232" cy="178" r="2" fill="#EF4444" />
                    <rect x="234" y="167" width="76" height="22" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="#EF4444" strokeWidth="1" />
                    <text x="272" y="181" fontSize="8" fill="#F87171" fontWeight="bold" textAnchor="middle">Abdômen</text>
                  </g>

                  {/* 2. COXAS GRID */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneSelect('coxas')}
                    onMouseEnter={() => setHoveredZoneId('coxas')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    <rect 
                      x="122" 
                      y="252" 
                      width="22" 
                      height="46" 
                      rx="4"
                      fill={isZoneActive('coxas') ? 'rgba(234, 179, 8, 0.45)' : 'rgba(234, 179, 8, 0.18)'}
                      stroke="#EAB308" 
                      strokeWidth={isZoneActive('coxas') ? '2' : '1.2'}
                      filter={isZoneActive('coxas') ? 'url(#zoneGlowDark)' : undefined}
                    />
                    <line x1="133" y1="252" x2="133" y2="298" stroke="#EAB308" strokeWidth="0.9" />
                    <line x1="122" y1="267" x2="144" y2="267" stroke="#EAB308" strokeWidth="0.9" />
                    <line x1="122" y1="282" x2="144" y2="282" stroke="#EAB308" strokeWidth="0.9" />

                    <rect 
                      x="176" 
                      y="252" 
                      width="22" 
                      height="46" 
                      rx="4"
                      fill={isZoneActive('coxas') ? 'rgba(234, 179, 8, 0.45)' : 'rgba(234, 179, 8, 0.18)'}
                      stroke="#EAB308" 
                      strokeWidth={isZoneActive('coxas') ? '2' : '1.2'}
                      filter={isZoneActive('coxas') ? 'url(#zoneGlowDark)' : undefined}
                    />
                    <line x1="187" y1="252" x2="187" y2="298" stroke="#EAB308" strokeWidth="0.9" />
                    <line x1="176" y1="267" x2="198" y2="267" stroke="#EAB308" strokeWidth="0.9" />
                    <line x1="176" y1="282" x2="198" y2="282" stroke="#EAB308" strokeWidth="0.9" />

                    <circle cx="133" cy="275" r="3.5" fill="#EAB308" stroke="#FFF" strokeWidth="1.2" />
                    <circle cx="187" cy="275" r="3.5" fill="#EAB308" stroke="#FFF" strokeWidth="1.2" />

                    {/* Tag Label */}
                    <line x1="122" y1="275" x2="84" y2="275" stroke="#EAB308" strokeWidth="1.2" strokeDasharray="3,2" />
                    <circle cx="84" cy="275" r="2" fill="#EAB308" />
                    <rect x="8" y="264" width="74" height="22" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="#EAB308" strokeWidth="1" />
                    <text x="45" y="278" fontSize="8" fill="#FACC15" fontWeight="bold" textAnchor="middle">Coxas</text>
                  </g>
                </g>
              )}

              {/* =================================================== */}
              {/* 2. BACK VIEW */}
              {/* =================================================== */}
              {currentView === 'costas' && (
                <g id="backBodyGroup">
                  <path
                    d="M 160 20
                       C 174 20, 182 30, 182 44
                       C 182 58, 174 68, 168 74
                       C 165 76, 163 77, 160 77
                       C 157 77, 155 76, 152 74
                       C 146 68, 138 58, 138 44
                       C 138 30, 146 20, 160 20 Z"
                    fill="#334155"
                    stroke="url(#bodyOutlineGrad)"
                    strokeWidth="1.5"
                  />
                  <path d="M 152 74 L 152 88 C 152 90, 156 92, 160 92 C 164 92, 168 90, 168 88 L 168 74 Z" fill="url(#bodyDarkBase)" stroke="url(#bodyOutlineGrad)" strokeWidth="1.2" />

                  <path
                    d="M 152 76
                       L 152 88
                       C 142 90, 126 96, 116 104
                       L 78 136
                       C 68 146, 54 162, 42 180
                       C 38 186, 40 194, 48 194
                       C 56 194, 62 186, 68 174
                       L 98 146
                       C 106 138, 112 130, 116 122
                       C 118 136, 122 152, 124 168
                       C 125 178, 124 188, 122 202
                       C 120 216, 118 230, 118 244
                       C 118 268, 122 296, 123 326
                       C 124 350, 122 384, 120 418
                       C 118 428, 122 436, 132 436
                       C 142 436, 146 428, 144 418
                       C 142 384, 145 350, 146 326
                       C 147 296, 152 268, 156 244
                       C 158 234, 160 228, 160 224
                       C 160 228, 162 234, 164 244
                       C 168 268, 173 296, 174 326
                       C 175 350, 178 384, 176 418
                       C 174 428, 178 436, 188 436
                       C 198 436, 202 428, 200 418
                       C 198 384, 196 350, 197 326
                       C 198 296, 202 268, 202 244
                       C 202 230, 200 216, 198 202
                       C 196 188, 195 178, 196 168
                       C 198 152, 202 136, 204 122
                       C 208 130, 214 138, 222 146
                       L 252 174
                       C 258 186, 264 194, 272 194
                       C 280 194, 282 186, 278 180
                       C 266 162, 252 146, 242 136
                       L 204 104
                       C 194 96, 178 90, 168 88
                       L 168 76
                       Z"
                    fill="url(#bodyDarkBase)"
                    stroke="url(#bodyOutlineGrad)"
                    strokeWidth="1.5"
                  />

                  {/* Spine & gluteal cleft */}
                  <path d="M 160 90 L 160 194" stroke="#475569" strokeWidth="1.2" strokeDasharray="4,2" opacity="0.6" />
                  <path d="M 160 194 L 160 236" stroke="#475569" strokeWidth="1.2" opacity="0.7" />
                  <path d="M 124 236 C 136 246, 148 246, 160 236 C 172 246, 184 246, 196 236" stroke="#475569" strokeWidth="1.2" fill="none" opacity="0.7" />

                  {/* 3. BRAÇOS GRID */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneSelect('bracos')}
                    onMouseEnter={() => setHoveredZoneId('bracos')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    <g transform="rotate(35 88 136)">
                      <rect 
                        x="76" 
                        y="124" 
                        width="24" 
                        height="24" 
                        rx="3"
                        fill={isZoneActive('bracos') ? 'rgba(59, 130, 246, 0.45)' : 'rgba(59, 130, 246, 0.18)'}
                        stroke="#3B82F6" 
                        strokeWidth={isZoneActive('bracos') ? '2' : '1.2'}
                        filter={isZoneActive('bracos') ? 'url(#zoneGlowDark)' : undefined}
                      />
                      <line x1="88" y1="124" x2="88" y2="148" stroke="#3B82F6" strokeWidth="0.9" />
                      <line x1="76" y1="136" x2="100" y2="136" stroke="#3B82F6" strokeWidth="0.9" />
                      <circle cx="88" cy="136" r="3.5" fill="#3B82F6" stroke="#FFF" strokeWidth="1.2" />
                    </g>

                    <g transform="rotate(-35 232 136)">
                      <rect 
                        x="220" 
                        y="124" 
                        width="24" 
                        height="24" 
                        rx="3"
                        fill={isZoneActive('bracos') ? 'rgba(59, 130, 246, 0.45)' : 'rgba(59, 130, 246, 0.18)'}
                        stroke="#3B82F6" 
                        strokeWidth={isZoneActive('bracos') ? '2' : '1.2'}
                        filter={isZoneActive('bracos') ? 'url(#zoneGlowDark)' : undefined}
                      />
                      <line x1="232" y1="124" x2="232" y2="148" stroke="#3B82F6" strokeWidth="0.9" />
                      <line x1="220" y1="136" x2="244" y2="136" stroke="#3B82F6" strokeWidth="0.9" />
                      <circle cx="232" cy="136" r="3.5" fill="#3B82F6" stroke="#FFF" strokeWidth="1.2" />
                    </g>

                    {/* Tag Label */}
                    <line x1="245" y1="126" x2="238" y2="92" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="3,2" />
                    <circle cx="238" cy="92" r="2" fill="#3B82F6" />
                    <rect x="236" y="80" width="76" height="22" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="#3B82F6" strokeWidth="1" />
                    <text x="274" y="94" fontSize="8" fill="#60A5FA" fontWeight="bold" textAnchor="middle">Braços</text>
                  </g>

                  {/* 4. NÁDEGAS GRID */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneSelect('nadegas')}
                    onMouseEnter={() => setHoveredZoneId('nadegas')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    <rect 
                      x="126" 
                      y="198" 
                      width="24" 
                      height="24" 
                      rx="3"
                      fill={isZoneActive('nadegas') ? 'rgba(16, 185, 129, 0.45)' : 'rgba(16, 185, 129, 0.18)'}
                      stroke="#10B981" 
                      strokeWidth={isZoneActive('nadegas') ? '2' : '1.2'}
                      filter={isZoneActive('nadegas') ? 'url(#zoneGlowDark)' : undefined}
                    />
                    <line x1="138" y1="198" x2="138" y2="222" stroke="#10B981" strokeWidth="0.9" />
                    <line x1="126" y1="210" x2="150" y2="210" stroke="#10B981" strokeWidth="0.9" />

                    <rect 
                      x="170" 
                      y="198" 
                      width="24" 
                      height="24" 
                      rx="3"
                      fill={isZoneActive('nadegas') ? 'rgba(16, 185, 129, 0.45)' : 'rgba(16, 185, 129, 0.18)'}
                      stroke="#10B981" 
                      strokeWidth={isZoneActive('nadegas') ? '2' : '1.2'}
                      filter={isZoneActive('nadegas') ? 'url(#zoneGlowDark)' : undefined}
                    />
                    <line x1="182" y1="198" x2="182" y2="222" stroke="#10B981" strokeWidth="0.9" />
                    <line x1="170" y1="210" x2="194" y2="210" stroke="#10B981" strokeWidth="0.9" />

                    <circle cx="138" cy="210" r="3.5" fill="#10B981" stroke="#FFF" strokeWidth="1.2" />
                    <circle cx="182" cy="210" r="3.5" fill="#10B981" stroke="#FFF" strokeWidth="1.2" />

                    {/* Tag Label */}
                    <line x1="126" y1="210" x2="88" y2="210" stroke="#10B981" strokeWidth="1.2" strokeDasharray="3,2" />
                    <circle cx="88" cy="210" r="2" fill="#10B981" />
                    <rect x="8" y="199" width="76" height="22" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="#10B981" strokeWidth="1" />
                    <text x="46" y="213" fontSize="8" fill="#34D399" fontWeight="bold" textAnchor="middle">Nádegas</text>
                  </g>
                </g>
              )}
            </svg>
          </View>
        </View>

        {/* Right: Balanced, well-spaced column filling the whole height */}
        <View style={styles.specsColumn}>
          {/* 1. Interactive 4-Zones Selector Grid */}
          <View style={styles.zonesSection}>
            <Text style={styles.columnSectionLabel}>Selecione a Região:</Text>
            <View style={styles.zonesGrid}>
              {MS_APPLICATION_ZONES.map((zone) => {
                const isActive = zone.id === activeZone.id;
                return (
                  <TouchableOpacity
                    key={zone.id}
                    style={[
                      styles.zoneItemCard,
                      isActive && { backgroundColor: zone.bgRgba, borderColor: zone.color, borderWidth: 1.5 }
                    ]}
                    onPress={() => handleZoneSelect(zone.id)}
                  >
                    <View style={[styles.zoneDot, { backgroundColor: zone.color }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.zoneItemTitle, isActive && { color: '#FFFFFF', fontWeight: 'bold' }]}>
                        {zone.name}
                      </Text>
                      <Text style={[styles.zoneItemSubtitle, isActive && { color: zone.tagColor }]}>
                        {zone.speed}
                      </Text>
                    </View>
                    {isActive && <Check size={14} color={zone.color} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 2. Detailed Specs Box for Active Zone */}
          <View style={[styles.detailBox, { borderColor: activeZone.color }]}>
            <View style={styles.detailBoxHeader}>
              <View style={[styles.detailIconWrap, { backgroundColor: activeZone.bgRgba }]}>
                <Target size={18} color={activeZone.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailBoxTitle}>{activeZone.officialName}</Text>
                <View style={[styles.speedBadge, { backgroundColor: activeZone.bgRgba }]}>
                  <Zap size={10} color={activeZone.color} style={{ marginRight: 4 }} />
                  <Text style={[styles.speedBadgeText, { color: activeZone.tagColor }]}>
                    Absorção {activeZone.speed}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.detailContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailRowLabel}>📍 Local de aplicação:</Text>
                <Text style={styles.detailRowValue}>{activeZone.locationShort}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailRowLabel}>💉 Insulina recomendada:</Text>
                <Text style={styles.detailRowValue}>{activeZone.idealForShort}</Text>
              </View>

              <View style={styles.rotationRow}>
                <View style={styles.rotationHeader}>
                  <RotateCw size={11} color="#60A5FA" style={{ marginRight: 5 }} />
                  <Text style={styles.rotationTitle}>Rodízio recomendado:</Text>
                </View>
                <Text style={styles.rotationText}>{activeZone.rotationShort}</Text>
              </View>
            </View>
          </View>

          {/* 3. Bottom Quick Rules Card (Fills bottom naturally) */}
          <View style={styles.bottomTipsCard}>
            <View style={styles.bottomTipsHeader}>
              <Compass size={14} color="#38BDF8" style={{ marginRight: 6 }} />
              <Text style={styles.bottomTipsTitle}>Regra Rápida de Velocidade</Text>
            </View>
            <Text style={styles.bottomTipsDesc}>
              <Text style={{ color: '#F87171', fontWeight: 'bold' }}>Abdômen</Text> (mais rápida) &gt; <Text style={{ color: '#60A5FA', fontWeight: 'bold' }}>Braços</Text> &gt; <Text style={{ color: '#34D399', fontWeight: 'bold' }}>Nádegas</Text> &gt; <Text style={{ color: '#FACC15', fontWeight: 'bold' }}>Coxas</Text> (mais lenta).
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  topBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  msBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  msBadgeText: {
    color: '#38BDF8',
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  viewToggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  viewToggleBtn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 7,
  },
  viewToggleBtnActive: {
    backgroundColor: '#2563EB',
  },
  viewToggleText: {
    color: '#94A3B8',
    fontSize: 11.5,
    fontWeight: '600',
  },
  viewToggleTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  layoutRow: {
    flexDirection: Platform.OS === 'web' && (typeof window !== 'undefined' && window.innerWidth > 768) ? 'row' : 'column',
    gap: 16,
    alignItems: 'stretch',
  },
  humanStage: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 430,
  },
  svgWrapper: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specsColumn: {
    flex: 1.15,
    justifyContent: 'space-between',
    gap: 12,
  },
  columnSectionLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  zonesSection: {
    gap: 4,
  },
  zonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  zoneItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    flexBasis: '48%',
    flexGrow: 1,
  },
  zoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  zoneItemTitle: {
    color: '#CBD5E1',
    fontSize: 12.5,
    fontWeight: '600',
  },
  zoneItemSubtitle: {
    color: '#64748B',
    fontSize: 10.5,
    marginTop: 1,
  },
  detailBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    flex: 1,
    justifyContent: 'center',
  },
  detailBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 10,
    marginBottom: 10,
  },
  detailIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBoxTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  speedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginTop: 3,
  },
  speedBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  detailContent: {
    gap: 9,
  },
  detailRow: {
    gap: 2,
  },
  detailRowLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  detailRowValue: {
    color: '#E2E8F0',
    fontSize: 12,
    lineHeight: 17,
  },
  rotationRow: {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    borderRadius: 8,
    padding: 9,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
    marginTop: 2,
  },
  rotationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rotationTitle: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: 'bold',
  },
  rotationText: {
    color: '#CBD5E1',
    fontSize: 11.5,
    lineHeight: 16,
  },
  bottomTipsCard: {
    backgroundColor: 'rgba(56, 189, 248, 0.06)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
  },
  bottomTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bottomTipsTitle: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bottomTipsDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 15,
  },
});

export default HumanBodyMap;
