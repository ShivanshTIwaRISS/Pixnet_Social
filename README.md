# PixNet - Instagram Clone Social Media Platform

A modern, full-featured Instagram-like social media platform built with React and Firebase. Features a complete UI/UX revamp with stunning dark and light modes, beautiful animations, and responsive design.

![PixNet Banner](https://via.placeholder.com/1200x400/000000/ffffff?text=PixNet+Social+Media+Platform)

## ✨ Features

### 🎨 **Modern Design System**
- Instagram-inspired UI/UX with pixel-perfect design
- Comprehensive CSS variable-based design system
- Smooth animations and micro-interactions
- Gradient effects and modern color schemes
- Beautiful dark and light mode support

### 🌓 **Theme Support**
- Seamless dark/light mode switching
- Persistent theme preferences
- CSS variables for easy customization
- Smooth theme transitions

### 📱 **Core Features**
- **Home Feed**: Stories bar, post feed, suggestions sidebar
- **Explore Grid**: Masonry-style image grid with infinite scroll
- **Profile Page**: User profile with posts, reels, saved, and tagged tabs
- **Upload Modal**: Step-by-step post creation flow
- **Inbox/Chat**: Real-time messaging interface
- **Notifications**: Activity feed with tabs
- **Saved Posts**: Collection-based saved content
- **Authentication**: Login, Register, Password Reset

### 🔥 **Technical Highlights**
- React 19 with hooks and context
- Firebase Authentication
- Firebase Firestore (ready for integration)
- Firebase Storage (ready for integration)
- React Router v7 for navigation
- Lucide React for icons
- Infinite scroll with Intersection Observer
- Responsive design for all devices
- CSS-in-JS with design tokens
- Optimized build size with code splitting

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for backend)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ShivanshTIwaRISS/Pixnet_Social.git
cd Pixnet_Social
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase config to `src/firebase.js`

4. **Start the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 📁 Project Structure

```
pixnet/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Feed.jsx         # Explore grid component
│   │   ├── Home.jsx         # Main feed with stories
│   │   ├── Inbox.jsx        # Messaging interface
│   │   ├── Navbar.jsx       # Navigation sidebar
│   │   ├── Notifications.jsx # Notifications page
│   │   ├── SavedPosts.jsx   # Saved posts page
│   │   └── UploadPost.jsx   # Post upload modal
│   ├── context/             # React context providers
│   │   └── ThemeContext.jsx # Theme provider
│   ├── pages/               # Page components
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── Profile.jsx      # User profile page
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── styles/              # CSS stylesheets
│   │   ├── design-system.css # Global design tokens
│   │   ├── Auth.css         # Authentication styles
│   │   ├── Home.css         # Home feed styles
│   │   ├── Navbar.css       # Navigation styles
│   │   ├── Profile.css      # Profile page styles
│   │   └── ...              # Other component styles
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── firebase.js          # Firebase configuration
├── public/                  # Static assets
├── package.json             # Dependencies
└── vite.config.js           # Vite configuration
```

## 🎨 Design System

### Color Palette

**Dark Theme (Default)**
- Primary Background: `#000000`
- Secondary Background: `#0a0a0a`
- Tertiary Background: `#121212`
- Text Primary: `#ffffff`
- Text Secondary: `#a8a8a8`
- Accent Blue: `#0095f6`
- Accent Red: `#ed4956`

**Light Theme**
- Primary Background: `#ffffff`
- Secondary Background: `#fafafa`
- Text Primary: `#262626`
- Text Secondary: `#8e8e8e`

### Typography
- Font Family: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`
- Base Font Size: `14px`
- Line Height: `1.6`

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1264px`
- Desktop: `> 1264px`

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🚀 Deployment

### Deploy to Firebase Hosting

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase**
```bash
firebase init
```

4. **Deploy**
```bash
npm run build
firebase deploy
```

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile devices** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Desktops** (1024px+)
- **Large screens** (1440px+)

## 🔐 Authentication Flow

- Email/Password authentication
- Password reset via email
- Protected routes with authentication guards
- Persistent login sessions

## 🎯 Future Enhancements

- [ ] Real-time messaging with Firebase
- [ ] Story creation and viewing
- [ ] Post likes and comments
- [ ] User follow/unfollow functionality
- [ ] Post sharing
- [ ] Real-time notifications
- [ ] Video upload support
- [ ] Image filters and editing
- [ ] Search functionality
- [ ] Explore page with categories
- [ ] Hashtags support
- [ ] Location tagging
- [ ] User mentions
- [ ] Direct messaging improvements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shivansh Tiwari**
- GitHub: [@ShivanshTIwaRISS](https://github.com/ShivanshTIwaRISS)
- Project Link: [https://github.com/ShivanshTIwaRISS/Pixnet_Social](https://github.com/ShivanshTIwaRISS/Pixnet_Social)

## 🙏 Acknowledgments

- Design inspired by [Instagram](https://instagram.com)
- Icons by [Lucide](https://lucide.dev)
- Built with [React](https://react.dev) and [Vite](https://vitejs.dev)
- Backend by [Firebase](https://firebase.google.com)

---

Made with ❤️ by Shivansh Tiwari
