import { TMDbMovieService } from "../src/api/tmdbMovieService";

const mockFetch = jest.fn()

global.fetch = mockFetch as any;

const settings = {
    apiKey: "FAKE_KEY",
    language: 'en-US'
};

describe("TMDbGanreService", () =>{
    beforeEach(() => {
        mockFetch.mockReset();
    });

    it("should search by IMDb id", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                movie_results: [
                    { id: 123, title: "The Matrix", adult: false, genre_ids: [1] },
                ],
            }),
        });

        const service = new TMDbMovieService(settings);
        const result = await service.searchMovie("tt0133093");

        expect(result.results[0]?.title).toBe("The Matrix");
        expect(result.total_results).toBe(1);
    });

    it("should return empty array by wrong IMDb id", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                "movie_results": [],
                "person_results": [],
                "tv_results": [],
                "tv_episode_results": [],
                "tv_season_results": []
            }),
        });

        const service = new TMDbMovieService(settings);
        const result = await service.searchMovie("tt0000000");

        expect(result.results).toEqual([]);
        expect(result.total_results).toBe(0);
    });

    it("should search by name", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                page: 1,
                results: [{ id: 456, title: "Inception" }],
                total_pages: 1,
                total_results: 1,
            }),
        });

        const service = new TMDbMovieService(settings);
        const result = await service.searchMovie("Inception");

        expect(result.results[0]?.title).toBe("Inception");
        expect(result.total_results).toBe(1);
    });

    it("should return empty array by wrong name", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                page: 1,
                results: [],
                total_pages: 1,
                total_results: 0,
            }),
        });

        const service = new TMDbMovieService(settings);
        const result = await service.searchMovie("rhueif");

        expect(result.results).toEqual([]);
        expect(result.total_results).toBe(0);
    });

    it("should search by id", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 789, title: "Interstellar" }),
        });

        const service = new TMDbMovieService(settings);
        const movie = await service.getMovieById(789);
        expect(movie).not.toBeNull();
        expect(movie!.title).toBe("Interstellar");
    });

    it("should return null by wrong id", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                "success": false,
                "status_code": 34,
                "status_message": "The resource you requested could not be found."
            }),
        });

        const service = new TMDbMovieService(settings);
        const movie = await service.getMovieById(78933493049);
        expect(movie).toBeNull();
    });
});