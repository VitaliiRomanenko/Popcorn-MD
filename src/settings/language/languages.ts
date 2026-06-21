import raw from './Languages.json';

/**
 * Represents a language supported by the TMDb API.
 */
export type Language = { 
    /** ISO 639‑1 code (e.g., "uk"). */
    iso_639_1: string; 
    /** English name of the language (e.g., "Ukrainian"). */
    english_name: string; 
    /** Native name of the language (e.g., "Українська"). */
    name: string 
};

/**
 * Array of all available languages loaded from the Languages.json file.
 */
export const LANGUAGES: Language[] = raw as Language[];
