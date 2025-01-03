export type OAuthMethods = "google" | "apple" | "facebook"
export type AuthUrlParams = {
  connection_id: string
  login_hint?: string
}
