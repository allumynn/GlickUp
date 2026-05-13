import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator 
} from 'react-native';
import { Send, Bot, Info } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatbotView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      parts: [{ text: "Oi! Sou o EducaBot. Posso te ajudar a entender melhor como lidar com o diabetes no dia a dia. O que você quer saber hoje?" }] 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const service = useRef(new GeminiService());

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newHistory: ChatMessage[] = [...messages, { role: 'user', parts: [{ text: userMsg }] }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await service.current.sendMessage(messages, userMsg);
      setMessages([...newHistory, { role: 'model', parts: [{ text: response || "Desculpe, tive um problema ao processar sua pergunta." }] }]);
    } catch (error) {
      console.error(error);
      setMessages([...newHistory, { role: 'model', parts: [{ text: "Opa, parece que minha conexão falhou. Tente novamente!" }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "O que é o protocolo 15-15?",
    "Exemplos de 15g de carbo",
    "Por que meu açúcar sobe?",
    "Locais de aplicação"
  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.botIcon}>
            <Bot size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>EducaBot AI</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.infoButton}>
          <Info size={16} color="#64748B" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chatArea}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item: msg }) => (
          <View style={[
            styles.messageWrapper, 
            msg.role === 'user' ? styles.userWrapper : styles.botWrapper
          ]}>
            <View style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : styles.botBubble
            ]}>
              <Text style={[
                styles.messageText,
                msg.role === 'user' ? styles.userText : styles.botText
              ]}>
                {msg.parts[0].text}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#AF52DE" />
            <Text style={styles.loadingText}>Digitando...</Text>
          </View>
        ) : null}
      />

      <View style={styles.suggestionsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.suggestionItem}
              onPress={() => setInput(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Pergunte qualquer coisa..."
          placeholderTextColor="#64748B"
        />
        <TouchableOpacity 
          onPress={handleSend}
          disabled={!input.trim() || isLoading}
          style={[styles.sendButton, (!input.trim() || isLoading) && styles.sendButtonDisabled]}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.disclaimer}>
        Atenção: O bot não substitui seu médico.
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 30,
    margin: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botIcon: {
    backgroundColor: '#AF52DE',
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: '#32D74B',
    borderRadius: 3,
  },
  statusText: {
    color: '#32D74B',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoButton: {
    padding: 8,
  },
  chatArea: {
    padding: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  botWrapper: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#E2E8F0',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  loadingText: {
    color: '#64748B',
    fontSize: 12,
  },
  suggestionsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  suggestionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  suggestionText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#050B18',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#AF52DE',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  disclaimer: {
    fontSize: 8,
    color: '#475569',
    textAlign: 'center',
    paddingBottom: 10,
    textTransform: 'uppercase',
    fontWeight: '900',
    letterSpacing: 1,
  },
});

export default ChatbotView;
