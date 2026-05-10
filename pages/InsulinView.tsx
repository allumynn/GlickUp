
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { APP_ZONES } from '../constants';
import { Clock, Zap, Info, ShieldCheck } from 'lucide-react';

const { width } = Dimensions.get('window');

const InsulinView: React.FC = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Farmacologia <Text style={styles.purpleText}>Manual</Text>
        </Text>
        <Text style={styles.subtitle}>Dominando as ferramentas de correção do seu corpo.</Text>
      </View>

      <View style={styles.cardGrid}>
        <View style={[styles.card, styles.basalCard]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Clock size={24} color="#3B82F6" />
            </View>
            <Text style={styles.cardTitle}>Basal</Text>
          </View>
          <Text style={styles.cardDesc}>
            A infraestrutura silenciosa. Mantém a glicemia estável entre as refeições e durante o sono.
          </Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={[styles.card, styles.bolusCard]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
              <Zap size={24} color="#A855F7" />
            </View>
            <Text style={styles.cardTitle}>Bolus</Text>
          </View>
          <Text style={styles.cardDesc}>
            Seu recurso tático. Usada para neutralizar carbos ou corrigir picos inesperados.
          </Text>
          <View style={styles.bolusIndicator}>
            <View style={styles.dot} />
            <View style={[styles.dot, { opacity: 0.5 }]} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>

      <View style={styles.mapSection}>
        <Text style={styles.sectionTitle}>Geografia da Absorção</Text>
        <Text style={styles.sectionDesc}>
          Onde você aplica determina a velocidade da resposta. Abdome é via expressa; coxas são estradas rurais.
        </Text>

        <View style={styles.zonesList}>
          {APP_ZONES.map((zone, i) => (
            <TouchableOpacity 
              key={i} 
              onPress={() => setActiveZone(activeZone === i ? null : i)}
              style={[styles.zoneItem, activeZone === i && styles.activeZoneItem]}
            >
              <View style={[styles.zoneNumber, { backgroundColor: zone.color.replace('bg-', '').replace('-500', '') || '#007AFF' }]}>
                <Text style={styles.zoneNumberText}>{i + 1}</Text>
              </View>
              <View style={styles.zoneInfo}>
                <Text style={styles.zoneLabel}>{zone.label}</Text>
                <Text style={styles.zoneSpeed}>{zone.speed}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoIcon}>
          <Info size={24} color="#6366F1" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>O Rodízio é a Regra</Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Lipodistrofia:</Text> Aplicar sempre no mesmo ponto causa cicatrizes que bloqueiam a insulina. Pule 1cm a cada aplicação!
          </Text>
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
  purpleText: {
    color: '#AF52DE',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
  },
  cardGrid: {
    gap: 16,
    marginBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 30,
    padding: 24,
    borderLeftWidth: 6,
  },
  basalCard: {
    borderLeftColor: '#3B82F6',
  },
  bolusCard: {
    borderLeftColor: '#A855F7',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 8,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cardDesc: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    width: '100%',
  },
  bolusIndicator: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 20,
    height: 6,
    backgroundColor: '#A855F7',
    borderRadius: 3,
  },
  mapSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 24,
  },
  zonesList: {
    gap: 12,
  },
  zoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeZoneItem: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  zoneNumber: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  zoneNumberText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },
  zoneInfo: {
    flex: 1,
  },
  zoneLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  zoneSpeed: {
    fontSize: 10,
    color: '#60A5FA',
    fontWeight: '900',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    gap: 16,
  },
  infoIcon: {
    backgroundColor: '#6366F1',
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '900',
    color: '#818CF8',
  },
});

export default InsulinView;
