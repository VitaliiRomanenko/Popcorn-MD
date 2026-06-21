/**
 * Represents a production company.
 */
export interface Companie {
  /** The TMDb ID of the company. */
  id: number;
  /** Optional path to the company's logo image. */
  logo_path?: string;
  /** The display name of the company. */
  name: string;
  /** The ISO 3166‑1 code of the company's country of origin. */
  origin_country: string;
}
