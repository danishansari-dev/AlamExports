# Alam Exports 🧵✨
### Premium B2B Export Portal & AI-Powered Rug Manufacturing Platform

[![React](https://img.shields.io/badge/React-19.2.3-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Google Gemini API](https://img.shields.io/badge/Google%20GenAI-1.34.0-8E75C2.svg?logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)

---

## 📌 Overview

**Alam Exports** is an enterprise-grade B2B digital export portal and manufacturer showcase for handcrafted luxury rugs, carpets, floor coverings, and home textiles based out of Bhadohi, India (the renowned carpet weaving cluster).

Designed specifically for international wholesale buyers, interior designers, commercial architects, and retail importers, the platform integrates **Google Gemini AI** and **Google Veo** to revolutionize traditional textile sourcing with generative rug prototyping, AI trend analysis, multimodal fabric inspection, and real-time technical consultation.

---

## 🌟 Key Features

### 🤖 Integrated AI Sourcing Suite (Google Gemini & Veo)
- **AI Sourcing Assistant**: Real-time B2B procurement advisor powered by **Gemini 3 Pro** with extended thinking capabilities.
- **Custom Rug Generator**: High-fidelity rug concept generation in custom aspect ratios (1K resolution) using **Gemini 3 Pro Image**.
- **Generative Video Previews**: Automated 16:9 cinematic lifestyle videos rendered via **Google Veo** (`veo-3.1-fast-generate-preview`) to visualize rugs in real environments.
- **Interactive Image Editing**: Modify designs with natural language prompts via **Gemini 2.5 Flash Image**.
- **Real-Time Global Trend Intelligence**: Live B2B trade and interior design market insights with **Google Search Grounding** via **Gemini 3 Flash**.
- **Multimodal Visual Analysis**: Upload fabric swatch or sample images to identify weaves, yarn counts, and technical specifications.

### 🛋️ Comprehensive Catalog & Sourcing
- **14+ Product Categories**: Floor Rugs, Hand Woven Carpets, Bath Mats, Cushions, Pillow Covers, Printed Carpets, Doormats, Outdoor & Pool Mats, Runners, Table Mats, Yoga & Exercise Mats, Acupressure Mats, Customized Rugs, and Carpet Runners.
- **Sustainable & Premium Materials**: Wool, Cotton, Jute, Hemp, Abaca, Silk, and Bamboo Silk.
- **Product Detail Showcases**: Technical specifications, GSM weights, yarn blends, backing types, high-resolution galleries, and video demonstrations.
- **Direct RFQ / Inquiry Flow**: Streamlined quotation requests with pre-filled product specs and WhatsApp/email direct connect.

### 🏛️ Trust & Compliance
- Transparent overview of manufacturing facilities, artisanal heritage, social compliance, and ethical labor standards in Bhadohi.
- Policy documentation including Privacy Policy, Terms & Conditions, and Disclaimer.

---

## 🧠 Gemini Models & Capabilities Matrix

| Capability | Model | Function / Use Case |
| :--- | :--- | :--- |
| **B2B Consultation & Thinking** | `gemini-3-pro-preview` | Deep technical reasoning, yarn calculation, and procurement consultation |
| **Generative Rug Design** | `gemini-3-pro-image-preview` | High-resolution 1:1, 16:9, or 4:3 custom rug prototype generation |
| **Lifestyle Video Generation** | `veo-3.1-fast-generate-preview` | Cinematic video rendering showcasing rugs in modern interior settings |
| **Prompt-Based Image Editing** | `gemini-2.5-flash-image` | Quick aesthetic modifications, colorway swaps, and pattern revisions |
| **Market Trend Research** | `gemini-3-flash-preview` | Live global trends powered by Google Search grounding |
| **Visual Sample Inspection** | `gemini-3-pro-preview` | Multimodal analysis of user-uploaded textile samples |

---

## 🏗️ Tech Stack & Architecture

- **Frontend Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing for catalog, forms, and AI payloads)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Inter typography
- **AI SDK**: [`@google/genai`](https://www.npmjs.com/package/@google/genai) (Official Google Gen AI SDK)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Routing**: Lightweight client-side hash routing (`window.location.hash`) for seamless SPA navigation without server rewrites

---

## 📁 Project Structure

```plaintext
AlamExports/
├── components/
│   ├── AISourcingAssistant.tsx   # Multi-tab AI studio (Chat, Lab, Trends, Edit)
│   ├── CategoryGrid.tsx          # Interactive product category browsing grid
│   ├── Footer.tsx                # Corporate footer with navigation & contact
│   ├── Header.tsx                # Responsive navigation bar & mega menu
│   ├── InquiryForm.tsx           # B2B quotation & RFQ modal form
│   ├── Layout.tsx                # Global application wrapper
│   ├── ProductCard.tsx           # Reusable product card with quick inquiry
│   └── ProductImageGallery.tsx   # Interactive media gallery with video support
├── lib/
│   └── gemini.ts                 # Google GenAI SDK integration & helper functions
├── pages/
│   ├── About.tsx                 # Company history, values, and Bhadohi heritage
│   ├── CategoryPage.tsx          # Category-filtered product listings
│   ├── Certifications.tsx        # Quality & social compliance certifications
│   ├── Contact.tsx               # Direct contact channels, maps, and RFQ form
│   ├── CustomRugs.tsx            # Custom design studio and Bespoke program
│   ├── Disclaimer.tsx            # Commercial & export terms disclaimer
│   ├── Home.tsx                  # Landing page with hero, showcases & highlights
│   ├── Materials.tsx             # Detailed guide on natural & synthetic fibers
│   ├── PrivacyPolicy.tsx         # Data privacy and compliance policies
│   ├── ProductDetailPage.tsx     # Single product deep-dive with specs & video
│   ├── Products.tsx              # Full product catalog with search & filters
│   └── TermsConditions.tsx       # Export contract terms and conditions
├── App.tsx                       # Root router & page resolver
├── constants.ts                  # Brand metadata, contact details, navigation
├── data.ts                       # Catalog items, categories, and sample specs
├── index.html                    # HTML5 entry with Tailwind & CDN dependencies
├── index.tsx                     # React DOM bootstrap
├── metadata.json                 # Web app metadata & AI studio configuration
├── package.json                  # Dependencies and build scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── types.ts                      # Interfaces for products, materials, and forms
└── vite.config.ts                # Vite build and plugin settings
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- Google Gemini API Key ([Get one at Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/danishansari-dev/AlamExports.git
   cd AlamExports
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create an `.env` file or export your Gemini API key:
   ```bash
   API_KEY=your_google_gemini_api_key_here
   ```
   *(Note: The AI studio interface also supports on-the-fly API key selection via AI Studio web hooks).*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled assets will be output to the `dist/` directory.

---

## 📞 Contact & Business Inquiries

- **Company**: Alam Exports
- **Location**: Uttar Pradesh, India
- **WhatsApp**: [+91 98375 48119](https://wa.me/919837548119)
- **Email**: [sales@alamexports.com](mailto:sales@alamexports.com)
- **Location Map**: [Google Maps](https://maps.app.goo.gl/XWxKDpPRS6bfUYFw5)

---

## 📄 License

This project is proprietary and confidential. All rights reserved by **Alam Exports**.
