import { Movie } from "../models/Movie";
import { SearchResult, SearchMovie } from "../models/SearchResult";

export interface PluginsSettings {
    apiKey: string;
    language: string;
}

export class TMDbAPIService {
    private apiKey: string;
    private language: string;
    private readonly BASE_URL = "https://api.themoviedb.org/3";

    constructor(settings: PluginsSettings){
        this.apiKey = settings.apiKey;
        this.language = settings.language;
    }

    protected async fetchFromTMDb(endpoint: string, params: Record<string, string> = {}): Promise<any> {
        const url = new URL (`${this.BASE_URL}${endpoint}`);
        url.searchParams.append("api_key", this.apiKey);
        url.searchParams.append("language", this.language);

        for (const [key, value] of Object.entries(params)){
            url.searchParams.append(key, value);
        }
        
        const response = await fetch(url.toString());
        if (!response.ok){
            throw new Error(`TMDb API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }

    public async checkAPIKey(): Promise<boolean>{
        const resp = await this.fetchFromTMDb('/authentication');
        return resp.success;
    }
}