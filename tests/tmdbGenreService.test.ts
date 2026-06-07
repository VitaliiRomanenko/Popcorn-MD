import { TMDbGanreService } from "../src/api/tmdbGenreService";

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

    it("should initialize genre map", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                genres: [{id: 1, name: "Action"}, {id: 2, name: "Drama"}],
            }),
        });

        const service = new TMDbGanreService(settings);
        await service.init();

        const mapped = service.mapGenreIds([1, 2, 3]);
        
        expect(mapped).toEqual([
            {id: 1, name: "Action"},
            {id: 2, name: "Drama"},
            {id: 3, name: "Unknown"},
        ]);
    });

    it("should return empty array when pass empty array", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                genres: [{id: 1, name: "Action"}, {id: 2, name: "Drama"}],
            }),
        });

        const service = new TMDbGanreService(settings);
        await service.init();

        const mapped = service.mapGenreIds([]);
        
        expect(mapped).toEqual([]);
    });
});