import { TAbstractFile, TFile, Vault } from "obsidian";
import { Movie } from "../models/Movie";

/**
 * Service responsible for creating Obsidian notes from movie data.
 * It reads a template file, replaces placeholders with movie information,
 * and writes the resulting note to the vault.
 */
export class MovieNoteService {
    private vault: Vault;
    private defaultFolderPath: string;

    /**
     * @param _vault - The Obsidian vault instance used for file operations.
     * @param defaultFolderPath - The folder path where movie notes will be created.
     */
    constructor(_vault: Vault, defaultFolderPath: string) {
        this.vault = _vault;
        this.defaultFolderPath = defaultFolderPath;
    };

    /**
     * Creates a new movie note in the vault.
     *
     * @param movie - The movie data to use for filling the template.
     * @param templatePath - The path to the template file inside the vault.
     * @returns A promise that resolves to the created TFile.
     * @throws {Error} If the template file does not exist, is not a file,
     *                 or if a note for this movie already exists.
     */
    async createMovieNote(movie: Movie, templatePath: string): Promise<TFile> {
        const templateFile = this.getAbstractFileByPath(templatePath);
        if (!templateFile) {
            throw new Error("Template file not found");
        }
        if (!(templateFile instanceof TFile)) {
            throw new Error("Template path is not a file");
        }
        const fileName = `${movie.title.replace(/[\\/:*?"<>|]/g, "_")}`;

        if(this.getAbstractFileByPath(`${this.defaultFolderPath}/${fileName}.md`)){
            throw Error("Movie note already exists")
        }
        
        const templateContent = await this.vault.read(templateFile);
        const noteContent = this.renderMovieNoteFromTemplate(movie, templateContent);
        const noteFile = await this.vault.create(`${this.defaultFolderPath}/${fileName}.md`, noteContent);
        return noteFile;
    }

    /**
     * Retrieves an abstract file (file or folder) by its vault path.
     *
     * @param filePath - The path inside the vault.
     * @returns The TAbstractFile if found, otherwise null.
     */
    private getAbstractFileByPath(filePath: string): TAbstractFile | null{
        const file = this.vault.getAbstractFileByPath(filePath);
        return file
    }

    /**
     * Replaces all known placeholders in the template string with the
     * corresponding values from the movie object.
     *
     * @param movie - The movie data to use for replacement.
     * @param template - The raw template content.
     * @returns The template string with all placeholders replaced.
     */
    private renderMovieNoteFromTemplate(movie: Movie, template: string): string {
        return template
        .replace('"{{adult}}"', movie.adult ? "true" : "false")
        .replace('"{{collection}}"', `"${movie.belongs_to_collection?.name ?? ""}"`)
        .replace('"{{budget}}"', `"${String(movie.budget ?? "")}"`)
        .replace('"{{genres}}"', `[${movie.genres.map(g => `"[[${g.name}]]"`).join(", ")}]`)
        .replace('"{{homepage}}"', movie.homepage ?? "")
        .replace('"{{id}}"', String(movie.id ?? ""))
        .replace('"{{imdb_id}}"', movie.imdb_id ?? "")
        .replace('"{{origin_country}}"', `[${movie.origin_country?.map(c => `"[[${c}]]"`).join(", ") ?? ""}]`)
        .replace('"{{original_language}}"', movie.original_language ?? "")
        .replace('"{{original_title}}"', `'${movie.original_title ?? ""}'`)
        .replace('"{{overview}}"', `'${movie.overview ?? ""}'`)
        .replace('"{{popularity}}"', String(movie.popularity))
        .replace('"{{poster_path}}"', movie.poster_path ?? "")
        .replace('"{{production_companies}}"', `[${movie.production_companies.map(c => `"[[${c.name}]]"`).join(", ")}]`)
        .replace('"{{production_countries}}"', `[${movie.production_countries.map(c => `"[[${c.name}]]"`).join(", ")}]`)
        .replace('"{{release_date}}"', this.formatDate(movie.release_date) ?? "")
        .replace('"{{revenue}}"', String(movie.revenue))
        .replace('"{{runtime}}"', String(movie.runtime))
        .replace('"{{softcore}}"', String(movie.softcore ?? ""))
        .replace('"{{spoken_languages}}"', `[${movie.spoken_languages.map(l => `"[[${l.name}]]"`).join(", ")}]`)
        .replace('"{{status}}"', movie.status ?? "")
        .replace('"{{tagline}}"', `'${movie.tagline ?? ""}'`)
        .replace('"{{title}}"', `'${movie.title ?? ""}'`)
        .replace('"{{vote_average}}"', String(movie.vote_average))
        .replace('"{{vote_count}}"', String(movie.vote_count));
    }

    /**
     * Formats a date string into a human‑readable date using the specified locale.
     *
     * @param dateStr - The date string to format (e.g., "2024-01-15").
     * @param locale - The locale to use for formatting (default: "default").
     * @param options - Optional Intl.DateTimeFormatOptions to customise the output.
     * @returns The formatted date string, or an empty string if the input is invalid.
     */
    private formatDate(dateStr: string, locale: string = "default", options?: Intl.DateTimeFormatOptions): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString(locale, options);
    }
    
}
