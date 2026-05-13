
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { 
  AlertCircle, 
  Droplets, 
  Thermometer, 
  ShieldAlert, 
  Phone, 
  X 
} from 'lucide-react';

const SOSView: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <AlertCircle color="#EF4444" size={40} />
        </View>
        <Text style={styles.title}>Protocolos de Crise</Text>
        <Text style={styles.subtitle}>Reaja com calma, siga o algoritmo.</Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Hyper */}
        <View style={[styles.card, styles.hyperCard]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: '#2563EB' }]}>
              <Droplets color="#FFFFFF" size={24} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Hiperglicemia</Text>
              <View style={[styles.priorityBadge, { backgroundColor: 'rgba(37, 99, 235, 0.2)' }]}>
                <Text style={[styles.priorityText, { color: '#60A5FA' }]}>MONITORAMENTO</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.steps}>
            <Text style={[styles.stepLabel, { color: '#60A5FA' }]}>Sintomas comuns</Text>
            <Text style={styles.cardDesc}>
              Muita sede, vontade de fazer xixi toda hora, cansaço, dor de cabeça, irritação.
            </Text>

            <Text style={[styles.stepLabel, { color: '#60A5FA', marginTop: 10 }]}>Protocolo de Lavagem</Text>
            {[
              "Hidratação agressiva (água) para diluir a glicose.",
              "Teste de Cetonas (se >250mg/dL persistentemente).",
              "Correção controlada via dose de Bônus."
            ].map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <Text style={[styles.stepNumber, { color: '#2563EB' }]}>{i + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}

        <View style={styles.dangerNotice}>
          <Text style={styles.dangerNoticeTitle}>Alerta de Perigo: CETOACIDOSE</Text>
          <Text style={styles.dangerNoticeText}>Procure um hospital imediatamente se houver:</Text>
          <Text style={styles.dangerNoticeBullet}>• vômitos</Text>
          <Text style={styles.dangerNoticeBullet}>• falta de ar</Text>
          <Text style={styles.dangerNoticeBullet}>• hálito com cheiro de acetona ou “fruta”</Text>
          <Text style={styles.dangerNoticeBullet}>• dor abdominal forte</Text>
          <Text style={styles.dangerNoticeBullet}>• sonolência</Text>
        </View>
          </View>
        </View>

        {/* Hypo */}
        <View style={[styles.card, styles.hypoCard]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: '#DC2626' }]}>
              <Thermometer color="#FFFFFF" size={24} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Hipoglicemia</Text>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>ALTA PRIORIDADE</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.steps}>
            <Text style={styles.stepLabel}>Sintomas comuns</Text>
            <Text style={styles.cardDesc}>
              Tremedeira, suor frio, fome excessiva, confusão mental, formigamento na boca.
            </Text>

            <Text style={[styles.stepLabel, { marginTop: 10 }]}>Algoritmo 15-15</Text>
            {[
              "Ingerir 15g de carbo rápido (Ex: Suco, Mel).",
              "Cronometrar 15 minutos em repouso total.",
              "Re-testar e repetir se abaixo de 70mg/dL."
            ].map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <Text style={styles.stepNumber}>{i + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}

            <View style={[styles.dangerNotice, { borderColor: '#FCA5A5' }]}>
              <Text style={[styles.dangerNoticeTitle, { color: '#F87171' }]}>O QUE NÃO FAZER</Text>
              <Text style={styles.dangerNoticeText}>
                Não coma chocolate ou pizza. A gordura atrasa a digestão. O açúcar demora para chegar no sangue e você continua passando mal. Use açúcar puro!
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>Alerta de Inconsciência</Text>
        <Text style={styles.alertSubtitle}>Aviso: esta seção é para quem está com você, caso você desmaie.</Text>
        <View style={styles.alertGrid}>
          <View style={styles.alertItem}>
            <View style={styles.alertHeader}>
              <X color="#F87171" size={16} />
              <Text style={styles.alertLabel}>PERIGO</Text>
            </View>
            <Text style={styles.alertText}>
              NUNCA ofereça líquidos ou alimentos a alguém desacordado.
            </Text>
          </View>
          <View style={[styles.alertItem, { backgroundColor: 'rgba(34, 197, 94, 0.1)' }]}>
            <View style={styles.alertHeader}>
              <Phone color="#4ADE80" size={16} />
              <Text style={[styles.alertLabel, { color: '#4ADE80' }]}>AÇÃO</Text>
            </View>
            <Text style={styles.alertText}>
              Deitar a pessoa de lado, ligar 192 e utilizar o kit de glucagon se disponível.
            </Text>
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
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 8,
  },
  cardContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
  },
  hypoCard: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  hyperCard: {
    borderColor: 'rgba(37, 99, 235, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  priorityBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  priorityText: {
    color: '#F87171',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  steps: {
    padding: 24,
  },
  stepLabel: {
    fontSize: 12,
    color: '#F87171',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#EF4444',
    fontStyle: 'italic',
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  alertBox: {
    marginTop: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: 30,
    padding: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#EF4444',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  alertGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  alertItem: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 16,
    borderRadius: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  alertLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#F87171',
  },
  alertText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  dangerNotice: {
    marginTop: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  dangerNoticeTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#EF4444',
    marginBottom: 8,
  },
  dangerNoticeText: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 18,
    marginBottom: 4,
  },
  dangerNoticeBullet: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 8,
    marginVertical: 1,
  },
  cardDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 12,
  },
});

export default SOSView;
