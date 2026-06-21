# Popcorn-MD

![Obsidian](https://img.shields.io/badge/Obsidian-Plugin-7C3AED?style=flat-square&logo=obsidian)
![Version](https://img.shields.io/badge/Version-0.2.2-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Popcorn-MD** is an Obsidian plugin that lets you search for movies and TV shows via [TMDb](https://www.themoviedb.org/) and automatically create beautiful, structured notes from a template — all without leaving Obsidian.

## Features

- **Search by title or IMDb ID** — Find any movie quickly.
- **Auto-generated notes** — Creates an Obsidian note pre-filled with movie metadata (title, year, genres, poster, synopsis, rating, cast, etc.).
- **Customizable templates** — Design your own note layout using placeholders.
- **Minimal UI** — A clean modal search interface for distraction-free workflow.

## Installation

### From Obsidian Community Plugins (once released)

1. Open **Settings → Community plugins**.
2. Disable **Safe mode**.
3. Click **Browse** and search for **"Popcorn-MD"**.
4. Install and enable the plugin.

### Manual (developer preview)

1. Download the latest release from [Releases](https://github.com/VitaliiRomanenko/popcorn-md/releases).
2. Extract `main.js`, `manifest.json`, and `styles.css` into `<vault>/.obsidian/plugins/popcorn-md/`.
3. Reload Obsidian and enable the plugin in **Settings → Community plugins**.

## Getting Started

1. **Get a TMDb API key** — Sign up at [themoviedb.org](https://www.themoviedb.org/signup) and request an API key.
2. **Open Plugin Settings** — Navigate to **Settings → Popcorn-MD**.
3. **Select template** — Select file from list
4. **Enter your API key** — Paste your TMDb API key and click **Save**.
5. **Open the movie search** — Use the command palette (`Cmd+P` / `Ctrl+P`) and run **"Popcorn MD: Create new movie note"**, or click the 🍿 ribbon icon.
6. **Select a movie** — Type a title (or IMDb ID starting with `tt...`) and choose from the results.
7. **Note created!** — A new note is generated using your selected template.

## Commands

| Command | Description |
|---|---|
| **Popcorn MD: Create new movie note** | Opens the movie search modal |

## Settings

| Setting | Description |
|---|---|
| **TMDb API Key** | Your TMDb API key (required) |
| **Default language** | Language for movie data |
| **Template path** | Path to your custom template file (relative to vault root) |
| **Default folder** | Where new movie notes are saved |
| **Include poster** *(added in v0.3)* | Toggle to embed movie poster image in notes |

## Template System

This template helps you automatically generate `.md` files with movie metadata.  
All variables are placeholders wrapped in double braces `{{variable}}` and are usually filled from APIs (e.g., TMDb/IMDb).

> **Note on array fields:** The fields `genres`, `origin_country`, `production_companies`, `production_countries`, and `spoken_languages` are currently stored as Obsidian links (for example, `[[Action]]`, `[[Drama]]`). In future versions, you’ll be able to choose how these values are stored — as links, lists, or comma‑separated strings — through template configuration options.

### Template Fields
> This is a sample template where data is stored as metadata,
> but you can use these fields in any way you like.
```Markdown
	---
	adult: "{{adult}}"
	belongs_to_collection: "{{collection}}"
	budget: "{{budget}}"
	genres: "{{genres}}"
	homepage: "{{homepage}}"
	TMDbID: "{{id}}"
	IMDbID: "{{imdb_id}}"
	origin_country: "{{origin_country}}"
	original_language: "{{original_language}}"
	original_title: "{{original_title}}"
	overview: "{{overview}}"
	popularity: "{{popularity}}"
	poster_path: "{{poster_path}}"
	production_companies: "{{production_companies}}"
	production_countries: "{{production_countries}}"
	release_date: "{{release_date}}"
	revenue: "{{revenue}}"
	runtime: "{{runtime}}"
	softcore: "{{softcore}}"
	spoken_languages: "{{spoken_languages}}"
	status: "{{status}}"
	tagline: "{{tagline}}"
	title: "{{title}}"
	vote_average: "{{vote_average}}"
	vote_count: "{{vote_count}}"
	---
```

### 📊 Template Field Reference

| Field | Example Value | Description |
|-------|---------------|-------------|
| **tags** | `Movie` | Category of the file, always `Movie`. |
| **adult** | `false` | Whether the movie is adult content (`true/false`). |
| **belongs_to_collection** | `The Dark Knight Trilogy` | Collection/series name if applicable. |
| **budget** | `185000000` | Production budget in USD. |
| **genres** | `Action, Drama` | List of genres. |
| **homepage** | `https://www.dc.com/batman` | Official movie website. |
| **TMDbID** | `155` | Unique TMDb identifier. |
| **IMDbID** | `tt0468569` | Unique IMDb identifier. |
| **origin_country** | `US` | Country of origin. |
| **original_language** | `en` | Original language. |
| **original_title** | `The Dark Knight` | Original movie title. |
| **overview** | `Batman faces Joker...` | Short synopsis/description. |
| **popularity** | `92.5` | Popularity score from TMDb. |
| **poster_path** | `/qJ2tW6WMUDux911r6m7haRef0WH.jpg` | Path to poster image. |
| **production_companies** | `Warner Bros.` | Studios involved in production. |
| **production_countries** | `United States` | Countries involved in production. |
| **release_date)** | `2008-07-18` | Release date. |
| **revenue** | `1004558444` | Box office revenue in USD. |
| **runtime** | `152` | Duration in minutes. |
| **softcore** | `false` | Flag for soft erotic content. |
| **spoken_languages** | `English, Mandarin` | Spoken languages in the movie. |
| **status** | `Released` | Release status. |
| **tagline** | `Why So Serious?` | Promotional tagline. |
| **title** | `The Dark Knight` | Localized movie title. |
| **vote_average** | `8.5` | Average user rating. |
| **vote_count** | `29000` | Number of votes. |

---

### How to Create Your Own Template

1. Create a file named `Template.md`.
2. Add the required fields using the format `{{variable}}`.
3. Use an API (TMDb/IMDb) to populate values dynamically.
4. Save the file in your notes system (e.g., Obsidian).

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/VitaliiRomanenko/popcorn-md
cd popcorn-md
npm install
```

### Build & Watch

```bash
npm run dev    # Development with watch mode
npm run build  # Production build
```

### Lint

```bash
npm run lint
```

## License

MIT

## Contact

For questions, feedback, or contributions, reach out to **Vitalii Romanenko** at [vitalii.o.romanenko@gmail.com](mailto:vitalii.o.romanenko@gmail.com).

## Disclaimer

This plugin is not affiliated with, endorsed by, or sponsored by TMDb or Obsidian. Movie data is provided by [The Movie Database (TMDb)](https://www.themoviedb.org/). You must obtain your own API key from TMDb to use this plugin.

---

*Popcorn-MD — Because your movie collection deserves better than plain text.*
