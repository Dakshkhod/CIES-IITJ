# CIES IIT Jodhpur - Homepage

Official homepage for the Civil & Infrastructure Engineering Society at IIT Jodhpur.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cies-iitj

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── team/              # Team page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
└── public/               # Static assets
```

## 🎨 Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching with persistence
- **SEO Optimized**: Meta tags and structured data
- **Accessibility**: WCAG compliant
- **Performance**: Optimized images and animations

## 🖼️ Required Assets

Add these files to the `public/` directory:

```
public/
├── iitj-logo-transparent.png    # Light mode logo
├── iitj-logo-white-outline.png  # Dark mode logo
├── logo.jpg                     # CIES logo
├── favicon.ico                  # Favicon
├── Team images/                 # Team member photos
│   ├── Shashank.jpeg
│   ├── Mayank.jpeg
│   └── ... (other team photos)
└── manifest.json               # PWA manifest
```

## ⚙️ Configuration

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://cies.iitj.ac.in
NEXT_PUBLIC_CONTACT_EMAIL=office@civil.iitj.ac.in
```

### Customization

- **Colors**: Update `tailwind.config.js` for brand colors
- **Content**: Modify data in components for team info, activities
- **Images**: Replace logos and team photos in `public/`

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

### Development Guidelines

- Use TypeScript for all new code
- Follow existing code style and formatting
- Test on multiple devices and browsers
- Ensure accessibility compliance
- Update documentation for significant changes

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checking
npm run format       # Format code with Prettier
```

## 📄 License

© 2024 Civil & Infrastructure Engineering Society, IIT Jodhpur. All Rights Reserved.
