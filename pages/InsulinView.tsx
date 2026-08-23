
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { Clock, Zap, Info, ShieldCheck } from 'lucide-react';
import HumanBodyMap from '../components/HumanBodyMap';

const { width } = Dimensions.get('window');

const InsulinView: React.FC = () => {
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
            Funciona em segundo plano, 24h por dia, mantendo estabilidade mesmo durante jejum ou sono.
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
            <Text style={styles.cardTitle}>Bônus</Text>
          </View>
          <Text style={styles.cardDesc}>
            Ação rápida, usada para cobrir carboidratos da refeição ou corrigir glicose elevada.
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
          Onde você aplica determina a velocidade da resposta. Clique ou passe o cursor nas regiões do corpo para conferir os locais recomendados.
        </Text>

        <HumanBodyMap />
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoIcon}>
          <Info size={24} color="#6366F1" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>O Rodízio é a Regra</Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Lipodistrofia:</Text> quando a insulina é aplicada muitas vezes no mesmo local, a gordura da região pode sofrer alterações e formar “caroços” ou áreas endurecidas sob a pele. Isso é chamado de lipodistrofia. {'\n\n'}
            O problema é que, nessas regiões, a absorção da insulina fica irregular. Ou seja, a insulina pode demorar mais para agir ou até não funcionar adequadamente, fazendo com que a glicose permaneça alta mesmo após a aplicação. {'\n\n'}
            Para evitar isso, é muito importante fazer o rodízio dos locais de aplicação, alternando as regiões e mantendo uma certa distância entre uma aplicação e outra. Assim, a pele consegue se recuperar e a insulina passa a ser absorvida de forma mais eficiente.
          </Text>
        </View>
      </View>

      <View style={[styles.card, { marginTop: 30, backgroundColor: 'rgba(16, 185, 129, 0.05)', borderLeftColor: '#10B981' }]}>
        <View style={styles.cardHeader}>
          <ShieldCheck size={24} color="#10B981" />
          <Text style={styles.cardTitle}>Armazenamento</Text>
        </View>
        <Text style={styles.storageText}>
          A insulina é um medicamento sensível à temperatura. Quando armazenada de forma inadequada, ela pode perder o efeito e comprometer o controle da glicose.
        </Text>
        
        <View style={styles.storageGrid}>
          <View style={styles.storageItem}>
            <Text style={styles.storageItemTitle}>Insulina fechada (estoque)</Text>
            <Text style={styles.storageItemDesc}>
              Devem ser mantidos refrigerados (2°C a 8°C), na parte interna da geladeira. Evite a porta e nunca congele.
            </Text>
          </View>
          <View style={styles.storageItem}>
            <Text style={styles.storageItemTitle}>Insulina em uso</Text>
            <Text style={styles.storageItemDesc}>
              Muitas podem ficar em temperatura ambiente por tempo limitado (conforme bula), reduzindo o desconforto da aplicação gelada.
            </Text>
          </View>
        </View>

        <Text style={[styles.storageItemTitle, { marginTop: 16 }]}>Situações de Risco:</Text>
        <View style={styles.dangerList}>
          {["Sol ou carro fechado", "Praia sem térmica", "Congelar acidentalmente", "Exposição ao calor"].map((t, i) => (
            <Text key={i} style={styles.dangerText}>{t}</Text>
          ))}
        </View>
      </View>

      <View style={[styles.card, { marginTop: 20, backgroundColor: 'rgba(244, 63, 94, 0.05)', borderLeftColor: '#F43F5E' }]}>
        <View style={styles.cardHeader}>
          <Info size={24} color="#F43F5E" />
          <Text style={styles.cardTitle}>Descarte Correto</Text>
        </View>
        <Text style={styles.cardDesc}>
          Agulhas e lancetas não devem ir para o lixo comum. Use recipientes rígidos (como garrafas PET bem fechadas ou coletores próprios) e entregue em unidades de saúde ou postos de coleta.
        </Text>
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
  silhouetteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  silhouette: {
    width: 120,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 60,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyPart: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    position: 'absolute',
    top: 20,
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  tooltip: {
    position: 'absolute',
    bottom: -60,
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 12,
    width: 140,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 10,
  },
  tooltipTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tooltipDesc: {
    color: '#60A5FA',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  legend: {
    flex: 1,
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 4,
  },
  legendText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  storageText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  storageGrid: {
    gap: 16,
  },
  storageItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 16,
    borderRadius: 16,
  },
  storageItemTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  storageItemDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },
  dangerList: {
    marginTop: 12,
    gap: 8,
  },
  dangerText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default InsulinView;
