
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { Apple, Sandwich, Coffee, CheckCircle2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CarbView: React.FC = () => {
  const equivalents = [
    { name: 'Pão de Sal', unit: '1 unidade', icon: Sandwich, color: '#FB923C' },
    { name: 'Maçã Média', unit: '1 unidade', icon: Apple, color: '#F87171' },
    { name: 'Leite Integral', unit: '1 copo (200ml)', icon: Coffee, color: '#60A5FA' }
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Contagem de Carboidratos</Text>
        <Text style={styles.subtitle}>Não é dieta restritiva, é matemática inteligente.</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Regra de Ouro</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>A Regra dos 15g</Text>
        <Text style={styles.sectionDesc}>Muitas porções padrão de alimentos têm cerca de 15g de carboidratos.</Text>

        <View style={styles.grid}>
          {equivalents.map((item, idx) => (
            <View key={idx} style={styles.card}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
                <item.icon size={32} color={item.color} />
              </View>
              <Text style={styles.cardValue}>15g</Text>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardUnit}>{item.unit}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.labelSection}>
        <Text style={styles.labelTitle}>Como ler o rótulo?</Text>
        <Text style={styles.labelDesc}>
          Esqueça a parte que diz "Açúcares". O que importa é o valor de 
          <Text style={styles.bold}> Carboidratos Totais</Text>.
        </Text>

        <View style={styles.checkList}>
          {[
            "Olhe o tamanho da porção (ex: 2 biscoitos).",
            "Veja quanto de carboidrato tem naquela porção.",
            "Multiplique se você for comer mais de uma porção."
          ].map((text, i) => (
            <View key={i} style={styles.checkItem}>
              <CheckCircle2 color="#22C55E" size={16} />
              <Text style={styles.checkText}>{text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.nutritionLabel}>
          <Text style={styles.labelHeader}>INFORMAÇÃO NUTRICIONAL</Text>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>Porção: 30g (2 fatias)</Text>
          </View>
          <View style={[styles.labelRow, styles.highlightRow]}>
            <Text style={styles.highlightText}>Carboidratos Totais</Text>
            <Text style={styles.highlightText}>25g</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>Açúcares</Text>
            <Text style={styles.labelText}>2g</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>Proteínas</Text>
            <Text style={styles.labelText}>4g</Text>
          </View>
          <View style={styles.labelNote}>
            <Text style={styles.noteText}>* Nota: Foque no valor destacado para sua contagem.</Text>
          </View>
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
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 40,
    alignItems: 'center',
  },
  badgeContainer: {
    marginBottom: 12,
  },
  badge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#60A5FA',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: (width - 60) / 3,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  cardUnit: {
    fontSize: 8,
    color: '#475569',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  labelSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  labelTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  labelDesc: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 24,
  },
  bold: {
    fontWeight: '900',
    color: '#FFFFFF',
  },
  checkList: {
    gap: 12,
    marginBottom: 30,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkText: {
    fontSize: 13,
    color: '#E2E8F0',
    flex: 1,
  },
  nutritionLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  labelHeader: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  labelText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  highlightRow: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    borderBottomColor: 'rgba(59, 130, 246, 0.2)',
  },
  highlightText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  labelNote: {
    marginTop: 12,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
  },
  noteText: {
    fontSize: 10,
    color: '#64748B',
    fontStyle: 'italic',
  },
});

export default CarbView;
