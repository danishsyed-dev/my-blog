# Danish Syed - Research Portfolio

A professional research portfolio and technical blog built with Next.js, TypeScript, and Tailwind CSS.

🔗 **Live Site**: [danishsyed.dev](https://danishsyed.dev) *(Update with your actual domain)*

## ✨ Features

- **Project Gallery** - Showcase research projects with detailed case studies
- **Technical Blog** - Share insights and learnings from AI/ML work
- **Publications Section** - Ready for academic papers and preprints
- **Resume/CV** - Downloadable resume with preview
- **Contact Form** - Professional inquiry form
- **Dark Theme** - Modern, research-focused design
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Responsive** - Works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter, Playfair Display, JetBrains Mono
- **Deployment**: Vercel / GitHub Pages

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing & posts
│   │   └── [id]/          # Dynamic blog post pages
│   ├── contact/           # Contact page with form
│   ├── projects/          # Projects listing & details
│   │   └── [id]/          # Dynamic project pages
│   ├── publications/      # Publications page
│   ├── resume/            # Resume/CV page
│   ├── globals.css        # Global styles & design system
│   ├── layout.tsx         # Root layout with navbar/footer
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── BlogCard.tsx
│   ├── ContactForm.tsx
│   └── index.ts           # Barrel exports
├── data/                  # Static data files
│   ├── projects.ts        # Project data
│   ├── blog.ts            # Blog post data
│   ├── publications.ts    # Publications data
│   └── site.ts            # Site configuration
└── lib/                   # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danishsyed-dev/my-blog.git
   cd my-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Update Site Information

Edit `src/data/site.ts` to update:
- Name and title
- Social media links
- About section content
- Resume information

### Add Projects

Edit `src/data/projects.ts` to add new projects with:
- Title and description
- Problem statement
- Methodology
- Results
- Tools & technologies
- Links (GitHub, live demo, dataset, paper)

### Add Blog Posts

Edit `src/data/blog.ts` to add new articles with:
- Title and excerpt
- Full content (supports basic markdown)
- Tags
- Date and read time

### Add Publications

Edit `src/data/publications.ts` when you have papers to add.

### Add Resume

Place your resume PDF in `public/resume.pdf`.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy automatically

### GitHub Pages

1. Update `next.config.ts`:
   ```ts
   const nextConfig = {
     output: 'export',
     basePath: '/my-blog',
     images: { unoptimized: true },
   };
   ```

2. Build the static site:
   ```bash
   npm run build
   ```

3. Deploy the `out` directory to GitHub Pages

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Google Fonts](https://fonts.google.com/) - Inter, Playfair Display, JetBrains Mono

---

Built with ❤️ by Syed Danish Ali
