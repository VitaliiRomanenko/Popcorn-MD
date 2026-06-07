import { TMDbAPIService } from "../src/api/tmdbAPIService";

const mockFetch = jest.fn()

global.fetch = mockFetch as any;

const settings = {
    apiKey: "FAKE_KEY",
    language: 'en-US'
};

describe("TMDbAPIService", () =>{
    beforeEach(() => {
        mockFetch.mockReset();
    });

    it("should append apiKey and language to requests", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({success: true}),
        });

        const service = new TMDbAPIService(settings);
        const result = await service.checkAPIKey();

        expect(result).toBe(true);
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining("api_key=FAKE_KEY")
        );
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining("language=en-US")
        );
    });
});