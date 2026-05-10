
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  Dimensions,
  Platform,
  Text,
  TouchableOpacity
} from 'react-native';
import { AlertTriangle, Settings, RefreshCw } from 'lucide-react';
import { Page } from './types';
import Navigation from './components/Navigation';
import HomeView from './pages/HomeView';
import PhysiologyView from './pages/PhysiologyView';
import InsulinView from './pages/InsulinView';
import CarbView from './pages/CarbView';
import SOSView from './pages/SOSView';
import ChatbotView from './pages/ChatbotView';

const { width, height } = Dimensions.get('window');

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Page>(Page.Home);
  const [isApiKeyMissing, setIsApiKeyMissing] = useState(false);

  useEffect(() => {
    // Check for API Key on startup
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      setIsApiKeyMissing(true);
    }
  }, []);

  const renderContent = () => {
    if (isApiKeyMissing && activeSection === Page.Chatbot) {
      return (
        <View style={styles.warningContainer}>
          <View style={styles.warningCard}>
            <AlertTriangle size={48} color="#F59E0B" />
            <Text style={styles.warningTitle}>IA Não Configurada</Text>
            <Text style={styles.warningText}>
              A chave da API (GEMINI_API_KEY) não foi encontrada no ambiente. 
              O assistente virtual precisa desta chave para responder às suas perguntas.
            </Text>
            
            <View style={styles.instructionBox}>
              <Text style={styles.instructionText}>
                Para configurar:
              </Text>
              <Text style={styles.stepText}>
                1. Abra o menu "Settings" no AI Studio.
              </Text>
              <Text style={styles.stepText}>
                2. Adicione GEMINI_API_KEY com sua chave da API Gemini.
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => {
                const apiKey = process.env.GEMINI_API_KEY;
                if (apiKey && apiKey !== 'undefined' && apiKey !== '') {
                  setIsApiKeyMissing(false);
                }
              }}
            >
              <RefreshCw size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    switch (activeSection) {
      case Page.Home:
        return <HomeView setPage={(p) => setActiveSection(p as Page)} />;
      case Page.Physiology:
        return <PhysiologyView />;
      case Page.Insulin:
        return <InsulinView />;
      case Page.Carbs:
        return <CarbView />;
      case Page.SOS:
        return <SOSView />;
      case Page.Chatbot:
        return <ChatbotView />;
      default:
        return <HomeView setPage={(p) => setActiveSection(p as Page)} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Decorativo (Simulado com Views) */}
      <View style={styles.background}>
        <View style={[styles.blob, styles.blob1, { opacity: activeSection === Page.Home ? 0.3 : 0.1 }]} />
        <View style={[styles.blob, styles.blob2, { opacity: activeSection === Page.Physiology ? 0.3 : 0.1 }]} />
        <View style={[styles.blob, styles.blob3, { opacity: activeSection === Page.Carbs ? 0.2 : 0.05 }]} />
      </View>

      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Global API Key Warning for all pages if it's missing (Top Bar style) */}
      {isApiKeyMissing && activeSection !== Page.Chatbot && (
        <View style={styles.topWarning}>
          <AlertTriangle size={14} color="#F59E0B" />
          <Text style={styles.topWarningText}>Aviso: IA offline (Chave API ausente)</Text>
        </View>
      )}

      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B18',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Espaço para a Tab Bar
  },
  blob: {
    position: 'absolute',
    borderRadius: 1000,
  },
  blob1: {
    width: 600,
    height: 600,
    top: -100,
    left: -100,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
  },
  blob2: {
    width: 500,
    height: 500,
    top: height * 0.4,
    right: -100,
    backgroundColor: 'rgba(175, 82, 222, 0.3)',
  },
  blob3: {
    width: 700,
    height: 700,
    bottom: -100,
    left: 100,
    backgroundColor: 'rgba(50, 215, 75, 0.2)',
  },
  // Estilos para o Aviso da API
  warningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  warningCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    maxWidth: 400,
    width: '100%',
  },
  warningTitle: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  warningText: {
    color: '#94A3B8',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  instructionBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  instructionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
  },
  stepText: {
    color: '#CBD5E1',
    fontSize: 13,
    marginBottom: 4,
  },
  retryButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  topWarning: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    zIndex: 100,
  },
  topWarningText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default App;
