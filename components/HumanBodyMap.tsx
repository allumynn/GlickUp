import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { Target, Zap, Shield, Sparkles, Check, ArrowRight, RotateCw } from 'lucide-react';

export interface ZoneData {
  id: string;
  name: string;
  speed: string;
  speedLevel: 'muito_rapida' | 'rapida' | 'media' | 'lenta';
  color: string;
  tagColor: string;
  bgRgba: string;
  exactLocation: string;
  idealFor: string;
  rotationTip: string;
  views: ('front' | 'back')[];
}

export const APPLICATION_ZONES: ZoneData[] = [
  {
    id: 'abdomen',
    name: 'Abdômen',
    speed: 'Muito Rápida',
    speedLevel: 'muito_rapida',
    color: '#EF4444',
    tagColor: '#F87171',
    bgRgba: 'rgba(239, 68, 68, 0.25)',
    exactLocation: 'Região lateral e ao redor do umbigo, mantendo distância mínima de 2 a 3 dedos do umbigo.',
    idealFor: 'Insulina ultrarrápida / rápida (bônus das refeições ou correções imediatas).',
    rotationTip: 'Divida o abdômen em 4 quadrantes (superior esquerdo, superior direito, inferior esquerdo, inferior direito) e alterne a cada aplicação.',
    views: ['front']
  },
  {
    id: 'arms',
    name: 'Braços',
    speed: 'Rápida',
    speedLevel: 'rapida',
    color: '#3B82F6',
    tagColor: '#60A5FA',
    bgRgba: 'rgba(59, 130, 246, 0.25)',
    exactLocation: 'Face lateral e posterior do terço médio do braço (cerca de 3 a 4 dedos abaixo do ombro e acima do cotovelo).',
    idealFor: 'Insulina rápida e bônus intermediários.',
    rotationTip: 'Alterne entre o braço direito e o esquerdo, evitando a parte interna ou próxima à articulação.',
    views: ['front', 'back']
  },
  {
    id: 'thighs',
    name: 'Coxas',
    speed: 'Lenta',
    speedLevel: 'lenta',
    color: '#EAB308',
    tagColor: '#FACC15',
    bgRgba: 'rgba(234, 179, 8, 0.25)',
    exactLocation: 'Face anterior e lateral externa da parte superior e média da coxa (uma mão abaixo da virilha e uma mão acima do joelho).',
    idealFor: 'Insulina basal (ação prolongada), pois a absorção é gradual e uniforme.',
    rotationTip: 'Utilize trajetos em linha reta ou zigue-zague na face externa das coxas, deixando 1 a 2 cm de espaço.',
    views: ['front']
  },
  {
    id: 'glutes',
    name: 'Glúteos / Flancos',
    speed: 'Média a Lenta',
    speedLevel: 'media',
    color: '#10B981',
    tagColor: '#34D399',
    bgRgba: 'rgba(16, 185, 129, 0.25)',
    exactLocation: 'Quadrante superior e externo das nádegas (área lombar inferior/flancos).',
    idealFor: 'Insulina basal ou aplicações noturnas, com absorção muito estável e menor desconforto.',
    rotationTip: 'Excelente região para descanso da pele abdominal.',
    views: ['back']
  }
];

interface HumanBodyMapProps {
  onSelectZone?: (zone: ZoneData | null) => void;
}

