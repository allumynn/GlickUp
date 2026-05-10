
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { Page } from '../types';
import { QUICK_ACTIONS } from '../constants';
import { Sparkles, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface HomeViewProps {
  setPage: (page: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setPage }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Sparkles size={14} color="#60A5FA" />
          <Text style={styles.badgeText}>Protocolo de Autonomia DM1</Text>
        </View>
        
        <Text style={styles.title}>
          Sincronize sua {'\n'}
          <Text style={styles.italicText}>Biologia.</Text>
        </Text>
        
        <Text style={styles.subtitle}>
          Aprenda a ler os sinais do seu corpo com a clareza de um dashboard. 
          O controle é 100% seu.
        </Text>

        <TouchableOpacity 
          onPress={() => setPage(Page.Physiology)}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>Iniciar Jornada</Text>
          <Zap size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={() => setPage(action.id)}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTag}>{action.tag}</Text>
            </View>
            
            <View style={styles.iconContainer}>
              <View style={[styles.iconPlaceholder, { backgroundColor: action.color }]}>
                {action.icon}
              </View>
            </View>
            
            <Text style={styles.cardTitle}>{action.title}</Text>
            <Text style={styles.cardSubtitle}>{action.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
    marginBottom: 30,
  },
  badgeText: {
    color: '#60A5FA',
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 20,
  },
  italicText: {
    fontStyle: 'italic',
    color: '#C084FC',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: 300,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    marginRight: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardHeader: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  cardTag: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.2)',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  iconContainer: {
    marginBottom: 15,
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
});

export default HomeView;
