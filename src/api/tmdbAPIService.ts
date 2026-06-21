import { requestUrl } from "obsidian";
import { AuthResponse } from "../models/AuthResponse";
import { PopcornMDSettings } from "../settings/settings";

/**
 * Base service for interacting with The Movie Database (TMDb) API.
 * Provides common HTTP request handling, authentication, and language support.
 */
export class TMDbAPIService {
    /** The TMDb API key used for all requests. */
    private apiKey: string;

    /** The language code (e.g., "en-US") used for localized responses. */
    private language: string;

    /** Base URL for all TMDb API v3 endpoints. */
    private readonly BASE_URL = "https://api.themoviedb.org/3";

    /**
     * Creates a new TMDbAPIService instance.
     * @param settings - Plugin settings containing the API key and language preference.
     */
    constructor(settings: PopcornMDSettings) {
        this.apiKey = settings.APIKey;
        this.language = settings.language;
    }

    /**
     * Performs an authenticated GET request to the TMDb API.
     *
     * @typeParam T - The expected shape of the JSON response.
     * @param endpoint - The API endpoint path (e.g., "/genre/movie/list").
     * @param params   - Optional query parameters to append to the request.
     * @returns A promise that resolves to the parsed JSON response of type T.
     * @throws Will throw an error if the API key is missing, the request fails,
     *         or the response indicates an authentication, rate‑limit, or server error.
     */
    protected async fetchFromTMDb<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
        try {
            const url = new URL(`${this.BASE_URL}${endpoint}`);
            if (!this.apiKey) throw new Error("API key is not set");

            url.searchParams.append("api_key", this.apiKey);
            url.searchParams.append("language", this.language);

            for (const [key, value] of Object.entries(params)) {
                url.searchParams.append(key, value);
            }

            const response = await requestUrl(url.toString());
            if (response.status === 401) {
                throw new Error(`TMDb API authentication error: Invalid API key. Please check your API key in settings.`);
            }

            if (response.status === 429) {
                throw new Error(`TMDb API rate limit exceeded. Please wait before making additional requests.`);
            }

            if (response.status === 404) {
                throw new Error(`TMDb API endpoint not found: ${endpoint}`);
            }

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`TMDb API error: ${response.status} ${response.text}`);
            }

            return response.json as T;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(`Unexpected error while fetching from TMDb API: ${String(error)}`);
        }
    }

    /**
     * Checks whether the configured API key is valid by calling the TMDb authentication endpoint.
     *
     * @returns A promise that resolves to `true` if the key is valid, `false` otherwise.
     * @throws Will throw an error if the request itself fails (network error, etc.).
     */
    public async checkAPIKey(): Promise<boolean> {
        const resp = await this.fetchFromTMDb<AuthResponse>('/authentication');
        return resp.success;
    }
}