export const HumanBodyMap: React.FC<HumanBodyMapProps> = ({ onSelectZone }) => {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('abdomen');
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const activeZone = APPLICATION_ZONES.find(z => z.id === (hoveredZoneId || selectedZoneId)) || APPLICATION_ZONES[0];

  const handleZoneClick = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    const zone = APPLICATION_ZONES.find(z => z.id === zoneId) || null;
    if (onSelectZone) onSelectZone(zone);
  };

  const isZoneActive = (zoneId: string) => (hoveredZoneId === zoneId || selectedZoneId === zoneId);

  return (
    <View style={styles.container}>
      {/* View Switcher Header */}
      <View style={styles.topControlBar}>
        <View style={styles.viewToggleGroup}>
          <TouchableOpacity 
            style={[styles.toggleBtn, currentView === 'front' && styles.toggleBtnActive]}
            onPress={() => {
              setCurrentView('front');
              if (selectedZoneId === 'glutes') setSelectedZoneId('abdomen');
            }}
          >
            <Text style={[styles.toggleBtnText, currentView === 'front' && styles.toggleBtnTextActive]}>
              Vista Anterior (Frente)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, currentView === 'back' && styles.toggleBtnActive]}
            onPress={() => {
              setCurrentView('back');
              if (selectedZoneId === 'abdomen' || selectedZoneId === 'thighs') setSelectedZoneId('glutes');
            }}
          >
            <Text style={[styles.toggleBtnText, currentView === 'back' && styles.toggleBtnTextActive]}>
              Vista Posterior (Costas)
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hintText}>
          Passe o mouse ou toque nos pontos coloridos do corpo para ver a área exata
        </Text>
      </View>

      {/* Main Body Stage & Interactive Panel */}
      <View style={styles.stageGrid}>
        {/* SVG Silhouette Canvas */}
        <View style={styles.bodyCanvasContainer}>
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '260px', 
              aspectRatio: '200 / 380',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <svg 
              viewBox="0 0 200 400" 
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              <defs>
                {/* Glow Filter for Active Zones */}
                <filter id="zoneGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Skin/Body Shading Gradients */}
                <linearGradient id="bodySkinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="30%" stopColor="#1E293B" />
                  <stop offset="70%" stopColor="#0F172A" />
                  <stop offset="100%" stopColor="#090D16" />
                </linearGradient>

                <linearGradient id="bodyHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#64748B" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#475569" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1E293B" stopOpacity="0.3" />
                </linearGradient>

                <linearGradient id="muscleShade" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.0" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.15" />
                </linearGradient>

                {/* Zone Gradients for realistic glowing patches */}
                <radialGradient id="abdomenGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.55" />
                  <stop offset="75%" stopColor="#EF4444" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
                </radialGradient>

                <radialGradient id="armGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="75%" stopColor="#3B82F6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                </radialGradient>

                <radialGradient id="thighGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EAB308" stopOpacity="0.6" />
                  <stop offset="75%" stopColor="#EAB308" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#EAB308" stopOpacity="0.05" />
                </radialGradient>

                <radialGradient id="gluteGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                  <stop offset="75%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                </radialGradient>
              </defs>

              {/* NATURAL ANATOMICAL HUMAN BODY SILHOUETTE */}
              <g id="humanBody">
                {/* 1. HEAD & EARS */}
                {/* Head Cranium and Jaw */}
                <path
                  d="M 100 12
                     C 112 12, 118 20, 118 30
                     C 118 38, 115 45, 111 50
                     C 107 55, 104 57, 100 58
                     C 96 57, 93 55, 89 50
                     C 85 45, 82 38, 82 30
                     C 82 20, 88 12, 100 12 Z"
                  fill="url(#bodySkinGradient)"
                  stroke="#475569"
                  strokeWidth="1.2"
                />
                {/* Ears */}
                <path d="M 82 28 C 80 28, 80 36, 82 38" stroke="#475569" strokeWidth="1.2" fill="none" />
                <path d="M 118 28 C 120 28, 120 36, 118 38" stroke="#475569" strokeWidth="1.2" fill="none" />

                {/* 2. NECK & TRAPEZIUS */}
                <path
                  d="M 91 52
                     C 91 58, 90 64, 86 68
                     C 76 72, 65 76, 56 82
                     L 54 86
                     C 50 100, 44 122, 38 144
                     C 35 156, 32 172, 28 190
                     C 26 198, 28 205, 33 206
                     C 38 206, 42 200, 44 192
                     C 48 174, 51 158, 54 146
                     C 57 132, 60 115, 62 102
                     C 63 96, 67 92, 72 90
                     C 76 102, 78 120, 75 142
                     C 73 158, 69 170, 65 186
                     C 63 194, 65 204, 72 208
                     C 76 210, 80 206, 82 198
                     C 84 190, 88 184, 94 184
                     C 98 184, 99 188, 100 190
                     C 101 188, 102 184, 106 184
                     C 112 184, 116 190, 118 198
                     C 120 206, 124 210, 128 208
                     C 135 204, 137 194, 135 186
                     C 131 170, 127 158, 125 142
                     C 122 120, 124 102, 128 90
                     C 133 92, 137 96, 138 102
                     C 140 115, 143 132, 146 146
                     C 149 158, 152 174, 156 192
                     C 158 200, 162 206, 167 206
                     C 172 205, 174 198, 172 190
                     C 168 172, 165 156, 162 144
                     C 156 122, 150 100, 146 86
                     L 144 82
                     C 135 76, 124 72, 114 68
                     C 110 64, 109 58, 109 52
                     Z"
                  fill="url(#bodySkinGradient)"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                {/* 3. LEGS & FEET */}
                {/* Left Leg (Viewer's Left) */}
                <path
                  d="M 72 206
                     C 70 220, 68 238, 68 258
                     C 68 274, 71 292, 71 306
                     C 71 316, 68 332, 67 352
                     C 66 366, 67 376, 72 382
                     C 76 386, 82 386, 85 382
                     C 88 376, 88 366, 87 352
                     C 86 332, 89 316, 89 306
                     C 89 292, 92 274, 93 258
                     C 94 238, 96 220, 97 194
                     C 92 196, 86 200, 82 206
                     C 78 212, 75 210, 72 206 Z"
                  fill="url(#bodySkinGradient)"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                {/* Right Leg (Viewer's Right) */}
                <path
                  d="M 128 206
                     C 130 220, 132 238, 132 258
                     C 132 274, 129 292, 129 306
                     C 129 316, 132 332, 133 352
                     C 134 366, 133 376, 128 382
                     C 124 386, 118 386, 115 382
                     C 112 376, 112 366, 113 352
                     C 114 332, 111 316, 111 306
                     C 111 292, 108 274, 107 258
                     C 106 238, 104 220, 103 194
                     C 108 196, 114 200, 118 206
                     C 122 212, 125 210, 128 206 Z"
                  fill="url(#bodySkinGradient)"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                {/* ANATOMICAL DETAILS & MUSCLE DEFINITIONS */}
                {currentView === 'front' ? (
                  <g id="frontMuscles" stroke="#475569" strokeWidth="0.9" fill="none" opacity="0.65">
                    {/* Clavicles / Saboneteiras */}
                    <path d="M 87 69 C 93 72, 97 73, 100 73 C 103 73, 107 72, 113 69" />
                    <path d="M 86 70 C 76 73, 68 78, 60 82" />
                    <path d="M 114 70 C 124 73, 132 78, 140 82" />

                    {/* Sternum & Pectorals */}
                    <path d="M 100 73 L 100 112" strokeDasharray="3,2" />
                    <path d="M 68 98 C 76 108, 92 108, 99 104" />
                    <path d="M 132 98 C 124 108, 108 108, 101 104" />

                    {/* Ribcage Arch */}
                    <path d="M 85 124 C 92 118, 100 116, 100 116 C 100 116, 108 118, 115 124" />

                    {/* Linea Alba (Centerline of Abdomen) */}
                    <path d="M 100 116 L 100 180" strokeDasharray="4,2" />

                    {/* Rectus Abdominis Muscle Tiers */}
                    <path d="M 86 130 C 92 133, 98 133, 100 133 C 102 133, 108 133, 114 130" opacity="0.4" />
                    <path d="M 88 148 C 93 151, 98 151, 100 151 C 102 151, 107 151, 112 148" opacity="0.4" />

                    {/* Navel (Umbigo) with safe distance circle */}
                    <circle cx="100" cy="148" r="2.5" fill="#64748B" stroke="#334155" strokeWidth="0.8" opacity="0.9" />
                    <circle cx="100" cy="148" r="11" stroke="#EF4444" strokeWidth="0.9" strokeDasharray="2,2" opacity="0.6" />
                    <text x="100" y="150.5" fontSize="3.8" fill="#F87171" textAnchor="middle" opacity="0.8">umbigo</text>

                    {/* Inguinal Ligaments (V-cut pelvic lines) */}
                    <path d="M 75 186 C 84 193, 95 195, 100 195 C 105 195, 116 193, 125 186" />

                    {/* Knees & Patellas */}
                    <path d="M 76 295 C 80 293, 84 293, 88 295" />
                    <circle cx="80" cy="300" r="4.5" stroke="#334155" strokeWidth="0.8" />
                    <path d="M 124 295 C 120 293, 116 293, 112 295" />
                    <circle cx="120" cy="300" r="4.5" stroke="#334155" strokeWidth="0.8" />

                    {/* Tibia & Ankle definitions */}
                    <path d="M 74 374 C 76 376, 80 376, 84 374" />
                    <path d="M 126 374 C 124 376, 120 376, 116 374" />
                  </g>
                ) : (
                  <g id="backMuscles" stroke="#475569" strokeWidth="0.9" fill="none" opacity="0.65">
                    {/* Spine / Vertebral Column */}
                    <path d="M 100 58 L 100 186" strokeDasharray="3,3" />

                    {/* Trapezius and Neck contour */}
                    <path d="M 92 56 L 82 72 L 100 102 L 118 72 L 108 56" />

                    {/* Scapulae (Shoulder blades) */}
                    <path d="M 72 86 C 78 88, 84 96, 82 112 C 78 116, 73 112, 70 100 Z" />
                    <path d="M 128 86 C 122 88, 116 96, 118 112 C 122 116, 127 112, 130 100 Z" />

                    {/* Latissimus Dorsi & Flank curvature */}
                    <path d="M 68 126 C 78 136, 88 144, 100 148 C 112 144, 122 136, 132 126" />

                    {/* Lower Back / Sacral Dimples */}
                    <circle cx="94" cy="178" r="1.5" fill="#475569" />
                    <circle cx="106" cy="178" r="1.5" fill="#475569" />

                    {/* Gluteal Cleft & Infragluteal Fold (Nádegas) */}
                    <path d="M 100 178 L 100 216" strokeWidth="1.2" />
                    <path d="M 72 212 C 80 220, 92 220, 100 216 C 108 220, 120 220, 128 212" strokeWidth="1.2" />

                    {/* Popliteal Fossa (Behind knees) */}
                    <path d="M 74 300 C 80 304, 86 304, 90 300" />
                    <path d="M 126 300 C 120 304, 114 304, 110 300" />

                    {/* Achilles Tendon / Calves */}
                    <path d="M 78 335 C 76 348, 77 365, 80 376" />
                    <path d="M 122 335 C 124 348, 123 365, 120 376" />
                  </g>
                )}
              </g>

              {/* INTERACTIVE INJECTION ZONES (ANATOMICALLY ACCURATE OVERLAYS) */}
              {currentView === 'front' ? (
                <>
                  {/* 1. ABDÔMEN ZONE (FRONT VIEW) */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneClick('abdomen')}
                    onMouseEnter={() => setHoveredZoneId('abdomen')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    {/* Anatomical Abdominal Adipose Area with Periumbilical Clearance */}
                    <path
                      d="M 80 130
                         C 88 126, 112 126, 120 130
                         C 128 134, 130 148, 128 162
                         C 125 174, 114 178, 100 178
                         C 86 178, 75 174, 72 162
                         C 70 148, 72 134, 80 130 Z"
                      fill="url(#abdomenGrad)"
                      stroke="#EF4444"
                      strokeWidth={isZoneActive('abdomen') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('abdomen') ? 'none' : '3,2'}
                      filter={isZoneActive('abdomen') ? 'url(#zoneGlow)' : undefined}
                    />

                    {/* Navel center exclusion mask */}
                    <circle cx="100" cy="148" r="11" fill="#0F172A" stroke="#EF4444" strokeWidth="1.2" opacity="0.85" />
                    <line x1="93" y1="141" x2="107" y2="155" stroke="#EF4444" strokeWidth="1.2" opacity="0.8" />
                    <line x1="107" y1="141" x2="93" y2="155" stroke="#EF4444" strokeWidth="1.2" opacity="0.8" />

                    {/* Quadrant Target Markers */}
                    <circle cx="87" cy="140" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="113" cy="140" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="87" cy="162" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="113" cy="162" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />

                    {/* Pulsing ring for active zone */}
                    {isZoneActive('abdomen') && (
                      <>
                        <circle cx="87" cy="140" r="7" stroke="#EF4444" strokeWidth="1" fill="none" opacity="0.8" />
                        <circle cx="113" cy="140" r="7" stroke="#EF4444" strokeWidth="1" fill="none" opacity="0.8" />
                      </>
                    )}
                  </g>

                  {/* 2. ARMS ZONE (FRONT VIEW - Outer lateral middle third) */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneClick('arms')}
                    onMouseEnter={() => setHoveredZoneId('arms')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    {/* Left Arm Lateral Path */}
                    <path
                      d="M 52 94
                         C 47 104, 43 118, 38 136
                         C 37 146, 42 150, 47 148
                         C 51 138, 55 120, 58 106
                         C 59 98, 56 94, 52 94 Z"
                      fill="url(#armGrad)"
                      stroke="#3B82F6"
                      strokeWidth={isZoneActive('arms') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('arms') ? 'none' : '3,2'}
                      filter={isZoneActive('arms') ? 'url(#zoneGlow)' : undefined}
                    />
                    <circle cx="45" cy="122" r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />

                    {/* Right Arm Lateral Path */}
                    <path
                      d="M 148 94
                         C 153 104, 157 118, 162 136
                         C 163 146, 158 150, 153 148
                         C 149 138, 145 120, 142 106
                         C 141 98, 144 94, 148 94 Z"
                      fill="url(#armGrad)"
                      stroke="#3B82F6"
                      strokeWidth={isZoneActive('arms') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('arms') ? 'none' : '3,2'}
                      filter={isZoneActive('arms') ? 'url(#zoneGlow)' : undefined}
                    />
                    <circle cx="155" cy="122" r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>

                  {/* 3. THIGHS ZONE (FRONT VIEW - Anterior & Anterolateral Middle Third) */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneClick('thighs')}
                    onMouseEnter={() => setHoveredZoneId('thighs')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    {/* Left Thigh (Anterior & outer lateral) */}
                    <path
                      d="M 73 218
                         C 70 234, 69 254, 70 274
                         C 71 282, 80 282, 85 280
                         C 89 264, 91 242, 92 222
                         C 92 216, 78 214, 73 218 Z"
                      fill="url(#thighGrad)"
                      stroke="#EAB308"
                      strokeWidth={isZoneActive('thighs') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('thighs') ? 'none' : '3,2'}
                      filter={isZoneActive('thighs') ? 'url(#zoneGlow)' : undefined}
                    />
                    <circle cx="78" cy="245" r="4.5" fill="#EAB308" stroke="#FFFFFF" strokeWidth="1.5" />

                    {/* Right Thigh (Anterior & outer lateral) */}
                    <path
                      d="M 127 218
                         C 130 234, 131 254, 130 274
                         C 129 282, 120 282, 115 280
                         C 111 264, 109 242, 108 222
                         C 108 216, 122 214, 127 218 Z"
                      fill="url(#thighGrad)"
                      stroke="#EAB308"
                      strokeWidth={isZoneActive('thighs') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('thighs') ? 'none' : '3,2'}
                      filter={isZoneActive('thighs') ? 'url(#zoneGlow)' : undefined}
                    />
                    <circle cx="122" cy="245" r="4.5" fill="#EAB308" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                </>
              ) : (
                <>
                  {/* POSTERIOR VIEW ZONES (COSTAS) */}
                  {/* 1. GLÚTEOS & FLANCOS (BACK VIEW) */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneClick('glutes')}
                    onMouseEnter={() => setHoveredZoneId('glutes')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    {/* Left Glute / Flank (Superior & External Quadrant) */}
                    <path
                      d="M 68 152
                         C 74 148, 88 150, 94 156
                         C 96 166, 96 182, 94 196
                         C 86 206, 74 204, 68 190
                         C 64 176, 64 160, 68 152 Z"
                      fill="url(#gluteGrad)"
                      stroke="#10B981"
                      strokeWidth={isZoneActive('glutes') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('glutes') ? 'none' : '3,2'}
                      filter={isZoneActive('glutes') ? 'url(#zoneGlow)' : undefined}
                    />
                    <circle cx="80" cy="174" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />

                    {/* Right Glute / Flank (Superior & External Quadrant) */}
                    <path
                      d="M 132 152
                         C 126 148, 112 150, 106 156
                         C 104 166, 104 182, 106 196
                         C 114 206, 126 204, 132 190
                         C 136 176, 136 160, 132 152 Z"
                      fill="url(#gluteGrad)"
                      stroke="#10B981"
                      strokeWidth={isZoneActive('glutes') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('glutes') ? 'none' : '3,2'}
                      filter={isZoneActive('glutes') ? 'url(#zoneGlow)' : undefined}
                    />
                    <circle cx="120" cy="174" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>

                  {/* 2. ARMS POSTERIOR (TRÍCEPS) */}
                  <g 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleZoneClick('arms')}
                    onMouseEnter={() => setHoveredZoneId('arms')}
                    onMouseLeave={() => setHoveredZoneId(null)}
                  >
                    {/* Left Triceps Area */}
                    <path
                      d="M 50 96
                         C 45 106, 40 120, 36 138
                         C 35 146, 42 150, 48 146
                         C 52 136, 56 120, 58 106
                         C 58 98, 54 94, 50 96 Z"
                      fill="url(#armGrad)"
                      stroke="#3B82F6"
                      strokeWidth={isZoneActive('arms') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('arms') ? 'none' : '3,2'}
                      filter={isZoneActive('arms') ? 'url(#zoneGlow)' : undefined}
                    />
                    <circle cx="45" cy="122" r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />

                    {/* Right Triceps Area */}
                    <path
                      d="M 150 96
                         C 155 106, 160 120, 164 138
                         C 165 146, 158 150, 152 146
                         C 148 136, 144 120, 142 106
                         C 142 98, 146 94, 150 96 Z"
                      fill="url(#armGrad)"
                      stroke="#3B82F6"
                      strokeWidth={isZoneActive('arms') ? '2' : '1.2'}
                      strokeDasharray={isZoneActive('arms') ? 'none' : '3,2'}
                      filter={isZoneActive('arms') ? 'url(#zoneGlow)' : undefined}
                    />
                    <circle cx="155" cy="122" r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                </>
              )}
            </svg>
          </div>

          <View style={styles.viewBadge}>
            <RotateCw size={12} color="#94A3B8" style={{ marginRight: 4 }} />
            <Text style={styles.viewBadgeText}>
              {currentView === 'front' ? 'Vista Frontal' : 'Vista Dorsal (Costas)'}
            </Text>
          </View>
        </View>

        {/* Interactive Zone Detail Card */}
        <View style={styles.detailsPanel}>
          {/* Quick Zone Selection Chips */}
          <Text style={styles.chipsHeader}>Regiões Anatômicas:</Text>
          <View style={styles.chipsContainer}>
            {APPLICATION_ZONES.map((zone) => {
              const active = zone.id === activeZone.id;
              return (
                <TouchableOpacity
                  key={zone.id}
                  style={[
                    styles.zoneChip,
                    active && { backgroundColor: zone.bgRgba, borderColor: zone.color, borderWidth: 1.5 }
                  ]}
                  onPress={() => {
                    handleZoneClick(zone.id);
                    if (!zone.views.includes(currentView)) {
                      setCurrentView(zone.views[0]);
                    }
                  }}
                >
                  <View style={[styles.chipDot, { backgroundColor: zone.color }]} />
                  <Text style={[styles.chipText, active && { color: '#FFFFFF', fontWeight: 'bold' }]}>
                    {zone.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Active Zone Focus Box */}
          <View style={[styles.focusCard, { borderColor: activeZone.color }]}>
            <View style={styles.focusHeader}>
              <View style={styles.focusTitleGroup}>
                <View style={[styles.iconCircle, { backgroundColor: activeZone.bgRgba }]}>
                  <Target size={20} color={activeZone.color} />
                </View>
                <View>
                  <Text style={styles.focusTitle}>{activeZone.name}</Text>
                  <View style={[styles.speedBadge, { backgroundColor: activeZone.bgRgba }]}>
                    <Zap size={12} color={activeZone.color} style={{ marginRight: 4 }} />
                    <Text style={[styles.speedBadgeText, { color: activeZone.tagColor }]}>
                      Absorção {activeZone.speed}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.focusContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoRowLabel}>Local Exato:</Text>
                <Text style={styles.infoRowValue}>{activeZone.exactLocation}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoRowLabel}>Indicação Principal:</Text>
                <Text style={styles.infoRowValue}>{activeZone.idealFor}</Text>
              </View>

              <View style={[styles.infoRow, styles.tipBox]}>
                <Text style={styles.tipTitle}>Dica de Rodízio:</Text>
                <Text style={styles.tipText}>{activeZone.rotationTip}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  topControlBar: {
    marginBottom: 20,
    alignItems: 'center',
  },
  viewToggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 4,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#3B82F6',
  },
  toggleBtnText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  hintText: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  stageGrid: {
    flexDirection: Platform.OS === 'web' && (typeof window !== 'undefined' && window.innerWidth > 640) ? 'row' : 'column',
    gap: 24,
    alignItems: 'center',
  },
  bodyCanvasContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    minWidth: 240,
  },
  viewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  viewBadgeText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  detailsPanel: {
    flex: 1,
    width: '100%',
  },
  chipsHeader: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  zoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  chipText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '500',
  },
  focusCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  focusHeader: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 12,
  },
  focusTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  speedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  speedBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  focusContent: {
    gap: 12,
  },
  infoRow: {
    gap: 4,
  },
  infoRowLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRowValue: {
    color: '#E2E8F0',
    fontSize: 13,
    lineHeight: 19,
  },
  tipBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
    marginTop: 4,
  },
  tipTitle: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipText: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default HumanBodyMap;
