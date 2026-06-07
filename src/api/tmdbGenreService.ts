import { Genre} from "../models/Genre";
import { SearchResult, SearchMovie } from "../models/SearchResult";
import { TMDbAPIService, PluginsSettings } from "./tmdbAPIService";


export class TMDbGanreService extends TMDbAPIService {
    private genreMap = new Map<number, string>();

    constructor(settings: PluginsSettings) {
        super(settings);
    }

    public async init(): Promise<void>{
        const data = await this.fetchFromTMDb(`/genre/movie/list`);
        data.genres.array.forEach((g: Genre) => {
            this.genreMap.set(g.id, g.name);
        });
    }
    public mapGenreIds(ids: number[]): Genre[] {
        return ids.map(id => ({
            id,
            name: this.genreMap.get(id) ?? "Unknown"
        }));
    }
    
}