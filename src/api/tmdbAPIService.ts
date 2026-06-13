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

    protected async fetchFromTMDb<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
        const url = new URL (`${this.BASE_URL}${endpoint}`);
        url.searchParams.append("api_key", this.apiKey);
        url.searchParams.append("language", this.language);

        for (const [key, value] of Object.entries(params)){
            url.searchParams.append(key, value);
        }
        
        const response = await fetch(url.toString());
        if(response.status === 404){
            throw new Error(`TMDb API not found: ${endpoint}`);
        }

        if (!response.ok){
            throw new Error(`TMDb API error: ${response.status} ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    }

    public async checkAPIKey(): Promise<boolean>{
        const resp = await this.fetchFromTMDb<AuthResponse>('/authentication');
        return resp.success;
    }
}