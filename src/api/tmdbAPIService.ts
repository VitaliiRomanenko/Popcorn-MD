import { requestUrl } from "obsidian";
import { AuthResponse } from "../models/AuthResponce";
import { PopcornMDSettings } from "../settings/settings";

export class TMDbAPIService {
    private apiKey: string;
    private language: string;
    private readonly BASE_URL = "https://api.themoviedb.org/3";

    constructor(settings: PopcornMDSettings){
        this.apiKey = settings.APIKey;
        this.language = settings.language;
    }

    protected async fetchFromTMDb<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
        const url = new URL (`${this.BASE_URL}${endpoint}`);
        url.searchParams.append("api_key", this.apiKey);
        url.searchParams.append("language", this.language);

        for (const [key, value] of Object.entries(params)){
            url.searchParams.append(key, value);
        }
        
        const response = await requestUrl(url.toString());
        if(response.status === 404){
            throw new Error(`TMDb API not found: ${endpoint}`);
        }

        if (response.status < 200 || response.status >= 300){
            throw new Error(`TMDb API error: ${response.status} ${response.text}`);
        }
        return response.json as T;
    }

    public async checkAPIKey(): Promise<boolean>{
        const resp = await this.fetchFromTMDb<AuthResponse>('/authentication');
        return resp.success;
    }
}