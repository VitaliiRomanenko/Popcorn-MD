import raw from './Languages.json';
export type Language = { 
    iso_639_1: string; 
    english_name: string; 
    name: string 
};
export const LANGUAGES: Language[] = raw as Language[];