import { Genre, GenreResponce} from "../models/Genre";
import { PopcornMDSettings } from "../settings/settings";
import { TMDbAPIService } from "./tmdbAPIService";


export class TMDbGanreService extends TMDbAPIService {
    private genreMap = new Map<number, string>();

    constructor(settings: PopcornMDSettings) {
        super(settings);
    }

    public async init(): Promise<void>{
        const data = await this.fetchFromTMDb<GenreResponce>(`/genre/movie/list`);
        data.genres.forEach((g: Genre) => {
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