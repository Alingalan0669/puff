# Puffin Dose - Vape Shop Website

Production-ready, mobile-first e-commerce website for **Puffin Dose**, a vape shop in Purok Malinawon, Bagumbayan, Lupon, Philippines 8207 (Est. 2022).

## Tech Stack
- **Next.js 14 (App Router)** + **TypeScript**
- **Tailwind CSS** (custom brand theme)
- **Framer Motion** (animations)
- **Zustand** (cart state persisted to `localStorage`)
- **Local JSON data** (`/data/products.json`, no backend)
- **next/font** (Google Fonts) + **next/image**

## Features
- Home, Shop, Product Detail, Cart Drawer, Checkout, Sale, About, Contact pages
- Dark purple + orange streetwear-inspired design with animated smoke background
- Age verification gate on first visit (18+, saved in `localStorage`)
- Product filtering/sorting/search/pagination on Shop
- Cart with variants (flavor/nicotine), quantity, and persisted state
- Checkout with Cash on Delivery / GCash and pre-filled Messenger/SMS order message
- Responsive, mobile-first layout, SEO metadata + Open Graph, accessibility-minded UI
- Adult-use disclaimer in footer

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Build & Lint
```bash
npm run lint
npm run build
npm start
```

## Project Structure
```text
app/                  # App Router pages & layout
  page.tsx            # Home
  shop/page.tsx       # Shop (filters, search, sort, pagination)
  product/[slug]/     # Product detail
  checkout/page.tsx   # Checkout & order confirmation
  sale/page.tsx       # Sale products
  about/page.tsx      # About Puffin Dose
  contact/page.tsx    # Contact form & details
components/           # Reusable UI components
  Navbar.tsx, Footer.tsx, ProductCard.tsx, CartDrawer.tsx, AgeGate.tsx,
  Marquee.tsx, SmokeBackground.tsx, CountdownTimer.tsx, FilterSidebar.tsx,
  SectionHeading.tsx
data/
  products.json       # Product catalog (local data)
lib/
  products.ts         # Product helpers/queries/formatting
store/
  useCart.ts          # Zustand cart store (persisted)
types/
  index.ts            # Shared TypeScript types
public/
  logo.png            # Site logo (replace with real file)
```

## How to Edit

### Products (`/data/products.json`)
Each product includes:
- `id`, `slug`, `name`, `brand`, `category`
- `price` (PHP number), `salePrice` (number or `null`)
- `flavors` (string[]), `nicotineStrengths` (string[])
- `stock`, `description`, `image`
- optional: `featured`, `bestSeller`

Tips:
- Set `salePrice` lower than `price` to show sale/discount.
- Use unique `slug` values for product URLs (`/product/<slug>`).
- Images can be local (`/public/...`) or remote URLs (configured in `next.config.mjs`).

### Contact Info
Update contact details in:
- `components/Footer.tsx`
- `app/contact/page.tsx`
- `app/checkout/page.tsx` (SMS recipient/links if desired)

Current details:
- Address: Purok Malinawon, Bagumbayan, Lupon, Philippines, 8207
- Smart: 0985 793 8596, 0930 126 3997
- Globe: 0945 211 7917
- Facebook: Puffin Dose Vs

### Colors & Theme
Brand colors/fonts are defined in:
- `tailwind.config.ts` (colors, fonts, animations, shadows)
- `app/globals.css` (base styles/utilities)
- `app/layout.tsx` (Google fonts via `next/font`)

Key colors:
- Deep purple primary: `#3B1A7A` (scale `#1A0B2E`–`#6B2FD6`)
- Orange accent: `#F59A1B`
- Background: `#0D0716`
- Text: `#FFFFFF`, Lavender: `#C9B8F0`

### Logo
Replace `public/logo.png` with the official Puffin Dose logo (circular badge). The app references `/logo.png` in the navbar and metadata/Open Graph.

## Notes
- No backend: checkout generates a confirmation and pre-filled order message links (Messenger/SMS) for manual coordination.
- Cart and age verification are stored in browser `localStorage`.
- Legal: *For adult smokers only. Not for minors. Nicotine is addictive.*

> Note: The environment image file `puff.jpg` (if provided separately) could not be previewed by this model during generation; place your logo at `public/logo.png` as needed.
