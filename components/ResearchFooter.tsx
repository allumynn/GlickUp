import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Platform 
} from 'react-native';
import { X } from 'lucide-react';
import UfpeLogo from './UfpeLogo';

export const ResearchFooter: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.footerContainer}>
      <View style={styles.divider} />

      <View style={styles.compactBar}>
        <View style={styles.ufpeBrandRow}>
          <UfpeLogo size={22} />
          <Text style={styles.mainText}>
            Pesquisa Científica • UFPE
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.infoButtonText}>Ficha Técnica do Projeto</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subCredits}>
        © {new Date().getFullYear()} D1ARIO • Universidade Federal de Pernambuco (UFPE) • Todos os direitos reservados.
      </Text>

      {/* Modal Institucional Acadêmico */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Cabeçalho */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderBrand}>
                <UfpeLogo size={32} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.modalTitle}>Projeto de Pesquisa Científica</Text>
                  <Text style={styles.modalSubtitle}>Universidade Federal de Pernambuco (UFPE)</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
              >
                <X size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Corpo com Informações Oficiais */}
            <ScrollView contentContainerStyle={styles.modalBody}>
              {/* Título do Plano de Trabalho */}
              <View style={styles.metaBox}>
                <Text style={styles.labelTitle}>PLANO DE TRABALHO</Text>
                <Text style={styles.metaMainValue}>
                  Avaliação do impacto do chatbot no Letramento em Saúde dos adolescentes com Diabetes Mellitus Tipo 1.
                </Text>
              </View>

              {/* Tabela de Membros do Projeto */}
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionHeading}>MEMBROS DO PROJETO</Text>
                
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCell, { flex: 2 }]}>NOME</Text>
                    <Text style={[styles.thCell, { flex: 1 }]}>CATEGORIA</Text>
                    <Text style={[styles.thCell, { flex: 1.4, textAlign: 'right' }]}>FUNÇÃO</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={[styles.tdName, { flex: 2 }]}>AMADEU SA DE CAMPOS FILHO</Text>
                    <Text style={[styles.tdCategory, { flex: 1 }]}>DOCENTE</Text>
                    <Text style={[styles.tdRole, { flex: 1.4, textAlign: 'right' }]}>COORDENADOR(A)</Text>
                  </View>

                  <View style={[styles.tableRow, styles.tableRowAlt]}>
                    <Text style={[styles.tdName, { flex: 2 }]}>ELLEN CRISTINA BARBOSA DOS SANTOS</Text>
                    <Text style={[styles.tdCategory, { flex: 1 }]}>DOCENTE</Text>
                    <Text style={[styles.tdRole, { flex: 1.4, textAlign: 'right' }]}>COORDENADOR(A) ADJUNTO(A)</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={[styles.tdName, { flex: 2 }]}>ALBERTO ANDRÉ DE MENDONÇA FURTADO FILHO</Text>
                    <Text style={[styles.tdCategory, { flex: 1 }]}>EXTERNO</Text>
                    <Text style={[styles.tdRole, { flex: 1.4, textAlign: 'right' }]}>COLABORADOR(A)</Text>
                  </View>

                  <View style={[styles.tableRow, styles.tableRowAlt]}>
                    <Text style={[styles.tdName, { flex: 2 }]}>ANA LUIZA CAVALCANTI DOS SANTOS</Text>
                    <Text style={[styles.tdCategory, { flex: 1 }]}>EXTERNO</Text>
                    <Text style={[styles.tdRole, { flex: 1.4, textAlign: 'right' }]}>COLABORADOR(A)</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={[styles.tdName, { flex: 2 }]}>JEAN SCHEIEVANY DA SILVA ALVES</Text>
                    <Text style={[styles.tdCategory, { flex: 1 }]}>DISCENTE</Text>
                    <Text style={[styles.tdRole, { flex: 1.4, textAlign: 'right' }]}>COLABORADOR(A)</Text>
                  </View>
                </View>
              </View>

              {/* Resultados Esperados */}
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionHeading}>OBJETIVO E RESULTADOS ESPERADOS</Text>
                <Text style={styles.bodyParagraph}>
                  Validação da plataforma digital e chatbot interativo como ferramenta para suporte ao letramento em saúde, compreensão fisiológica e autonomia no autocuidado diário do Diabetes Mellitus Tipo 1 (DM1).
                </Text>
              </View>

              {/* Bases Normativas e Ética */}
              <View style={styles.ethicsBox}>
                <Text style={styles.ethicsText}>
                  Ambiente de apoio à pesquisa científica e tecnológica. Conteúdo estritamente educativo alinhado às diretrizes da SBD e ADA, não substituindo conduta ou diagnóstico médico.
                </Text>
              </View>
            </ScrollView>

            {/* Rodapé do Modal */}
            <View style={styles.modalFooter}>
              <Text style={styles.modalFooterCopyright}>
                © {new Date().getFullYear()} D1ARIO / UFPE. Todos os direitos reservados.
              </Text>
              <TouchableOpacity 
                style={styles.modalCloseCta}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCloseCtaText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    marginTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    maxWidth: 600,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 12,
  },
  compactBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: 6,
  },
  ufpeBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mainText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  infoButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  infoButtonText: {
    fontSize: 11,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  subCredits: {
    fontSize: 10,
    color: '#475569',
    marginTop: 6,
    textAlign: 'center',
  },
  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    width: '100%',
    maxWidth: 620,
    maxHeight: '88%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1E293B',
  },
  modalHeaderBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
    letterSpacing: 0.3,
  },
  modalSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
    gap: 14,
  },
  metaBox: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 12,
  },
  labelTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metaMainValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E2E8F0',
    lineHeight: 18,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusPill: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#93C5FD',
  },
  funderPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  funderText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6EE7B7',
  },
  sectionBlock: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 8,
    padding: 12,
  },
  sectionHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  thCell: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  tableRowAlt: {
    backgroundColor: 'rgba(255, 255, 255, 0.015)',
  },
  tdName: {
    fontSize: 11,
    color: '#E2E8F0',
    fontWeight: '600',
  },
  tdCategory: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  tdRole: {
    fontSize: 10,
    color: '#38BDF8',
    fontWeight: '700',
  },
  bodyParagraph: {
    fontSize: 11,
    color: '#CBD5E1',
    lineHeight: 17,
  },
  ethicsBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 6,
    padding: 10,
  },
  ethicsText: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 15,
    textAlign: 'center',
  },
  modalFooter: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalFooterCopyright: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  modalCloseCta: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  modalCloseCtaText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ResearchFooter;
