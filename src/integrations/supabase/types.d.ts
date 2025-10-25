// Temporary module to satisfy Supabase client types until auto-generated types are available.
// Do NOT rely on this for runtime logic; it only unblocks TypeScript builds.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: Record<string, unknown>
    Views: Record<string, unknown>
    Functions: Record<string, unknown>
    Enums: Record<string, string[]>
    CompositeTypes: Record<string, unknown>
  }
}
