# EducaDM1 - Guia Interativo de Diabetes Mellitus Tipo 1

Uma plataforma educativa moderna, interativa e acessível desenvolvida para jovens e adolescentes com Diabetes Mellitus Tipo 1 (DM1), familiares e profissionais de saúde. O objetivo é promover autonomia, segurança no manejo diário e compreensão profunda sobre o tratamento com insulina, contagem de carboidratos e situações de emergência.

---

## Principais Funcionalidades

### 1. Fisiologia & Mecanismo Biológico
- **Visualização do Mecanismo Chave-Fechadura**: Explicação didática de como a insulina permite a entrada da glicose nas células.
- **Entendendo a Causa Autoimune**: Como o sistema imunológico atua nas células beta do pâncreas e por que a reposição de insulina externa é essencial.

### 2. Terapia com Insulina & Mapa Anatômico Interativo
- **Mapa do Corpo Humano para Aplicação**:
  - Silhueta anatômica detalhada com vistas **Frontal** (anterior) e **Dorsal** (costas).
  - Regiões mapeadas com velocidades de absorção:
    - **Abdômen** (Vermelho): Absorção muito rápida, com raio de segurança do umbigo (2 a 3 dedos) e 4 quadrantes.
    - **Braços** (Azul): Absorção rápida na face lateral externa e posterior do terço médio.
    - **Coxas** (Amarelo): Absorção lenta na face anterior e anterolateral média.
    - **Glúteos / Flancos** (Verde): Absorção média/lenta no quadrante superior externo das nádegas.
  - Informações clínicas sobre indicação (basal vs. bônus de refeição) e técnicas de rodízio contra lipodistrofia.
- **Cinética das Insulinas**: Comparativo entre insulinas ultrarrápidas, rápidas (regulares), intermediárias (NPH) e basais de longa duração (início, pico e duração).
- **Armazenamento e Cuidados**: Diretrizes de refrigeração (2°C a 8°C), tempo em temperatura ambiente e situações de risco térmico.

### 3. Nutrição & Contagem de Carboidratos
- **Calculadora Interativa de Bônus**:
  - Cálculo de insulina para cobrir carboidratos consumidos (relação Insulina/Carboidrato - ICR).
  - Cálculo de bônus de correção para glicemias elevadas utilizando o Fator de Sensibilidade à Insulina (ISF / FCI) e meta glicêmica.
  - Cálculo do bônus total recomendado com explicação passo a passo.
- **Guia Visual de Alimentos**: Quantidades médias de carboidratos em porções usuais do cotidiano.

### 4. Modo SOS - Emergências Glicêmicas
- **Hipoglicemia (Glicemia < 70 mg/dL)**:
  - Protocolo da **Regra dos 15-15** (ingerir 15g de carboidrato simples de ação rápida, aguardar 15 minutos e reavaliar).
  - Orientações sobre o que evitar (gorduras, chocolates) durante a correção aguda.
- **Hiperglicemia & Alerta de Cetoacidose Diabética (CAD)**:
  - Sinais de alarme (vômitos, hálito cetônico, dor abdominal forte, respiração rápida).
  - Hidratação e conduta para busca de atendimento hospitalar imediato.

### 5. EducaBot - Assistente com Inteligência Artificial
- Assistente integrado utilizando a API do **Google Gemini** (`@google/genai`).
- Respostas rápidas e adaptadas para dúvidas do dia a dia sobre DM1 (exercícios, viagens, lanches, rodízio e glicemia).

---

## Tecnologias Utilizadas

- **Frontend**: [React 19](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- **Cross-Platform UI Engine**: [React Native for Web](https://necolas.github.io/react-native-web/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) & Estilos nativos tipados
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Inteligência Artificial**: [Google Gen AI SDK (`@google/genai`)](https://www.npmjs.com/package/@google/genai) com modelo Gemini

---

## Estrutura do Projeto

```text
├── components/
│   ├── HumanBodyMap.tsx    # Componente anatômico interativo do corpo humano (Frente/Costas)
│   └── Navigation.tsx      # Barra de navegação inferior / superior
├── pages/
│   ├── PhysiologyView.tsx  # Tela de Fisiologia e Biologia do DM1
│   ├── InsulinView.tsx     # Tela de Insulinas, Mapa de Aplicação e Armazenamento
│   ├── CarbView.tsx        # Tela de Contagem de Carboidratos e Calculadora de Bônus
│   ├── SOSView.tsx         # Tela de Emergências (Hipoglicemia e Hiperglicemia/CAD)
│   └── ChatbotView.tsx     # Chatbot Inteligente com IA
├── services/
│   └── geminiService.ts    # Integração com a API do Google Gemini
├── constants.tsx           # Paleta de cores, constantes médicas e dados estáticos
├── types.ts                # Definições de tipos TypeScript
├── App.tsx                 # Componente raiz e gerenciamento de estado global de navegação
└── package.json            # Dependências e scripts de execução
```

---

## Como Executar o Projeto Localmente

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- Gerenciador de pacotes **npm** ou **yarn** / **bun**

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/educadm1.git
cd educadm1
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional, para o assistente IA):
Crie um arquivo `.env` baseado no `.env.example`:
```env
GEMINI_API_KEY=sua_chave_gemini_aqui
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra o navegador em:
```
http://localhost:3000
```

---

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento Vite.
- `npm run build`: Compila o TypeScript e gera o bundle de produção em `/dist`.
- `npm run preview`: Executa localmente o build de produção para testes.
- `npm run lint`: Valida a tipagem e erros do código com `tsc --noEmit`.

---

## Aviso Médico / Disclaimer

Este aplicativo possui finalidade **exclusivamente educativa e informativa**. Os cálculos de bônus, guias de aplicação e orientações não substituem o acompanhamento individualizado realizado por médicos endocrinologistas, nutricionistas e equipe de saúde especializada.
