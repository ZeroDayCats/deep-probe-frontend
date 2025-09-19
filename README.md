# 🚀 Deep Probe - AI Research Assistant Frontend

<div align="center">

(https://img.shields.io/badge/Deep%20Probe-AI%20Research%20Assistant-8B5CF6?style=for-the

**Next-Generation AI-Powered Research Platform**

_Built for Stellar Hackathon 2025 | MGM University_

[![React](https://img.shields.io/badge/React-18.x-61DAFB?stylettps://img.shields.io/badge/TypeScript-5.x-3178C6?lwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor-5.x-646CFF?style=flat-square&logo=v

[📖 Documentation](#) - [🎥 Video Demo](https://www.youtube.com/watch?v=U2Yy6iEWLBI)

</div>

---

## 🎯 Overview

**Deep Probe** is a revolutionary AI-powered research assistant that combines the intelligence of Google Gemini with 13+ specialized tools to provide comprehensive, real-time research capabilities. This frontend application delivers a premium, responsive user experience with modern design principles and seamless tool integration.

### ✨ Key Features

🔍 **Multi-Tool Research** - Seamlessly switch between 13+ research tools
🎨 **Premium UI/UX** - Glass morphism design with smooth animations  
📱 **Fully Responsive** - Mobile-first design with collapsible sidebar
⚡ **Real-Time Streaming** - Live AI responses with typing indicators
🛠️ **Smart Tool Selection** - Auto, manual, and quick group modes
💬 **Session Management** - Persistent chat history with easy navigation
🎭 **Beautiful Components** - Custom tool icons with gradient animations
🌙 **Modern Architecture** - Clean, maintainable, and scalable codebase

---

## 🛠️ Technology Stack

| Category               | Technologies                            |
| ---------------------- | --------------------------------------- |
| **Frontend Framework** | React 18.x with TypeScript              |
| **Styling**            | Tailwind CSS 3.x with Custom Components |
| **Build Tool**         | Vite 5.x for lightning-fast development |
| **Icons**              | Lucide React for consistent iconography |
| **State Management**   | React Hooks with Context API            |
| **HTTP Client**        | Fetch API with custom error handling    |
| **Animations**         | CSS Transitions & Tailwind Animations   |

---

## 🔧 Integrated Tools

Deep Probe supports **13+ specialized research tools**:

### 🌐 **Search & Information**

- **🔍 Google Search** - Web search with real-time results
- **📰 News Search** - Latest news and current events
- **📚 Wikipedia** - Encyclopedia and reference data
- **🏥 PubMed** - Medical research and scientific papers

### 💻 **Development & Code**

- **🐙 GitHub Search** - Repository and code discovery
- **🌐 Web Scraper** - HTML content analysis and extraction

### 🗺️ **Location & Geography**

- **🗺️ Maps Search** - Location discovery via OpenStreetMap
- **🏁 Country Info** - Demographics and country statistics
- **🕐 Timezone API** - World timezone information

### 📊 **Finance & Market**

- **📈 Stock Price** - Real-time market data and analysis

### 🎥 **Media & Content**

- **📺 YouTube Search** - Video discovery and content analysis
- **📝 Transcript** - Video transcription and text extraction

### 🌤️ **Weather & Environment**

- **☁️ Weather Forecast** - Real-time weather data and predictions

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/zerodaycats/deep-probe-frontend.git
   cd deep-probe-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

---

## 🎨 Design System

### Color Palette

- **Primary Brand**: `#8B5CF6` (Purple 500)
- **Secondary**: `#06B6D4` (Cyan 500)
- **Success**: `#10B981` (Emerald 500)
- **Warning**: `#F59E0B` (Amber 500)
- **Error**: `#EF4444` (Red 500)

### Component Architecture

- **Glass Morphism**: Backdrop blur effects with transparency
- **Gradient Animations**: Smooth color transitions
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant

---

## 🔧 Configuration

### Tool Configuration

All tools are centrally managed in `src/config/toolsConfig.ts`:

```typescript
export const TOOLS_CONFIG: ToolConfig[] = [
  {
    name: "google_search",
    displayName: "Search",
    description: "Search the web",
    category: "search",
    icon: "Search",
  },
  // ... more tools
];
```

### Adding New Tools

1. Add tool configuration to `TOOLS_CONFIG`
2. Update tool groups if needed
3. Add corresponding icon and gradient
4. Tool automatically appears in UI

---

## 📱 Responsive Features

### Desktop (≥1024px)

- **Full sidebar** with tool groups and session history
- **Collapsible mode** for focused writing
- **Hover interactions** and advanced animations

### Tablet (768px - 1023px)

- **Adaptive layout** with optimized spacing
- **Touch-friendly** interface elements
- **Swipe gestures** for navigation

### Mobile (<768px)

- **Slide-out sidebar** with backdrop overlay
- **Bottom-aligned** tool selector
- **Optimized typography** for small screens

---

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
```

### Code Quality Tools

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality checks
- **TypeScript** - Static type checking

---

## 🌟 Key Components

### ChatArea

The main chat interface featuring:

- **Empty state** with interactive examples
- **Message rendering** with tool badges
- **Loading states** with animated indicators
- **Auto-scrolling** to latest messages

### ToolSelector

Advanced tool selection with:

- **Three modes**: Auto, None, Manual
- **Quick groups** for common use cases
- **Individual tools** with visual icons
- **Real-time sync** with message content

### Sidebar

Responsive navigation featuring:

- **Session management** with creation/deletion
- **Collapsible design** for desktop
- **Mobile drawer** with smooth animations
- **Recent chats** with timestamps

---

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **TypeScript** for type safety
- **Functional components** with hooks
- **Tailwind CSS** for styling
- **Responsive design** principles
- **Accessibility** best practices

---

## 👨‍💻 Authors & Contributors

### Lead Developer

**Khan Abdul Rahman** - _Full Stack | Ai Pipeline Development_

- 🐙 GitHub: [@danish-mar](https://github.com/danish-mar)
- 🌐 LinkedIn: [Your Profile](https://www.linkedin.com/in/danish-ahmed-587678329/)

### Acknowledgments

- **MGM University** - For hosting Stellar Hackathon 2025
- **Google** - For Gemini AI API access
- **OpenStreetMap** - For location services
- **GitHub** - For repository hosting and APIs

---

## 🏆 Hackathon Information

**Event**: Stellar Hackathon 2025  
**Institution**: MGM University  
**Category**: AI/ML & Web Development  
**Duration**: 48 Hours  
**Team Size**: Individual Project

### Awards & Recognition

- 🥇 **Best UI/UX Design** - Stellar Hackathon 2025
- 🚀 **Most Innovative AI Integration** - Technical Excellence Award
- 💎 **People's Choice Award** - Community Voting

---

**Made with ❤️ for Stellar Hackathon 2025**

_Empowering research through intelligent AI assistance_

[⬆ Back to Top](#-deep-probe---ai-research-assistant-frontend)

</div>
