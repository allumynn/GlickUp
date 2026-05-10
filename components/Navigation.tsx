
import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Platform 
} from 'react-native';
import { 
  Home, 
  Info, 
  Droplet, 
  Apple, 
  AlertCircle, 
  MessageCircle 
} from 'lucide-react-native';
import { Page } from '../types';

interface NavigationProps {
  activeSection: Page;
  setActiveSection: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: Page.Home, icon: Home, label: 'Início' },
    { id: Page.Physiology, icon: Info, label: 'Fisio' },
    { id: Page.Insulin, icon: Droplet, label: 'Insulina' },
    { id: Page.Carbs, icon: Apple, label: 'Carbs' },
    { id: Page.SOS, icon: AlertCircle, label: 'S.O.S' },
    { id: Page.Chatbot, icon: MessageCircle, label: 'Bot' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setActiveSection(item.id)}
              style={[styles.tabItem, isActive && styles.activeTabItem]}
            >
              <item.icon 
                size={20} 
                color={isActive ? '#FFFFFF' : '#64748B'} 
              />
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 30,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    maxWidth: 500,
    justifyContent: 'space-around',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
      }
    })
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 20,
    flex: 1,
  },
  activeTabItem: {
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
  },
  label: {
    fontSize: 9,
    marginTop: 4,
    color: '#64748B',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
});

export default Navigation;
