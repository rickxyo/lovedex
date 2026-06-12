# Lovedex 💌

A relationship card generator with a unique shareable link, built for the people you love and designed to live in your portfolio.

Lovedex lets you create a personalized card with relationship stats and share it through a unique URL. The recipient gets an animated experience with a custom opening message, a pixel-art envelope sequence, confetti, a personalized question, and a Strava-style card containing the couple's data. It started as a Valentine's Day gift and evolved into a complete product.

## Preview

![Lovedex Preview](./docs/preview.png)

## The Experience

**For the creator:** Fill out a three-step form with names, start date, city, opening message, main question, card message, mascot, and theme. Generate the Lovedex and receive a unique link to share.

**For the recipient:** Open the link, read the opening message, continue to the animated envelope, trigger the confetti sequence, open the personalized question, and view the relationship card with calculated stats. The final card can be exported as a PNG.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 with App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| ORM | Prisma |
| Database | PostgreSQL via Supabase |
| ID generation | nanoid |
| Image export | html2canvas |

## Features

- Multi-step form with animated transitions between steps
- Custom date selector with no native browser dropdown UI
- Animated mascot images for Sushi, Tamagoyaki, and Açaí
- Custom opening message shown before the animated ticket
- Customizable main question displayed in the public experience
- Strava-style relationship card with days together, start date, location, and co-op status
- Three visual card themes: Rose, Purple, and Midnight
- Unique shareable link at `/r/[hash]`
- Share confirmation and card preview at `/share/[hash]`
- PNG card export through `html2canvas`
- Animated envelope opening with CSS confetti
- Hash-based access with no authentication required
- Friendly loading and invalid-link states

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A PostgreSQL database
- A Supabase project is recommended

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/lovedex.git
cd lovedex
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-[region].pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

`DATABASE_URL` is used by the application connection pool. `DIRECT_URL` is used by Prisma for schema operations.

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

The `LoveDex` model stores:

- Unique hash
- Creator and partner names
- Relationship start date
- Optional city
- Optional opening message
- Optional main question
- Optional card message
- Mascot identifier
- Card theme
- Creation timestamp

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
lovedex/
├── prisma/
│   └── schema.prisma                   # PostgreSQL datasource and LoveDex model
├── public/
│   └── mascots/
│       ├── acai.png                    # Açaí mascot asset
│       ├── sushi.png                   # Sushi mascot asset
│       └── tamagoyaki.png              # Tamagoyaki mascot asset
├── src/
│   ├── app/
│   │   ├── api/lovedex/
│   │   │   ├── route.ts                # POST endpoint that creates a Lovedex
│   │   │   └── [hash]/route.ts         # GET endpoint that retrieves a Lovedex
│   │   ├── r/[hash]/
│   │   │   ├── loading.tsx             # Public-page loading state
│   │   │   └── page.tsx                # Server-rendered recipient route
│   │   ├── share/[hash]/page.tsx        # Share link and card preview page
│   │   ├── globals.css                  # Tailwind layers and pixel-art utilities
│   │   ├── layout.tsx                   # Root layout, fonts, metadata, and transitions
│   │   ├── not-found.tsx                # Friendly invalid-link page
│   │   └── page.tsx                     # Creator form route
│   ├── components/
│   │   ├── EditorForm.tsx               # Animated three-step creation form
│   │   ├── LoveDexCard.tsx              # Relationship card and PNG export
│   │   ├── PageTransitionProvider.tsx    # Route transition wrapper
│   │   ├── PixelDateSelect.tsx           # Day, month, and year date control
│   │   ├── PixelDropdown.tsx             # Reusable custom dropdown component
│   │   ├── PixelIcon.tsx                 # Inline pixel-style interface icons
│   │   ├── PixelMascot.tsx               # Mascot selection and animation
│   │   ├── PublicLoveDexExperience.tsx   # Intro, ticket, question, and card stages
│   │   └── SharePageClient.tsx           # Clipboard and public-link actions
│   ├── lib/
│   │   ├── form-controls.ts              # Form guards, date helpers, and fallback text
│   │   ├── prisma.ts                     # Prisma Client singleton
│   │   └── utils.ts                      # Hash generation and relationship metrics
│   └── types/
│       └── lovedex.ts                    # Shared form, record, view, theme, and mascot types
├── tests/                                # Node test runner regression tests
├── .env.local                            # Local environment variables
├── package.json                          # Scripts and dependencies
├── tailwind.config.ts                    # Retro romantic design tokens
└── tsconfig.json                         # TypeScript and path alias configuration
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Three-step Lovedex creation form |
| `/share/[hash]` | Shareable URL, copy action, and card preview |
| `/r/[hash]` | Public recipient experience |
| `POST /api/lovedex` | Create and persist a Lovedex |
| `GET /api/lovedex/[hash]` | Retrieve a Lovedex by hash |

## Deploy

**Frontend:** Deploy the Next.js application on Vercel. Connect the GitHub repository and configure the production environment variables.

**Database:** Use a Supabase PostgreSQL database. Add `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_BASE_URL` to the Vercel project settings.

Run the following commands against the production database before the first deployment:

```bash
npx prisma generate
npx prisma db push
```

## License

MIT
