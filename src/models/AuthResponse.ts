/**
 * Represents the response from the TMDb authentication endpoint.
 */
export interface AuthResponse {
  /** Whether the authentication request was successful. */
  success: boolean;
  /** Optional status code returned by the API. */
  status_code?: number;
  /** Optional status message returned by the API. */
  status_message?: string;
}
