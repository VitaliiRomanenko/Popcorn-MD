import { Genre, GenreResponse} from "../models/Genre";
import { PopcornMDSettings } from "../settings/settings";
import { TMDbAPIService } from "./tmdbAPIService";


/**
 * Service for fetching and caching TMDb movie genres.
 * Extends TMDbAPIService to reuse the authenticated HTTP client.
 */
export class TMDbGenreService extends TMDbAPIService {
    /** Internal cache mapping genre IDs to their display names. */
    private genreMap = new Map<number, string>();

    /**
     * Creates a new TMDbGenreService instance.
     * @param settings - Plugin settings (API key, language, etc.).
     */
    constructor(settings: PopcornMDSettings) {
        super(settings);
    }

    /**
     * Fetches the full list of movie genres from TMDb and populates the internal cache.
     * Must be called once before using {@link mapGenreIds}.
     *
     * @returns A promise that resolves when the genre list has been loaded.
     */
    public async init(): Promise<void>{
        const data = await this.fetchFromTMDb<GenreResponse>(`/genre/movie/list`);
        data.genres.forEach((g: Genre) => {
            this.genreMap.set(g.id, g.name);
        });
    }

    /**
     * Converts an array of genre IDs into an array of {@link Genre} objects,
     * using the cached genre names. Unknown IDs receive the name "Unknown".
     *
     * @param ids - Array of TMDb genre IDs.
     * @returns Array of Genre objects with `id` and `name` fields.
     */
    public mapGenreIds(ids: number[]): Genre[] {
        return ids.map(id => ({
            id,
            name: this.genreMap.get(id) ?? "Unknown"
        }));
    }
    
}
