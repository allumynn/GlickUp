
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  Dimensions,
  Platform
} from 'react-native';
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

  const renderContent = () => {
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
});

export default App;
