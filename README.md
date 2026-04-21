# ClinicalTrace — Drug Adverse Event Timeline

A clinical data visualization tool that lets users search any drug and instantly see FDA-reported adverse events visualized across multiple interactive charts.

Built as a portfolio project to demonstrate health data visualization skills using React and the OpenFDA public API.

## Live Demo
[health-timeline.vercel.app](https://health-timeline.vercel.app)

## Features

- **Event Timeline** — plots 100 adverse event reports chronologically, color-coded by severity (red = serious, blue = non-serious)
- **Top 10 Reactions** — proportional bar layout showing the most frequently reported reactions for the searched drug
- **Reports by Country** — bar chart breaking down which countries submitted the most reports
- **Serious vs Non-serious Over Time** — line chart showing how severity trends across the reporting window
- **Event Detail Card** — click any dot on the timeline to see full report details including patient age, sex, country, and all reported reactions

## Tech Stack

- **React** — component-based UI
- **Vite** — development server and build tool
- **Recharts** — charting library for the timeline, bar, and line charts
- **OpenFDA API** — free public FDA adverse event reporting database, no API key required

## Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/health-timeline.git
cd health-timeline

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## How It Works

1. User searches a drug name (e.g. "aspirin", "ibuprofen")
2. App fetches 100 reports from the OpenFDA `/drug/event` endpoint
3. Reports are parsed and distributed across four visualizations
4. Clicking any timeline dot opens a detailed event card

## API

Uses the [OpenFDA Drug Adverse Event API](https://open.fda.gov/apis/drug/event/) — completely free with no authentication required.

Example query:
