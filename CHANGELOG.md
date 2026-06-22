## Release v0.1.0

**Version:** 0.1.0  
**Date:** 2026-06-12
**Author:** Vitalii Romanenko

- **Search by title or IMDb ID** — Quickly find any movie or show. 
- **Auto-generated notes** — Create Obsidian notes pre-filled with metadata (title, year, genres, poster, synopsis, rating, cast, etc.).
- **Customizable templates** — Design your own note layout using placeholders.
- **Minimal UI** — Clean modal search interface for distraction-free workflow.

## Release v0.1.1

**Version:** 0.1.1  
**Date:** 2026-06-13  
**Author:** Vitalii Romanenko

---

### Summary

This release fixes multiple security, typing, and Obsidian compatibility issues. The focus is on eliminating unsafe DOM operations, replacing direct network calls with Obsidian APIs, improving TypeScript types and validation, and moving inline styles into CSS classes. These changes increase safety, maintainability, and reliability across normal and popout windows.

---

### Fixed issues

- **DOM safety**
    
    - Replaced unsafe `innerHTML` and direct HTML assignments with element creation via `document.createElement`and safe text insertion using `textContent`.
        
    - Ensured no unvalidated HTML is injected into the UI.
        
    - **Files affected:** `src/views/MovieCard.ts`.
        
- **Styles**
    
    - Removed direct style assignments and inline style mutations.
        
    - Introduced CSS classes and used `setCssProps` / `setCssStyles` where appropriate.
        
    - **Files affected:** `src/settings/settings.ts` (lines referenced previously).
        
- **ESLint directives and explicit any**
    
    - Removed undocumented directive comments and disallowed `eslint-disable` for `@typescript-eslint/no-explicit-any`.
        
    - Replaced `any` with concrete types or narrowed types with validation where possible.
        
    - Added explanatory comments for any remaining, narrowly scoped exceptions.
        
    - **Files affected:** `src/settings/suggester/suggest.ts`.
        
- **Network requests**
    
    - Replaced `fetch` usage with Obsidian `requestUrl` to align with platform expectations and improve error handling.
        
    - Added response validation and error handling for network calls.
        
    - **Files affected:** `src/api/tmdbAPIService.ts`.
        
- **Type safety and any usage**
    
    - Introduced interfaces for TMDB responses and other external data structures.
        
    - Added runtime checks before accessing properties on external responses.
        
    - Converted unsafe `any` usages to typed models or validated structures.
        
    - **Files affected:** `src/api/tmdbAPIService.ts`, `src/api/tmdbMovieService.ts`, `src/api/tmdbGenreService.ts`, `src/views/searchModal.ts`, `src/settings/suggester/suggest.ts`.
        
- **Obsidian compatibility**
    
    - Replaced global `document` usage with `activeDocument` or appropriate Obsidian APIs to support popout windows.
        
    - **Files affected:** `src/settings/settings.ts`, `src/views/MovieCard.ts`.
        
- **Async handling**
    
    - Ensured promises are awaited or explicitly handled with `.catch` or `void` where intentional.
        
    - Fixed functions that returned promises in contexts expecting `void`.
        
    - **Files affected:** `src/settings/settings.ts`, `src/settings/suggester/suggest.ts`, `src/views/searchModal.ts`.
        
- **API usage and suggestions**
    
    - Migrated custom TextInputSuggest implementation toward the recommended `AbstractInputSuggest` API.
        
    - Added tests and validation for suggestion behavior.
        
    - **Files affected:** `src/settings/suggester/suggest.ts`.
        

---

### Changed files

- `src/views/MovieCard.ts` — safe DOM updates, removed `innerHTML`, use of `activeDocument`.
    
- `src/settings/settings.ts` — moved inline styles to classes, fixed async usage, replaced `document` with `activeDocument`.
    
- `src/settings/suggester/suggest.ts` — removed undocumented ESLint disables, improved typing, migrated toward `AbstractInputSuggest`.
    
- `src/api/tmdbAPIService.ts` — replaced `fetch` with `requestUrl`, added response types and validation.
    
- `src/api/tmdbMovieService.ts` — added interfaces, safe mapping and field checks.
    
- `src/api/tmdbGenreService.ts` — added typing and validation.
    
- `src/views/searchModal.ts` — fixed promise handling and tightened types.
    

---

### Developer notes

- **API types:** New interfaces live in `src/types` or the designated types folder. Always validate external responses before accessing fields.
    
- **Styles:** New CSS classes are added to the plugin stylesheet. Avoid inline styles and prefer class-based styling or `setCssProps` / `setCssStyles`.
    
- **ESLint:** If an exception is required, scope it narrowly and include a clear comment explaining why the rule is disabled.
    
- **Obsidian APIs:** Use `requestUrl` for network requests and `activeDocument` for DOM access in popout contexts.
    

---

### Testing and verification

- **Unit tests:** Added tests for TMDB response parsing and suggestion component behavior.
    
- **Manual tests:** Verified UI behavior in both main and popout windows, confirmed no unvalidated HTML insertion, and tested error handling for network failures.
    
- **Security checks:** Confirmed removal of unsafe `innerHTML` usage and validated that user-provided content is never injected as raw HTML.
    

---

### Known limitations

- Some external responses remain loosely typed due to variability in third-party API payloads. Additional validation and stricter schemas will be added in future releases.
    
- Minor refactors remain to fully eliminate all legacy `any` usages across the codebase.
    

---

**Summary**  
This release addresses critical security and compatibility issues, improves TypeScript safety, and aligns the codebase with Obsidian best practices to make the plugin safer and more robust.

## Release v0.2.0

**Version:** 0.2.0
**Date:** 2026-06-14
**Author:** Vitalii Romanenko

### 🚀 New Features

- **Default folder setting**: Added a setting to specify where movie notes are saved. Notes are now created in the configured folder instead of the vault root.
- **Adult content filtering**: Added an "Adult titles" toggle in settings to include or exclude adult content in search results.
- **Adult content indicator**: Search results now show a flame icon on movie cards that are marked as adult content.
- **CI/CD pipeline**: Added a GitHub Actions workflow for automated releases. When a tag is pushed, it builds the plugin, creates a release, and attaches the artifacts (`main.js`, `manifest.json`, `styles.css`).

### 🔧 Improvements

- **Refactored settings tab**: Extracted individual setting components into separate files (`APIKeySetting.ts`, `AdultSetting.ts`, `DefaultFolder.ts`, `LangugeSetting.ts`, `TemplateFileSetting.ts`) for better code organization.
- **Moved compiled output**: The build process now outputs files to a `release/` directory to keep the repository clean.
- **Updated build script**: The production build now copies `manifest.json` and `styles.css` to the `release/` directory.
- **Type improvements**: Replaced the separate `PluginsSettings` interface with the shared `PopcornMDSettings` interface across API service classes.
- **UI polish**: Added relative positioning on movie cards and constrained overview text width for better layout.

### 🐛 Bug Fixes

- Fixed a typo in the event handler (removed unnecessary semicolons after if statements).

## Release v0.2.1

**Version:** 0.2.1
**Date:** 2026-06-21
**Author:** Vitalii Romanenko

### Features
- **Keyboard navigation for search results**: Added arrow key navigation (Up/Down) to browse movie cards in the search modal, with visual focus indication and smooth scrolling
- **Enter key selection for focused item**: Pressing Enter now selects the currently focused movie card from the search results
- **Escape key to close**: Pressing Escape closes the search modal

### Improvements
- **Improved error handling in TMDb API service**: Added specific error messages for authentication failures (401), rate limiting (429), and general API errors. API key validation is now performed before making requests
- **Better template validation**: Added explicit checks for missing template files and non-file paths with clearer error messages
- **Renamed "card" CSS class to "movie-item"**: Improved semantic naming for better code clarity and maintainability
- **Fixed typo "foded" to "focused"**: Corrected CSS class name spelling in focus-related functionality
- **Styling enhancements**: Added hover effects, focus outlines, and improved visual feedback for movie cards with better layout and overflow handling

### Bug Fixes
- **Multiple typo corrections**:
  - Fixed `AuthResponce` to `AuthResponse` (file rename and import updates)
  - Fixed `GenreResponce` to `GenreResponse`
  - Fixed `FindResponce` to `FindResponse`
  - Fixed `defaultFoder` to `defaultFolder` across settings interface, defaults, and all references
  - Fixed `TMDbGanreService` to `TMDbGenreService`
- **Fixed comment typo**: Corrected "focused" in SearchView comments

### Breaking Changes
- **Settings key renamed**: The `defaultFoder` setting key has been renamed to `defaultFolder`. Users will need to re-configure their default folder setting, or existing configurations will not migrate automatically

**Full Changelog**: https://github.com/VitaliiRomanenko/popcorn-md/compare/0.2.0...0.2.1

## Release v0.2.2

**Version:** 0.2.2
**Date:** 2026-06-21
**Author:** Vitalii Romanenko

### Features
- Add project documentation

## Release v0.2.3

**Version:** 0.2.3
**Date:** 2026-06-22
**Author:** Vitalii Romanenko

### Features
- Add TMDb API v4 Access Token supporting