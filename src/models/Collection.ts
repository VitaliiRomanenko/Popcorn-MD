/**
 * Represents a movie collection (e.g., a franchise or series).
 */
export interface Collection {
  /** The TMDb ID of the collection. */
  id: number;
  /** The display name of the collection. */
  name: string;
  /** Optional path to the poster image. */
  poster_path?: string;
  /** Optional path to the backdrop image. */
  backdrop_path?: string;
}
