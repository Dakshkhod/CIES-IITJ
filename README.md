# CIES IIT Jodhpur

Official website for the **Civil & Infrastructure Engineering Society** at IIT Jodhpur.

## 🌐 Live Demo

- **Website**: [cies.iitj.ac.in](https://cies.iitj.ac.in)


## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| **CMS** | Sanity CMS (Headless) |
| **Database** | Neon Postgres (Serverless) |
| **Hosting** | Vercel (Frontend + API Routes) |
| **Image CDN** | Sanity CDN |

---

## 📁 Project Structure

```
CIES-IITJ/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── activities/        # Activities page
│   ├── events/            # Events page
│   ├── team/              # Team page
│   ├── roadmap/          # Roadmap & Calendar page
│   ├── contact/          # Contact page
│   ├── admin/             # Admin panel (contact submissions)
│   ├── studio/            # Sanity Studio
│   └── api/               # API routes (contact form)
├── components/            # React components
│   └── layout/            # Layout components
├── lib/                   # Utilities
│   ├── sanity.ts          # Sanity CMS client & queries
│   ├── db.ts              # Neon Postgres client
│   └── utils.ts           # Helper functions
├── sanity/                # Sanity schemas
│   └── schemas/           # Content type definitions
├── scripts/               # Migration scripts
├── public/                # Static assets
└── README.md
```

---

## 🎨 Features

- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Dark/Light Mode** - System preference with manual toggle
- ✅ **Content Management** - Sanity Studio for easy content updates
- ✅ **Contact Form** - Serverless API with Neon Postgres storage
- ✅ **Admin Panel** - View and manage contact form submissions
- ✅ **SEO Optimized** - Meta tags, Open Graph, structured data
- ✅ **Accessibility** - WCAG compliant
- ✅ **Performance** - Optimized images, lazy loading, CDN

---

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Neon Postgres Documentation](https://neon.tech/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

## 👥 Team

Developed by the **CIES Technical Committee**, IIT Jodhpur.

---

## 📄 License

© 2025 Civil & Infrastructure Engineering Society, IIT Jodhpur. All Rights Reserved.
