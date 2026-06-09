# PopcornMD – Project Summary

## Overview

**PopcornMD** is an Obsidian plugin that allows users to search for movies via the TMDb API and create notes in Obsidian based on a template with movie data.

**Language:** TypeScript  
**Environment:** Obsidian Plugin (uses Obsidian API)

---

## Project Structure

### 1. API Services (`src/api/`)

- **`tmdbAPIService.ts`** – base class for TMDb API communication. Contains:
  - `fetchFromTMDb()` – universal HTTP request method.
  - `checkAPIKey()` – API key validation.
  - Configuration: `apiKey`, `language`, `BASE_URL`.

- **`tmdbGenreService.ts`** – extends `TMDbAPIService`. Loads genre list and stores it in `Map<number, string>`. Methods:
  - `init()` – fetches genres from API.
  - `mapGenreIds()` – converts an array of genre IDs into an array of `Genre` objects.

- **`tmdbMovieService.ts`** – extends `TMDbAPIService`. Provides:
  - `searchMovie()` – determines whether the query is an IMDb ID (format `tt...`) and calls the appropriate method.
  - `getMovieById()` – retrieves a movie by TMDb ID.
  - `getMovieByIMDbId()` – search via `/find/{imdb_id}`.
  - `searchMovieByName()` – search via `/search/movie`.

### 2. Data Models (`src/models/`)

- `Movie.ts` – movie interface (adult, budget, genres, id, imdb_id, origin_country, original_language, etc.).
- `SearchResult.ts` – search result interface, includes `SearchMovie` (adult, backdrop_path, id, title, original_title, overview, poster_path, original_language, genre_ids).
- `Genre.ts`, `Collection.ts`, `Companie.ts`, `Countrie.ts`, `Language.ts` – auxiliary interfaces.

### 3. Commands (`src/commands/`)

- **`createMovieNote.ts`** – creates a note with movie data:
  - Reads template from file.
  - Formats date via `formatDate()`.
  - Returns `TFile` or `null`.

### 4. Settings (`src/settings/`)

- **`settings.ts`** – `PopcornMDSettings` interface (APIKey, templateFile, language, test) and `PopcornMDSettingTab` class for displaying settings in Obsidian.
  - `createTemplateFileSetting()` – template file selection.
  - `createAPIKeySetting()` – API key input.
  - `createLanguageSetting()` – language selection (with suggestions).
  - `getLanguageDisplayName()` – retrieves language name by ISO code.

- **`language/Languages.json`** – language dictionary.
- **`language/languages.ts`** – `Language` type (iso_639_1, english_name, name).

### 5. Suggester (`src/settings/suggester/`)

- **`FileSuggest.ts`** – suggestions for template file selection.
- **`LanguageSuggest.ts`** – suggestions for language selection.
- **`suggest.ts`** – generic `Suggest<T>` and `TextInputSuggest<T>` classes for implementing dropdown lists.

### 6. Views (`src/views/`)

- **`MovieCard.ts`** – `createMovieCard()` function for creating an HTML movie card (with rating, genres, posters).
- **`searchModal.ts`** – `SearchModal` class (search modal window):
  - Initializes `genreService` and `movieService`.
  - Displays input field and result list.
  - Uses `buildGenresMap()` for genre mapping.

### 7. Main File (`src/main.ts`)

- `PopcornMD extends Plugin`:
  - `onload()` – adds ribbon icon, command to open modal window.
  - `loadSettings()` / `saveSettings()` – load/save settings.

### 8. Tests (`tests/`)

- `tmdbAPIService.test.ts`
- `tmdbGenreService.test.ts`
- `tmdbMovieService.test.ts`

### 9. Configuration

- `esbuild.config.mjs` – build configuration.
- `eslint.config.mts` – linter.
- `jest.config.js` – testing.
- `manifest.json` – Obsidian plugin manifest.
- `package.json` – dependencies.
- `tsconfig.json`, `tsconfig.jest.json` – TypeScript configuration.
- `styles.css` – styles.
- `version-bump.mjs` – version update.

---

## Key Features

1. **Search movies** by name or IMDb ID.
2. **Display results** as cards with rating, genres, posters.
3. **Create notes** based on a template with variable substitution ({{title}}, {{year}}, etc.).
4. **Settings** for API key, language, template file.
5. **Automatic genre loading** on initialization.

---

## Potential Issues / Improvements

- `genreService.init()` is called in `SearchModal` constructor but not awaited (`await`). This may cause genres not to be loaded on first search.
- `tamplatePath` – typo (should be `templatePath`).
- `checkAPIKey()` uses `/authentication` but does not handle network errors.
- `getMovieById()` checks `data.success === false`, but TMDb returns `success` only on errors; for successful requests the field is absent.
- No error handling in `fetchFromTMDb()` (e.g., `response.ok` is not checked).
- `LanguageSuggest` stores ISO code in `dataset['iso']`, but when saving settings it uses `inputEl.value` (language name) instead of ISO code.

---

## Conclusion

The project is a functional Obsidian plugin for creating movie notes. It has a clear architecture with separation into API services, models, views, and settings. It requires fixing a few minor bugs and improving error handling.
