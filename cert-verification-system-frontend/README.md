# 🎓 CertChain - Academic Certificate Verification System

A beautiful, modern blockchain-based academic certificate verification system built with React, Vite, and Tailwind CSS. This demo application showcases how educational institutions can issue, manage, and verify academic credentials using blockchain technology.

![CertChain Banner](src/assets/dashboard.png)

## ✨ Features

### 🎯 Three User Roles

#### 👨‍🎓 Student
- View all issued certificates in a beautiful card layout
- Share verification links with employers and institutions
- Download and print certificates
- Track certificate status (Valid/Revoked)

#### 🏛️ Issuer (University/Institution)
- Issue new academic certificates with custom details
- Manage all issued certificates in a comprehensive table
- Revoke certificates when necessary
- Celebrate issuance with confetti animations 🎉

#### 🔍 Verifier (Employer/Institution)
- Instantly verify certificate authenticity
- Search certificates by ID
- View complete certificate details
- Check revocation status

### 🎨 Design Features
- **Glassmorphism UI** - Modern frosted glass effects
- **Gradient Backgrounds** - Beautiful purple/pink/blue themes
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Design** - Works perfectly on all devices
- **Dark Theme** - Easy on the eyes
- **Interactive Elements** - Hover effects, transitions, and micro-interactions

### 🔐 Blockchain Simulation
- Mock wallet connection system
- Role-based access control
- Immutable certificate records
- Cryptographic hash verification
- Transparent certificate lifecycle

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or create the project:**
```bash
npm create vite@latest cert-verification-system -- --template react
cd cert-verification-system
```

2. **Install dependencies:**
```bash
npm install react-router-dom framer-motion lucide-react
```

3. **Install Tailwind CSS:**
```bash
npm install -D tailwindcss@3.4.17 postcss autoprefixer
```

4. **Setup Tailwind configuration:**

Create `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `postcss.config.js`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

5. **Update `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

6. **Copy the App.jsx code** into `src/App.jsx`

7. **Run the development server:**
```bash
npm run dev
```

8. **Open your browser:**
Navigate to `http://localhost:5173/`

## 📁 Project Structure

```
cert-verification-system/
├── node_modules/
├── public/
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.css        # Tailwind CSS imports
│   └── main.jsx         # React entry point
├── index.html
├── package.json
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── README.md
```

## 🎮 How to Use

### Landing Page
1. Visit the landing page
2. Choose your role:
   - **Start as Student** - View and manage your certificates
   - **Start as Issuer** - Issue and manage institutional certificates
   - **Start as Verifier** - Verify certificate authenticity

### Mock Wallet Addresses
- **Issuer**: `0x1111111111111111111111111111111111111111`
- **Student**: `0x2222222222222222222222222222222222222222`
- **Verifier**: `0x3333333333333333333333333333333333333333`

### Testing Features

#### As a Student:
- View your certificate collection
- Click "View" to see certificate details
- Click the share icon to copy verification link
- Access certificates at `/verify/1`, `/verify/2`, etc.

#### As an Issuer:
- Click "Issue New Certificate" button
- Fill in student details
- Submit to issue (watch the confetti! 🎊)
- Click "Revoke" to invalidate certificates

#### As a Verifier:
- Enter certificate ID (try: 1, 2, or 3)
- Click "Verify Certificate"
- View complete certificate details
- Check validation status

### Public Verification
Access any certificate directly:
- `http://localhost:5173/verify/1` - Valid certificate
- `http://localhost:5173/verify/2` - Valid certificate
- `http://localhost:5173/verify/3` - Revoked certificate
- `http://localhost:5173/verify/999` - Not found

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animation library |
| **Lucide React** | Beautiful icons |
| **React Router DOM** | Client-side routing |

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "3.4.17",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.1"
  }
}
```

## 🎨 Color Palette

- **Primary Purple**: `#a855f7` to `#ec4899`
- **Success Green**: `#10b981` to `#059669`
- **Error Red**: `#ef4444` to `#dc2626`
- **Background**: Dark gradients from gray-900, purple-900, blue-900
- **Accent**: Cyan `#06b6d4`, Pink `#ec4899`

## 🔥 Key Features Breakdown

### Routing System
- Custom React Router implementation
- Dynamic route parameters for certificate verification
- 404 error handling
- Programmatic navigation

### State Management
- React Context API for global state
- Role-based access control
- Mock wallet connection system
- Certificate CRUD operations

### Animations
- Page transitions
- Hover effects
- Confetti on certificate issuance
- Loading skeletons
- Smooth modal animations

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly interactions

## 🚀 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` folder.

## 📤 Deployment

Deploy to any static hosting service:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🐛 Troubleshooting

### Issue: Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Issue: Tailwind styles not loading
```bash
# Restart dev server
# Ctrl+C then npm run dev
```

### Issue: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: PostCSS error with Tailwind v4
```bash
npm uninstall tailwindcss
npm install -D tailwindcss@3.4.17
```

## 🎯 Future Enhancements

- [ ] Real blockchain integration (Ethereum, Polygon)
- [ ] IPFS storage for certificate PDFs
- [ ] Email notifications for certificate issuance
- [ ] Bulk certificate upload
- [ ] QR code generation for quick verification
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Export certificates as PDF
- [ ] Advanced search and filtering
- [ ] Analytics dashboard for issuers
- [ ] Smart contract integration
- [ ] MetaMask wallet connection

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

Built with ❤️ by the CertChain Team

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com/) for beautiful images
- [Lucide](https://lucide.dev/) for amazing icons
- [Tailwind CSS](https://tailwindcss.com/) for incredible styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

Having issues? 

- Check the [Troubleshooting](#-troubleshooting) section
- Open an issue on GitHub
- Review the code comments in `App.jsx`

---

**⭐ If you find this project helpful, please give it a star!**

Made with React ⚛️ • Styled with Tailwind 🎨 • Animated with Framer Motion ✨