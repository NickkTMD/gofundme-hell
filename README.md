# GoFundMe Hell

A satirical web game that challenges players to guess whether real GoFundMe campaigns for children's medical expenses were successfully funded or fell short — highlighting the absurdity of crowdfunding healthcare in the wealthiest country on earth.

## How It Works

Players are shown 8 real GoFundMe campaigns for children facing medical emergencies. For each one, they guess whether the campaign reached its funding goal. After each guess, the game reveals the outcome and tracks the total unfunded medical debt across campaigns.

At the end, the game puts it all in perspective — comparing unfunded medical debt against billionaire net worths and the $220 billion in total US medical debt, while noting that 18 other developed nations have $0.

## Tech Stack

**Frontend** (`gofundme-vite/`)
- React 19, TypeScript, Vite
- Tailwind CSS
- React Router DOM

**Scraper** (`scraper/`)
- Puppeteer for web scraping
- Anthropic SDK (Claude) for extracting structured data from campaign pages
- Luxon for date parsing

## Getting Started

### Frontend

```bash
cd gofundme-vite
npm install
npm run dev
```

### Scraper

Requires an Anthropic API key.

```bash
cd scraper
npm install
npm run scrape
```

## Project Structure

```
gofundme-hell/
├── gofundme-vite/          # React frontend
│   ├── src/
│   │   ├── components/     # UI components (NavBar, game cards, overlays)
│   │   ├── config/         # Game configuration (rounds, funded count)
│   │   ├── data/           # Campaign data loading and filtering
│   │   └── pages/          # Home and Game pages
│   └── campaigns_metadata.json  # Scraped campaign data
└── scraper/                # Puppeteer + Claude data scraper
```

## Available Scripts

### Frontend (`gofundme-vite/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

### Scraper (`scraper/`)

| Command | Description |
|---------|-------------|
| `npm run scrape` | Run the GoFundMe scraper |
| `npm run clean` | Remove scraper output |
