
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { 
  ShieldAlert, 
  Key, 
  Lock, 
  BatteryCharging, 
  Check, 
  X, 
  Orbit 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PhysiologyView: React.FC = () => {
  const myths = [
    { title: "Culpa do doce?", description: "O Tipo 1 é autoimune. Doces não 'quebram' o pâncreas.", isTrue: false },
    { title: "Esporte ajuda?", description: "Totalmente! O exercício faz a insulina trabalhar melhor.", isTrue: true },
    { title: "Cura em 5 anos?", description: "A promessa é antiga, mas a tecnologia atual já é quase um pâncreas biônico.", isTrue: true },
    { title: "Posso comer pizza?", description: "Pode! Só precisa dominar a arte do Bolus.", isTrue: true }
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>
          O Grande <Text style={styles.blueText}>Crash</Text> Biológico
        </Text>
        <Text style={styles.subtitle}>Por que seu pâncreas resolveu entrar em greve?</Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.cardContent}>
          <View style={styles.iconHeader}>
            <View style={styles.alertIcon}>
              <ShieldAlert size={32} color="#F87171" />
            </View>
            <Text style={styles.cardTitle}>Autoimunidade</Text>
          </View>
          <Text style={styles.cardDescription}>
            Imagine que os guardas do seu corpo (sistema imune) ficaram confusos. Em vez de caçar vírus, eles caçaram as 
            <Text style={styles.boldBlue}> Células Beta</Text>. {'\n\n'}
            O resultado? Uma falha crítica na produção de insulina. Sem esse "software" rodando, a energia da comida fica 
            travada do lado de fora das células.
          </Text>
        </View>
      </View>

      <View style={styles.stepGrid}>
        {[
          { icon: <BatteryCharging color="#FACC15" />, label: "Glicose", desc: "Energia pura dos carbos.", color: "#FACC15" },
          { icon: <Lock color="#F87171" />, label: "A Barreira", desc: "Sem insulina, a célula não abre.", color: "#F87171" },
          { icon: <Key color="#60A5FA" />, label: "Insulina", desc: "A chave mestra.", color: "#60A5FA" }
        ].map((item, i) => (
          <View key={i} style={styles.stepCard}>
            <View style={styles.stepIcon}>
              {item.icon}
            </View>
            <Text style={styles.stepLabel}>{item.label}</Text>
            <Text style={styles.stepDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <View style={styles.mythsSection}>
        <View style={styles.mythsHeader}>
          <Orbit color="#A855F7" size={20} />
          <Text style={styles.mythsTitle}>Checagem de Mitos</Text>
        </View>
        <View style={styles.mythsGrid}>
          {myths.map((myth, idx) => (
            <View key={idx} style={styles.mythCard}>
              <View style={[styles.mythIcon, { backgroundColor: myth.isTrue ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)' }]}>
                {myth.isTrue ? <Check size={20} color="#22C55E" /> : <X size={20} color="#EF4444" />}
              </View>
              <View style={styles.mythInfo}>
                <Text style={styles.mythTitle}>{myth.title}</Text>
                <Text style={styles.mythDesc}>{myth.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  blueText: {
    color: '#60A5FA',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
  },
  mainCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 30,
  },
  cardContent: {
    zIndex: 1,
  },
  iconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  alertIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 10,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cardDescription: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
  },
  boldBlue: {
    color: '#60A5FA',
    fontWeight: '900',
  },
  stepGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  stepCard: {
    width: (width - 60) / 3,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  stepIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  mythsSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  mythsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  mythsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  mythsGrid: {
    gap: 16,
  },
  mythCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  mythIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mythInfo: {
    flex: 1,
  },
  mythTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  mythDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
});

export default PhysiologyView;
